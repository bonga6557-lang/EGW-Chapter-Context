import { HistoricalSource, ScholarlyReference } from '../types';

export type QuoteAccuracy = 'verbatim' | 'paraphrase' | 'summary' | 'unverified';

export interface ResolvedVerification {
  quoteType: QuoteAccuracy;
  sourceUrl?: string;
  verifyNote: string;
}

const QUOTE_NOTES: Record<QuoteAccuracy, string> = {
  verbatim: 'Compare this excerpt word-for-word with the linked original text.',
  paraphrase: 'This condenses or modernizes the original. Use the link and search the passage for the same idea.',
  summary: 'This restates the source in companion language — not a direct quotation. Confirm the argument in the original work.',
  unverified: 'This entry has NOT been checked against the original. Treat it as companion commentary, not a citation — do not quote or teach this wording until you verify it at the source.',
};

export const QUOTE_TYPE_LABELS: Record<QuoteAccuracy, string> = {
  verbatim: 'Verbatim',
  paraphrase: 'Paraphrase',
  summary: 'Summary',
  unverified: 'Not audited',
};

const ROMAN: Record<string, string> = { I: '1', II: '2', III: '3', IV: '4', V: '5', VI: '6', VII: '7', VIII: '8', IX: '9', X: '10' };

function romanBookToArabic(book: string): string {
  return ROMAN[book.toUpperCase()] ?? book;
}

function inferJosephusUrl(publication: string): string | undefined {
  const m = publication.match(/Book ([IVXLC\d]+), ch\. (\d+)/i);
  if (!m) return undefined;
  const book = romanBookToArabic(m[1]);
  return `http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=${book}:chapter=${m[2]}`;
}

function inferEusebiusUrl(publication: string): string | undefined {
  const m = publication.match(/Book ([IVXLC\d]+), ch\. (\d+)/i);
  if (!m) return 'https://www.newadvent.org/fathers/2501.htm';
  const book = romanBookToArabic(m[1]).padStart(2, '0');
  return `https://www.newadvent.org/fathers/2501${book}.htm`;
}

function inferTacitusUrl(): string {
  return 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Tacitus/Histories/5A*.html';
}

function scholarSearchUrl(author: string, title: string): string {
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(`${author} ${title}`)}`;
}

function webSearchUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function inferHistoricalUrl(source: HistoricalSource): string | undefined {
  if (source.sourceUrl) return source.sourceUrl;
  const author = source.author.toLowerCase();
  const pub = source.publication;

  if (author.includes('josephus')) return inferJosephusUrl(pub);
  if (author.includes('eusebius')) return inferEusebiusUrl(pub);
  if (author.includes('tacitus')) return inferTacitusUrl();
  if (author.includes('ellen') || author.includes('white')) {
    return 'https://m.egwwritings.org/';
  }

  return webSearchUrl(`${source.author} ${source.publication} ${source.title}`);
}

export function resolveHistoricalVerification(source: HistoricalSource): ResolvedVerification {
  const quoteType = source.quoteType ?? 'unverified';
  return {
    quoteType,
    sourceUrl: inferHistoricalUrl(source),
    verifyNote: source.verifyNote ?? QUOTE_NOTES[quoteType],
  };
}

export function resolveScholarlyVerification(ref: ScholarlyReference): ResolvedVerification {
  const quoteType = ref.quoteType ?? 'unverified';
  const sourceUrl =
    ref.sourceUrl ??
    scholarSearchUrl(ref.author, ref.title);
  return {
    quoteType,
    sourceUrl,
    verifyNote: ref.verifyNote ?? QUOTE_NOTES[quoteType],
  };
}

export function egwWritingsUrl(reference: string): string | undefined {
  const m = reference.match(/p\.\s*(\d+)/i);
  if (!m) return 'https://m.egwwritings.org/';
  const page = m[1];
  if (/great controversy/i.test(reference) || /gc/i.test(reference)) {
    return `https://m.egwwritings.org/en/book/132/${page}`;
  }
  if (/steps to christ/i.test(reference) || /stc/i.test(reference)) {
    return `https://m.egwwritings.org/en/book/108/${page}`;
  }
  return `https://m.egwwritings.org/en/search?query=${encodeURIComponent(reference)}`;
}
