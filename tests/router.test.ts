import { describe, expect, it } from 'vitest';
import { buildHash, hashesEqual, parseHash } from '../src/router';

describe('router', () => {
  it('round-trips book/chapter/tab/guided', () => {
    const hash = buildHash({
      bookId: 'great-controversy',
      chapterId: 'gc-1',
      tab: 'notes',
      guided: true,
    });
    expect(hash).toContain('great-controversy');
    const parsed = parseHash(hash);
    expect(parsed).toMatchObject({
      bookId: 'great-controversy',
      chapterId: 'gc-1',
      tab: 'notes',
      guided: true,
    });
    expect(
      hashesEqual(
        hash,
        buildHash({
          bookId: parsed!.bookId!,
          chapterId: parsed!.chapterId!,
          tab: parsed!.tab || 'study',
          guided: !!parsed!.guided,
        })
      )
    ).toBe(true);
  });

  it('returns null for empty hash', () => {
    expect(parseHash('')).toBeNull();
    expect(parseHash('#/')).toBeNull();
  });
});
