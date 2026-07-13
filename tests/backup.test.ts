import { beforeEach, describe, expect, it } from 'vitest';
import {
  BACKUP_FORMAT,
  BACKUP_VERSION,
  buildBackupJson,
  importBackupJson,
} from '../src/utils/backup';

describe('backup export/import', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('egw-saved-notes', JSON.stringify({ 'steps-to-christ-sc-1': 'keep' }));
    localStorage.setItem('egw-explored-chapters', JSON.stringify({ 'sc-1': true }));
    localStorage.setItem('egw-reading-zoom', '110');
  });

  it('round-trips and merges without deleting local keys', () => {
    const exported = buildBackupJson();
    const parsed = JSON.parse(exported);
    expect(parsed.format).toBe(BACKUP_FORMAT);
    expect(parsed.version).toBe(BACKUP_VERSION);

    localStorage.clear();
    localStorage.setItem('egw-saved-notes', JSON.stringify({ 'local-only': 'stays' }));

    const result = importBackupJson(
      JSON.stringify({
        format: BACKUP_FORMAT,
        version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        data: {
          'egw-saved-notes': JSON.stringify({ 'steps-to-christ-sc-1': 'imported' }),
          'egw-explored-chapters': JSON.stringify({ 'gc-1': true }),
        },
      })
    );
    expect(result.ok).toBe(true);
    const notes = JSON.parse(localStorage.getItem('egw-saved-notes')!);
    expect(notes['local-only']).toBe('stays');
    expect(notes['steps-to-christ-sc-1']).toBe('imported');
  });
});
