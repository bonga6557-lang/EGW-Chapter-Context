import { HistoricalSource, ScholarlyReference } from '../types';

type SourceText = {
  summary: string;
  relevance: string;
};

function historicalSummary(
  source: Omit<HistoricalSource, 'quote' | 'relevance' | 'quoteType' | 'verifyNote'>,
  text: SourceText,
): HistoricalSource {
  return {
    ...source,
    quote: text.summary,
    relevance: text.relevance,
    quoteType: 'summary',
    verifyNote: 'Companion summary - not a quotation. Bibliographic record and relevant source section opened and checked 2026-07-14.',
  };
}

function scholarlySummary(
  source: Omit<ScholarlyReference, 'directQuote' | 'relevance' | 'quoteType' | 'verifyNote'>,
  text: SourceText,
): ScholarlyReference {
  return {
    ...source,
    directQuote: text.summary,
    relevance: text.relevance,
    quoteType: 'summary',
    verifyNote: 'Companion summary - not a quotation. Publisher or bibliographic record opened and checked 2026-07-14.',
  };
}

export const babylonianChronicleSource = (text: SourceText): HistoricalSource =>
  historicalSummary(
    {
      title: 'ABC 5 (Jerusalem Chronicle)',
      author: 'Unknown Babylonian scribe',
      publication: 'Babylonian Chronicle, early sixth century BCE; Grayson/Glassner translation',
      sourceUrl: 'https://www.livius.org/sources/content/mesopotamian-chronicles-content/abc-5-jerusalem-chronicle/',
    },
    text,
  );

export const josephusBook10Source = (text: SourceText): HistoricalSource =>
  historicalSummary(
    {
      title: 'Antiquities of the Jews',
      author: 'Flavius Josephus',
      publication: 'Book X, Whiston translation',
      sourceUrl: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0146%3Abook%3D10',
    },
    text,
  );

export const josephusBook11Source = (text: SourceText): HistoricalSource =>
  historicalSummary(
    {
      title: 'Antiquities of the Jews',
      author: 'Flavius Josephus',
      publication: 'Book XI, Whiston translation',
      sourceUrl: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0146%3Abook%3D11',
    },
    text,
  );

export const cyrusCylinderSource = (text: SourceText): HistoricalSource =>
  historicalSummary(
    {
      title: 'The Cyrus Cylinder',
      author: 'Cyrus II royal inscription',
      publication: 'Babylon, c. 539-530 BCE; British Museum 1880,0617.1941',
      sourceUrl: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941',
    },
    text,
  );

export const greatIsaiahScrollSource = (text: SourceText): HistoricalSource =>
  historicalSummary(
    {
      title: 'The Great Isaiah Scroll (1QIsa-a)',
      author: 'Unknown Jewish scribes',
      publication: 'Dead Sea Scroll from Qumran Cave 1; Israel Museum, Shrine of the Book',
      sourceUrl: 'https://dss.collections.imj.org.il/isaiah',
    },
    text,
  );

export const brightReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'John Bright',
      year: 2000,
      title: 'A History of Israel, Fourth Edition',
      source: 'Westminster John Knox Press',
      sourceUrl: 'https://www.wjkbooks.com/bookproduct/0664220681-a-history-of-israel-fourth-edition/',
    },
    text,
  );

export const brueggemannReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'Walter Brueggemann',
      year: 1998,
      title: 'A Commentary on Jeremiah: Exile and Homecoming',
      source: 'William B. Eerdmans Publishing Company',
      sourceUrl: 'https://www.eerdmans.com/9781467419208/a-commentary-on-jeremiah/',
    },
    text,
  );

export const collinsReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'John J. Collins',
      year: 1993,
      title: 'Daniel: A Commentary on the Book of Daniel',
      source: 'Fortress Press',
      sourceUrl: 'https://books.google.com/books/about/Daniel.html?id=zYrNxwEACAAJ',
    },
    text,
  );

export const myersReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'Jacob M. Myers',
      year: 1995,
      title: 'Ezra, Nehemiah',
      source: 'Anchor Yale Bible Commentaries, Yale University Press',
      sourceUrl: 'https://yalebooks.yale.edu/book/9780300139556/ezra-nehemiah/',
    },
    text,
  );

export const blenkinsoppReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'Joseph Blenkinsopp',
      year: 1988,
      title: 'Ezra-Nehemiah: A Commentary',
      source: 'Westminster John Knox Press',
      sourceUrl: 'https://books.google.com/books/about/Ezra_Nehemiah.html?id=3PvirfZkfvQC',
    },
    text,
  );

export const mooreReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'Carey A. Moore',
      year: 1995,
      title: 'Esther',
      source: 'Anchor Yale Bible Commentaries, Yale University Press',
      sourceUrl: 'https://yalebooks.yale.edu/book/9780300139488/esther/',
    },
    text,
  );

export const schulteReference = (text: SourceText): ScholarlyReference =>
  scholarlySummary(
    {
      author: 'Lucas L. Schulte',
      year: 2024,
      title: 'The Book of Isaiah in the Persian Period',
      source: 'The Cambridge Companion to the Book of Isaiah, Cambridge University Press',
      sourceUrl: 'https://www.cambridge.org/core/books/abs/cambridge-companion-to-the-book-of-isaiah/book-of-isaiah-in-the-persian-period/A5396E4B8E9C0A59C120B6A2A1258FF1',
    },
    text,
  );
