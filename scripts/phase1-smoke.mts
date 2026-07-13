import { parseHash, buildHash, hashesEqual } from '../src/router.ts';
import { importBackupJson, BACKUP_FORMAT, BACKUP_VERSION } from '../src/utils/backup.ts';

const h = buildHash({ bookId: 'great-controversy', chapterId: 'gc-1', tab: 'notes', guided: true });
console.log('hash', h);
const p = parseHash(h);
console.log('parsed', JSON.stringify(p));
console.log('roundtrip', hashesEqual(h, buildHash({ bookId: p!.bookId!, chapterId: p!.chapterId!, tab: p!.tab || 'study', guided: !!p!.guided })));

const store: Record<string, string> = {
  'egw-saved-notes': JSON.stringify({ 'steps-to-christ-sc-1': 'keep me' }),
  'egw-explored-chapters': JSON.stringify({ 'sc-1': true }),
};
(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  key: () => null,
  length: 0,
} as Storage;

const backup = JSON.stringify({
  format: BACKUP_FORMAT,
  version: BACKUP_VERSION,
  exportedAt: new Date().toISOString(),
  data: {
    'egw-saved-notes': JSON.stringify({ 'great-controversy-gc-1': 'imported' }),
    'egw-explored-chapters': JSON.stringify({ 'gc-1': true }),
    'egw-onboarding-done': '1',
  }
});
const result = importBackupJson(backup);
console.log('import', JSON.stringify(result));
console.log('notes', store['egw-saved-notes']);
console.log('explored', store['egw-explored-chapters']);
console.log('onboarding', store['egw-onboarding-done']);
