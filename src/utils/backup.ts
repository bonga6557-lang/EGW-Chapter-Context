/** All localStorage keys owned by this app. Never delete keys during import — merge only. */
export const APP_STORAGE_KEYS = [
  'egw-reading-zoom',
  'egw-explored-chapters',
  'egw-saved-notes',
  'egw-onboarding-done',
  'egw-last-read',
  'egw-sync-timestamps',
  'egw-sync-conflicts',
] as const;

export type AppStorageKey = (typeof APP_STORAGE_KEYS)[number];

export const BACKUP_FORMAT = 'egw-chapter-context-backup' as const;
export const BACKUP_VERSION = 1 as const;

export interface BackupPayload {
  format: typeof BACKUP_FORMAT;
  version: typeof BACKUP_VERSION;
  exportedAt: string;
  data: Partial<Record<AppStorageKey, string>>;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function collectBackupData(): Partial<Record<AppStorageKey, string>> {
  const data: Partial<Record<AppStorageKey, string>> = {};
  for (const key of APP_STORAGE_KEYS) {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) data[key] = value;
    } catch {
      // ignore quota / privacy mode read failures per key
    }
  }
  return data;
}

export function buildBackupJson(): string {
  const payload: BackupPayload = {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: collectBackupData(),
  };
  return JSON.stringify(payload, null, 2);
}

export function downloadBackup(filename = `egw-backup-${new Date().toISOString().slice(0, 10)}.json`): void {
  const json = buildBackupJson();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type ImportResult =
  | { ok: true; mergedKeys: AppStorageKey[] }
  | { ok: false; error: string };

function mergeJsonMaps(existingRaw: string | null, incomingRaw: string): string {
  let existing: Record<string, unknown> = {};
  let incoming: Record<string, unknown> = {};
  try {
    if (existingRaw) {
      const parsed = JSON.parse(existingRaw);
      if (isPlainObject(parsed)) existing = parsed;
    }
  } catch {
    existing = {};
  }
  try {
    const parsed = JSON.parse(incomingRaw);
    if (!isPlainObject(parsed)) throw new Error('not an object');
    incoming = parsed;
  } catch {
    throw new Error('Invalid JSON map in backup field');
  }
  return JSON.stringify({ ...existing, ...incoming });
}

function mergeSyncTimestamps(existingRaw: string | null, incomingRaw: string): string {
  const empty = { notes: {}, explored: {} };
  let existing = empty;
  let incoming = empty;
  try {
    if (existingRaw) {
      const parsed = JSON.parse(existingRaw);
      if (isPlainObject(parsed)) {
        existing = {
          notes: isPlainObject(parsed.notes) ? (parsed.notes as Record<string, string>) : {},
          explored: isPlainObject(parsed.explored) ? (parsed.explored as Record<string, string>) : {},
        };
      }
    }
  } catch {
    existing = empty;
  }
  try {
    const parsed = JSON.parse(incomingRaw);
    if (!isPlainObject(parsed)) throw new Error('not an object');
    incoming = {
      notes: isPlainObject(parsed.notes) ? (parsed.notes as Record<string, string>) : {},
      explored: isPlainObject(parsed.explored) ? (parsed.explored as Record<string, string>) : {},
    };
  } catch {
    throw new Error('Invalid sync timestamps in backup');
  }
  return JSON.stringify({
    notes: { ...existing.notes, ...incoming.notes },
    explored: { ...existing.explored, ...incoming.explored },
  });
}

/**
 * Non-destructive import: merges notes/explored maps; writes scalar keys only when present in backup.
 * Never removes keys that exist locally but are absent from the file.
 */
export function importBackupJson(jsonText: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { ok: false, error: 'File is not valid JSON.' };
  }

  if (!isPlainObject(parsed)) {
    return { ok: false, error: 'Backup root must be an object.' };
  }

  if (parsed.format !== BACKUP_FORMAT) {
    return { ok: false, error: 'Unrecognized backup format.' };
  }

  if (parsed.version !== BACKUP_VERSION) {
    return { ok: false, error: `Unsupported backup version (${String(parsed.version)}).` };
  }

  if (!isPlainObject(parsed.data)) {
    return { ok: false, error: 'Backup is missing a data object.' };
  }

  const data = parsed.data as Partial<Record<AppStorageKey, unknown>>;
  const mergedKeys: AppStorageKey[] = [];

  try {
    for (const key of APP_STORAGE_KEYS) {
      const incoming = data[key];
      if (typeof incoming !== 'string') continue;

      if (key === 'egw-explored-chapters' || key === 'egw-saved-notes') {
        const existing = localStorage.getItem(key);
        localStorage.setItem(key, mergeJsonMaps(existing, incoming));
      } else if (key === 'egw-sync-timestamps') {
        const existing = localStorage.getItem(key);
        localStorage.setItem(key, mergeSyncTimestamps(existing, incoming));
      } else {
        localStorage.setItem(key, incoming);
      }
      mergedKeys.push(key);
    }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Failed to write backup into localStorage.',
    };
  }

  if (mergedKeys.length === 0) {
    return { ok: false, error: 'Backup contained no recognized app keys.' };
  }

  return { ok: true, mergedKeys };
}
