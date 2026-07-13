import type { BookType, ChapterContextType } from '../types';

export interface SearchHit {
  book: BookType;
  chapter: ChapterContextType;
  reason: string;
  snippet: string;
}

function includes(hay: string | undefined, q: string): boolean {
  return !!hay && hay.toLowerCase().includes(q);
}

function snippetAround(text: string, q: string, radius = 60): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx < 0) return text.slice(0, radius * 2).trim();
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

/** Deep search across chapter fields. Plain lowercase-includes — no search library. */
export function searchBooks(books: BookType[], query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: SearchHit[] = [];

  for (const book of books) {
    for (const chapter of book.chapters) {
      if (includes(book.title, q) || includes(chapter.title, q)) {
        hits.push({
          book,
          chapter,
          reason: 'Title',
          snippet: chapter.title,
        });
        continue;
      }
      if (includes(chapter.theme, q) || chapter.themes?.some((t) => includes(t, q))) {
        hits.push({
          book,
          chapter,
          reason: 'Theme',
          snippet: chapter.theme || chapter.themes?.find((t) => includes(t, q)) || '',
        });
        continue;
      }
      if (includes(chapter.bigIdea, q)) {
        hits.push({
          book,
          chapter,
          reason: 'Big idea',
          snippet: snippetAround(chapter.bigIdea, q),
        });
        continue;
      }
      if (includes(chapter.historicalContext, q)) {
        hits.push({
          book,
          chapter,
          reason: 'Historical context',
          snippet: snippetAround(chapter.historicalContext, q),
        });
        continue;
      }
      const phrase = chapter.hardPhrases?.find(
        (p) => includes(p.phrase, q) || includes(p.explanation, q)
      );
      if (phrase) {
        hits.push({
          book,
          chapter,
          reason: 'Hard phrase',
          snippet: snippetAround(`${phrase.phrase} — ${phrase.explanation}`, q),
        });
        continue;
      }
      if (includes(chapter.modernApplication, q)) {
        hits.push({
          book,
          chapter,
          reason: 'Modern application',
          snippet: snippetAround(chapter.modernApplication, q),
        });
        continue;
      }
      const egw = chapter.egwQuotes?.find((x) => includes(x.quote, q));
      if (egw) {
        hits.push({
          book,
          chapter,
          reason: 'EGW quote',
          snippet: snippetAround(egw.quote, q),
        });
        continue;
      }
      const hist = chapter.historicalSources?.find((x) => includes(x.quote, q));
      if (hist) {
        hits.push({
          book,
          chapter,
          reason: 'Historical source',
          snippet: snippetAround(hist.quote, q),
        });
        continue;
      }
      const sch = chapter.scholarlyReferences?.find((x) => includes(x.directQuote, q));
      if (sch) {
        hits.push({
          book,
          chapter,
          reason: 'Scholarly reference',
          snippet: snippetAround(sch.directQuote, q),
        });
      }
    }
  }

  return hits;
}
