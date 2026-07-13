import { describe, expect, it } from 'vitest';
import { searchBooks } from '../src/utils/search';
import type { BookType } from '../src/types';

const books: BookType[] = [
  {
    id: 'demo',
    title: 'Demo Book',
    author: 'EGW',
    description: 'x',
    coverColor: 'bg-slate-800',
    totalChapters: 1,
    chapters: [
      {
        id: 'd-1',
        title: 'Chapter 1',
        bigIdea: 'Unique big idea about mercy',
        historicalContext: 'Josephus records the siege of Jerusalem in detail.',
        bibleFoundation: [],
        argumentFlow: [],
        hardPhrases: [{ phrase: 'visitation', explanation: 'A divine warning season.' }],
        commonMisunderstanding: '',
        modernApplication: 'Apply patience in conflict today.',
        historicalSources: [],
        egwQuotes: [{ quote: 'God is love.', reference: 'SC 1' }],
        scholarlyReferences: [],
        discussionQuestions: [],
        quiz: [],
        egwLink: '',
        theme: 'Mercy',
      },
    ],
  },
];

describe('searchBooks', () => {
  it('matches historical context with reason', () => {
    const hits = searchBooks(books, 'Josephus');
    expect(hits).toHaveLength(1);
    expect(hits[0].reason).toBe('Historical context');
    expect(hits[0].snippet.toLowerCase()).toContain('josephus');
  });

  it('matches hard phrases and quotes', () => {
    expect(searchBooks(books, 'visitation')[0].reason).toBe('Hard phrase');
    expect(searchBooks(books, 'God is love')[0].reason).toBe('EGW quote');
  });
});
