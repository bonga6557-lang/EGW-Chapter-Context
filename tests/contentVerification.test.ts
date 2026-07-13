import { describe, expect, it } from 'vitest';
import { loadAllBooks } from '../src/data/loadBooks';

describe('content verification metadata', () => {
  it('ships no unverified or source-less citation entries in loaded data', async () => {
    const books = await loadAllBooks();
    const issues: string[] = [];

    for (const book of books) {
      for (const chapter of book.chapters) {
        for (const [idx, source] of chapter.historicalSources.entries()) {
          if (source.quoteType === 'unverified') {
            issues.push(`${book.id}/${chapter.id} historicalSources[${idx}] is unverified`);
          }
          if (!source.sourceUrl) {
            issues.push(`${book.id}/${chapter.id} historicalSources[${idx}] missing sourceUrl`);
          }
          if (!source.verifyNote) {
            issues.push(`${book.id}/${chapter.id} historicalSources[${idx}] missing verifyNote`);
          }
        }

        for (const [idx, ref] of chapter.scholarlyReferences.entries()) {
          if (ref.quoteType === 'unverified') {
            issues.push(`${book.id}/${chapter.id} scholarlyReferences[${idx}] is unverified`);
          }
          if (!ref.sourceUrl) {
            issues.push(`${book.id}/${chapter.id} scholarlyReferences[${idx}] missing sourceUrl`);
          }
          if (!ref.verifyNote) {
            issues.push(`${book.id}/${chapter.id} scholarlyReferences[${idx}] missing verifyNote`);
          }
        }

        for (const [idx, quote] of chapter.egwQuotes.entries()) {
          if (!quote.sourceUrl) {
            issues.push(`${book.id}/${chapter.id} egwQuotes[${idx}] missing sourceUrl`);
          }
        }
      }
    }

    expect(issues).toEqual([]);
  });
});
