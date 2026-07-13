export type AppTab = 'study' | 'library' | 'notes' | 'cultural';

export interface RouteState {
  bookId: string;
  chapterId: string;
  tab: AppTab;
  guided: boolean;
}

const TABS: readonly AppTab[] = ['study', 'library', 'notes', 'cultural'];

export function isAppTab(value: string): value is AppTab {
  return (TABS as readonly string[]).includes(value);
}

/**
 * Hash shape: #/book/:bookId/chapter/:chapterId?tab=study&guided=1
 */
export function parseHash(hash: string): Partial<RouteState> | null {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!raw || raw === '/') return null;

  const qIndex = raw.indexOf('?');
  const path = qIndex >= 0 ? raw.slice(0, qIndex) : raw;
  const query = qIndex >= 0 ? raw.slice(qIndex + 1) : '';

  const m = path.match(/^\/?book\/([^/]+)\/chapter\/([^/]+)\/?$/);
  if (!m) return null;

  const params = new URLSearchParams(query);
  const tabParam = params.get('tab') || '';
  const guidedParam = params.get('guided');

  const result: Partial<RouteState> = {
    bookId: decodeURIComponent(m[1]),
    chapterId: decodeURIComponent(m[2]),
  };
  if (isAppTab(tabParam)) result.tab = tabParam;
  if (guidedParam === '1' || guidedParam === 'true') result.guided = true;
  if (guidedParam === '0' || guidedParam === 'false') result.guided = false;
  return result;
}

export function buildHash(state: RouteState): string {
  const params = new URLSearchParams();
  params.set('tab', state.tab);
  if (state.guided) params.set('guided', '1');
  return `#/book/${encodeURIComponent(state.bookId)}/chapter/${encodeURIComponent(state.chapterId)}?${params.toString()}`;
}

export function hashesEqual(a: string, b: string): boolean {
  return normalizeHash(a) === normalizeHash(b);
}

function normalizeHash(hash: string): string {
  const parsed = parseHash(hash);
  if (!parsed?.bookId || !parsed?.chapterId) return hash.replace(/^#/, '');
  return buildHash({
    bookId: parsed.bookId,
    chapterId: parsed.chapterId,
    tab: parsed.tab || 'study',
    guided: !!parsed.guided,
  }).replace(/^#/, '');
}
