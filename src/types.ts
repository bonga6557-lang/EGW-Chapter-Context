export interface ArgumentFlow {
  title: string;
  description: string;
}

export interface HardPhrase {
  phrase: string;
  explanation: string;
}

export interface HistoricalSource {
  title: string;
  author: string;
  publication: string;
  quote: string;
  relevance?: string;
  quoteType?: 'verbatim' | 'paraphrase' | 'summary' | 'unverified';
  sourceUrl?: string;
  verifyNote?: string;
}

export interface EGWQuote {
  quote: string;
  reference: string;
  sourceUrl?: string;
}

export interface ScholarlyReference {
  author: string;
  year: number;
  title: string;
  source: string;
  relevance: string;
  directQuote: string;
  quoteType?: 'verbatim' | 'paraphrase' | 'summary' | 'unverified';
  sourceUrl?: string;
  verifyNote?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface ChapterContextType {
  id: string;
  title: string;
  bigIdea: string;
  historicalContext: string;
  bibleFoundation: string[];
  argumentFlow: ArgumentFlow[];
  hardPhrases: HardPhrase[];
  commonMisunderstanding: string;
  modernApplication: string;
  historicalSources: HistoricalSource[];
  egwQuotes: EGWQuote[];
  scholarlyReferences: ScholarlyReference[];
  discussionQuestions: string[];
  quiz: QuizQuestion[];
  egwLink: string;
  theme?: string;
  themes?: string[];
  readingTime?: string;
}

export interface BookType {
  id: string;
  title: string;
  author: string;
  description: string;
  coverColor: string;
  /** Chapters in the original published book; when greater than chapters.length the guide is a preview. */
  totalChapters: number;
  chapters: ChapterContextType[];
}
