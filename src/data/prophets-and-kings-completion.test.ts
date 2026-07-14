import { describe, expect, it } from 'vitest';
import { prophetsAndKingsData } from './book-prophets-and-kings';

describe('Prophets and Kings chapter completion', () => {
  it('contains exactly one entry for every chapter from 1 through 60', () => {
    const ids = prophetsAndKingsData.map((chapter) => chapter.id);
    expect(ids).toHaveLength(60);
    expect(new Set(ids).size).toBe(60);
    expect(ids).toEqual(Array.from({ length: 60 }, (_, index) => `pk-${index + 1}`));
  });

  it('gives chapters 33-60 the complete researched-content shape', () => {
    for (const chapter of prophetsAndKingsData.slice(32)) {
      expect(chapter.bigIdea.length).toBeGreaterThan(40);
      expect(chapter.historicalContext.length).toBeGreaterThan(120);
      expect(chapter.bibleFoundation.length).toBeGreaterThanOrEqual(4);
      expect(chapter.argumentFlow.length).toBeGreaterThanOrEqual(4);
      expect(chapter.hardPhrases.length).toBeGreaterThanOrEqual(3);
      expect(chapter.historicalSources.length).toBeGreaterThanOrEqual(1);
      expect(chapter.scholarlyReferences.length).toBeGreaterThanOrEqual(1);
      expect(chapter.egwQuotes).toHaveLength(3);
      expect(chapter.discussionQuestions.length).toBeGreaterThanOrEqual(4);
      expect(chapter.quiz).toHaveLength(6);
      expect(chapter.egwLink).toMatch(/^https:\/\/m\.egwwritings\.org\/en\/book\/88\./);

      for (const source of [...chapter.historicalSources, ...chapter.scholarlyReferences]) {
        expect(source.quoteType).toBe('summary');
        expect(source.sourceUrl).toMatch(/^https:\/\//);
        expect(source.verifyNote).toContain('not a quotation');
      }

      for (const quote of chapter.egwQuotes) {
        expect(quote.reference).toMatch(/^Prophets and Kings, p\. \d+$/);
        expect(quote.sourceUrl).toBe(chapter.egwLink);
      }
    }
  });
});
