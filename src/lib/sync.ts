import { supabase, isSupabaseConfigured } from './supabase';

export const SYNC_TIMESTAMPS_KEY = 'egw-sync-timestamps';
export const SYNC_CONFLICTS_KEY = 'egw-sync-conflicts';
export const CLOUD_MIGRATION_PREFIX = 'egw-cloud-migration-done:';

export type SyncStatus = 'unavailable' | 'signed_out' | 'idle' | 'syncing' | 'synced' | 'error';

export interface SyncTimestamps {
  notes: Record<string, string>;
  explored: Record<string, string>;
}

export interface SyncConflict {
  at: string;
  kind: 'note' | 'explored';
  key: string;
  kept: 'local' | 'remote';
  localUpdatedAt: string | null;
  remoteUpdatedAt: string | null;
  detail: string;
}

interface NoteRow {
  note_key: string;
  content: string;
  updated_at: string;
}

interface ExploredRow {
  chapter_id: string;
  explored: boolean;
  updated_at: string;
}

function nowIso(): string {
  return new Date().toISOString();
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readSyncTimestamps(): SyncTimestamps {
  const raw = readJson<Partial<SyncTimestamps>>(SYNC_TIMESTAMPS_KEY, {});
  return {
    notes: raw.notes && typeof raw.notes === 'object' ? raw.notes : {},
    explored: raw.explored && typeof raw.explored === 'object' ? raw.explored : {},
  };
}

export function touchNoteTimestamp(noteKey: string, at = nowIso()): void {
  const ts = readSyncTimestamps();
  ts.notes[noteKey] = at;
  writeJson(SYNC_TIMESTAMPS_KEY, ts);
}

export function touchExploredTimestamp(chapterId: string, at = nowIso()): void {
  const ts = readSyncTimestamps();
  ts.explored[chapterId] = at;
  writeJson(SYNC_TIMESTAMPS_KEY, ts);
}

export function readConflictLog(): SyncConflict[] {
  return readJson<SyncConflict[]>(SYNC_CONFLICTS_KEY, []);
}

function logConflict(entry: SyncConflict): void {
  const log = readConflictLog();
  log.unshift(entry);
  writeJson(SYNC_CONFLICTS_KEY, log.slice(0, 50));
  console.warn('[sync conflict]', entry);
}

export function migrationDoneKey(userId: string): string {
  return `${CLOUD_MIGRATION_PREFIX}${userId}`;
}

export function isMigrationDone(userId: string): boolean {
  try {
    return localStorage.getItem(migrationDoneKey(userId)) === '1';
  } catch {
    return false;
  }
}

export function markMigrationDone(userId: string): void {
  localStorage.setItem(migrationDoneKey(userId), '1');
}

function isNewer(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a) return false;
  if (!b) return true;
  return Date.parse(a) > Date.parse(b);
}

export async function getSessionUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

/** Push one note row (local already written). */
export async function pushNote(noteKey: string, content: string): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: 'Not signed in' };

  const ts = readSyncTimestamps().notes[noteKey] || nowIso();
  const { error } = await supabase.from('user_notes').upsert(
    { user_id: userId, note_key: noteKey, content, updated_at: ts },
    { onConflict: 'user_id,note_key' }
  );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function pushExplored(
  chapterId: string,
  explored: boolean
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: 'Not signed in' };

  const ts = readSyncTimestamps().explored[chapterId] || nowIso();
  const { error } = await supabase.from('user_explored').upsert(
    { user_id: userId, chapter_id: chapterId, explored, updated_at: ts },
    { onConflict: 'user_id,chapter_id' }
  );
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export interface MergeResult {
  notes: Record<string, string>;
  explored: Record<string, boolean>;
  conflicts: SyncConflict[];
  remoteEmpty: boolean;
}

/**
 * Pull remote rows and merge into local maps with last-write-wins.
 * Never deletes local keys that are absent remotely.
 */
