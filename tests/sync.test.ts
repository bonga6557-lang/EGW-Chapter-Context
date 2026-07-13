import { beforeEach, describe, expect, it } from 'vitest';
import {
  pullAndMerge,
  readConflictLog,
  SYNC_CONFLICTS_KEY,
  SYNC_TIMESTAMPS_KEY,
  touchNoteTimestamp,
} from '../src/lib/sync';

describe('sync merge helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('records timestamps for local writes', () => {
    touchNoteTimestamp('steps-to-christ-sc-1', '2026-01-01T00:00:00.000Z');
    const raw = JSON.parse(localStorage.getItem(SYNC_TIMESTAMPS_KEY)!);
    expect(raw.notes['steps-to-christ-sc-1']).toBe('2026-01-01T00:00:00.000Z');
  });

  it('exposes empty conflict log by default', () => {
    expect(readConflictLog()).toEqual([]);
    expect(localStorage.getItem(SYNC_CONFLICTS_KEY)).toBeNull();
  });

  it('pullAndMerge fails gracefully without supabase', async () => {
    const result = await pullAndMerge({ a: '1' }, { 'sc-1': true });
    expect(result.ok).toBe(false);
    if (result.ok === false) {
      expect(result.error).toMatch(/not configured|Not signed in/i);
    }
  });
});
