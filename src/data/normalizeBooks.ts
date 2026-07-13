import type { BookType } from '../types';
import {
  egwWritingsUrl,
  resolveHistoricalVerification,
  resolveScholarlyVerification,
} from '../utils/sourceVerification';

/**
 * Some older chapter records omit explicit verification URLs because the UI used
 * resolver fallbacks. Normalize at load time so every shipped entry exposes the
 * verification contract to audits, tests, and any future export path.
 */
export function normalizeBook(book: BookType): BookType {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      historicalSources: chapter.historicalSources.map((source) => {
        const resolved = resolveHistoricalVerification(source);
        return {
          ...source,
          sourceUrl: source.sourceUrl ?? resolved.sourceUrl,
          verifyNote: source.verifyNote ?? resolved.verifyNote,
        };
      }),
      scholarlyReferences: chapter.scholarlyReferences.map((ref) => {
        const resolved = resolveScholarlyVerification(ref);
        return {
          ...ref,
          sourceUrl: ref.sourceUrl ?? resolved.sourceUrl,
          verifyNote: ref.verifyNote ?? resolved.verifyNote,
        };
      }),
      egwQuotes: chapter.egwQuotes.map((quote) => ({
        ...quote,
        sourceUrl: quote.sourceUrl ?? egwWritingsUrl(quote.reference),
      })),
    })),
  };
}