export async function pullAndMerge(
  localNotes: Record<string, string>,
  localExplored: Record<string, boolean>
): Promise<{ ok: true; result: MergeResult } | { ok: false; error: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: 'Not signed in' };

  const [notesRes, exploredRes] = await Promise.all([
    supabase.from('user_notes').select('note_key, content, updated_at').eq('user_id', userId),
    supabase.from('user_explored').select('chapter_id, explored, updated_at').eq('user_id', userId),
  ]);

  if (notesRes.error) return { ok: false, error: notesRes.error.message };
  if (exploredRes.error) return { ok: false, error: exploredRes.error.message };

  const remoteNotes = (notesRes.data || []) as NoteRow[];
  const remoteExplored = (exploredRes.data || []) as ExploredRow[];
  const ts = readSyncTimestamps();
  const conflicts: SyncConflict[] = [];

  const mergedNotes = { ...localNotes };
  for (const row of remoteNotes) {
    const localContent = localNotes[row.note_key];
    const localAt = ts.notes[row.note_key] || null;
    const remoteAt = row.updated_at;

    if (localContent === undefined || localContent === '') {
      mergedNotes[row.note_key] = row.content;
      ts.notes[row.note_key] = remoteAt;
      continue;
    }

    if (localContent === row.content) {
      ts.notes[row.note_key] = isNewer(remoteAt, localAt) ? remoteAt : localAt || remoteAt;
      continue;
    }

    // Conflict: both sides have different content
    if (isNewer(remoteAt, localAt)) {
      mergedNotes[row.note_key] = row.content;
      ts.notes[row.note_key] = remoteAt;
      const c: SyncConflict = {
        at: nowIso(),
        kind: 'note',
        key: row.note_key,
        kept: 'remote',
        localUpdatedAt: localAt,
        remoteUpdatedAt: remoteAt,
        detail: 'Remote note newer — kept remote (local retained in conflict log only).',
      };
      conflicts.push(c);
      logConflict(c);
    } else {
      ts.notes[row.note_key] = localAt || nowIso();
      const c: SyncConflict = {
        at: nowIso(),
        kind: 'note',
        key: row.note_key,
        kept: 'local',
        localUpdatedAt: localAt,
        remoteUpdatedAt: remoteAt,
        detail: 'Local note newer or equal — kept local; will push.',
      };
      conflicts.push(c);
      logConflict(c);
    }
  }

  const mergedExplored = { ...localExplored };
  for (const row of remoteExplored) {
    const hasLocal = Object.prototype.hasOwnProperty.call(localExplored, row.chapter_id);
    const localVal = localExplored[row.chapter_id];
    const localAt = ts.explored[row.chapter_id] || null;
    const remoteAt = row.updated_at;

    if (!hasLocal) {
      mergedExplored[row.chapter_id] = row.explored;
      ts.explored[row.chapter_id] = remoteAt;
      continue;
    }

    if (localVal === row.explored) {
      ts.explored[row.chapter_id] = isNewer(remoteAt, localAt) ? remoteAt : localAt || remoteAt;
      continue;
    }

    if (isNewer(remoteAt, localAt)) {
      mergedExplored[row.chapter_id] = row.explored;
      ts.explored[row.chapter_id] = remoteAt;
      const c: SyncConflict = {
        at: nowIso(),
        kind: 'explored',
        key: row.chapter_id,
        kept: 'remote',
        localUpdatedAt: localAt,
        remoteUpdatedAt: remoteAt,
        detail: 'Remote explored flag newer — kept remote.',
      };
      conflicts.push(c);
      logConflict(c);
    } else {
      ts.explored[row.chapter_id] = localAt || nowIso();
      const c: SyncConflict = {
        at: nowIso(),
        kind: 'explored',
        key: row.chapter_id,
        kept: 'local',
        localUpdatedAt: localAt,
        remoteUpdatedAt: remoteAt,
        detail: 'Local explored flag newer — kept local; will push.',
      };
      conflicts.push(c);
      logConflict(c);
    }
  }

  writeJson(SYNC_TIMESTAMPS_KEY, ts);
  writeJson('egw-saved-notes', mergedNotes);
  writeJson('egw-explored-chapters', mergedExplored);

  return {
    ok: true,
    result: {
      notes: mergedNotes,
      explored: mergedExplored,
      conflicts,
      remoteEmpty: remoteNotes.length === 0 && remoteExplored.length === 0,
    },
  };
}

/** Upload current local maps to the signed-in account (migration / catch-up). */
export async function uploadLocalState(
  notes: Record<string, string>,
  explored: Record<string, boolean>
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: 'Not signed in' };

  const ts = readSyncTimestamps();
  const noteRows = Object.entries(notes)
    .filter(([, content]) => content)
    .map(([note_key, content]) => ({
      user_id: userId,
      note_key,
      content,
      updated_at: ts.notes[note_key] || nowIso(),
    }));

  const exploredRows = Object.entries(explored).map(([chapter_id, exploredFlag]) => ({
    user_id: userId,
    chapter_id,
    explored: exploredFlag,
    updated_at: ts.explored[chapter_id] || nowIso(),
  }));

  if (noteRows.length > 0) {
    const { error } = await supabase.from('user_notes').upsert(noteRows, { onConflict: 'user_id,note_key' });
    if (error) return { ok: false, error: error.message };
  }
  if (exploredRows.length > 0) {
    const { error } = await supabase
      .from('user_explored')
      .upsert(exploredRows, { onConflict: 'user_id,chapter_id' });
    if (error) return { ok: false, error: error.message };
  }

  markMigrationDone(userId);
  return { ok: true };
}

/** Push any local-winning rows after a merge. */
export async function pushLocalWins(
  notes: Record<string, string>,
  explored: Record<string, boolean>,
  conflicts: SyncConflict[]
): Promise<void> {
  for (const c of conflicts) {
    if (c.kept !== 'local') continue;
    if (c.kind === 'note') {
      await pushNote(c.key, notes[c.key] || '');
    } else {
      await pushExplored(c.key, !!explored[c.key]);
    }
  }
}

export async function deleteCloudData(): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const userId = await getSessionUserId();
  if (!userId) return { ok: false, error: 'Not signed in' };

  const [n, e] = await Promise.all([
    supabase.from('user_notes').delete().eq('user_id', userId),
    supabase.from('user_explored').delete().eq('user_id', userId),
  ]);
  if (n.error) return { ok: false, error: n.error.message };
  if (e.error) return { ok: false, error: e.error.message };
  return { ok: true };
}

export async function signInWithMagicLink(email: string): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      emailRedirectTo: window.location.origin,
    },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase not configured' };
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export function getInitialSyncStatus(): SyncStatus {
  if (!isSupabaseConfigured) return 'unavailable';
  return 'signed_out';
}
