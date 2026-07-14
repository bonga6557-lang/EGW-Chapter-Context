import { ChapterContextType, BookType } from '../types';
import { pk1Quiz } from './otherQuizzes';
import { pk2Chapter } from './pk-2';
import { pk3Chapter } from './pk-3';
import { pk4Chapter } from './pk-4';
import { pk5Chapter } from './pk-5';
import { pk6Chapter } from './pk-6';
import { pk7Chapter } from './pk-7';
import { generatedProphetsAndKingsChapters } from './pk-generated';

export const prophetsAndKingsData: ChapterContextType[] = [
  {
    id: "pk-1",
    title: "Chapter 1: Solomon",
    bigIdea: "True leadership and wisdom are cultivated solely through a humble, constant dependence on God's strength.",
    historicalContext: "Published posthumously in 1917, during a period of massive political upheaval (World War I), this book highlighted the rises and falls of monarchs, speaking volumes to a generation watching empires collapse due to pride and ethical compromise.",
    bibleFoundation: [
      "1 Kings 3:9 - \"Give therefore thy servant an understanding heart to judge thy people...\"",
      "Proverbs 9:10 - \"The fear of the Lord is the beginning of wisdom...\""
    ],
    argumentFlow: [
      {
        title: "A Sincere of Humility",
        description: "As a young king, Solomon felt himself 'like a little child' and sought wisdom from God rather than wealth or honor."
      },
      {
        title: "God's Abundant Blessing",
        description: "Because he sought of God first, he was blessed with unparalleled wisdom, peace, prosperity, and joy."
      }
    ],
    hardPhrases: [
      {
        phrase: "An understanding heart",
        explanation: "The capacity of spiritual discernment to distinguish between good and bad, essential for moral leadership."
      }
    ],
    commonMisunderstanding: "Some assume Solomon's wisdom was an automatic quality that could never fail. The book demonstrates it was a daily dependent connection that cracked when pride took root.",
    modernApplication: "When starting a career or leadership position, humility and seeking God's wisdom rather than status is the ultimate foundation for long-term blessing.",
    historicalSources: [
      {
        title: "The Rise of Industrial Monarchy and Wealth",
        author: "Washington Gladden",
        publication: "Social Salvation (1902)",
        quote: "Gladden, a leading Social Gospel voice, warned that accumulating wealth and luxury could soften a nation's character and lead its rulers away from the simple demands of justice and equity.",
        quoteType: "summary",
        sourceUrl: "https://archive.org/details/socialsalvation00gladgoog",
        verifyNote: "Companion summary of Gladden's theme — not a quotation. Confirm wording in the original work."
      }
    ],
    egwQuotes: [
      {
        quote: "Solomon was never so rich or so wise or so truly great as when he confessed, \"I am but a little child: I know not how to go out or come in.\"",
        reference: "Prophets and Kings, p. 30",
        sourceUrl: "https://m.egwwritings.org/en/book/88.72"
      }
    ],
    scholarlyReferences: [],
    discussionQuestions: [
      "How do we cultivate a 'little child' spirit of humility when we get more educated or powerful?",
      "In what areas of your life are you relying on your own intellect rather than seeking divine wisdom?"
    ],
    quiz: pk1Quiz,
    egwLink: "https://m.egwwritings.org/en/book/88.72",
    theme: "Wisdom & Humility",
    themes: ["Solomon", "Wisdom", "Leadership", "Humility"],
    readingTime: "7 min"
  },
  pk2Chapter,
  pk3Chapter,
  pk4Chapter,
  pk5Chapter,
  pk6Chapter,
  pk7Chapter,
  ...generatedProphetsAndKingsChapters
];


export const book: BookType = {
  id: 'prophets-and-kings',
  totalChapters: 60,
  title: 'Prophets and Kings',
  author: 'Ellen G. White',
  description: 'An inspiring history tracing the spiritual stories of the monarchs, prophets, and judges of the Old Testament.',
  coverColor: 'bg-blue-950',
  chapters: prophetsAndKingsData,
};
