import { ChapterContextType, BookType } from '../types';
import { pp1Quiz } from './otherQuizzes';

export const patriarchsAndProphetsData: ChapterContextType[] = [
  {
    id: "pp-1",
    title: "Chapter 1: Why Was Sin Permitted?",
    bigIdea: "Sin began in Lucifer's pride, showing that modern rebellion is the result of self-centered defiance of a government based entirely on love.",
    historicalContext: "Published in 1890, when Darwinian evolution was rising rapidly and questioning the goodness of a Creator in a world of suffering, Ellen White addressed the root origin of evil, tracing it back before humanity to Lucifer's rebellion to show that God's character is innocent of the origin of sin.",
    bibleFoundation: [
      "1 John 4:8 - \"God is love.\"",
      "Ezekiel 28:15 - \"Thou wast perfect in thy ways... till iniquity was found in thee.\""
    ],
    argumentFlow: [
      {
        title: "The Government of Love",
        description: "God is a Sovereign of love, desiring voluntary service and affection from all His created beings."
      },
      {
        title: "The Rise of Self-Exaltation",
        description: "Lucifer, the highly honored covering cherub, began to covet the worship due to God alone, spreading silent discord."
      }
    ],
    hardPhrases: [
      {
        phrase: "The mystery of iniquity",
        explanation: "The inexplicable nature of sin. Sincere rebellion has no valid excuse or logic; to excuse it would be to defend it."
      }
    ],
    commonMisunderstanding: "Many believe God created Lucifer with evil inclinations. The chapter emphasizes he was made perfectly holy and chose to rebel through free will.",
    modernApplication: "Recognizing that pride is the absolute starting point of all dysfunction warns us against harboring self-exaltation.",
    historicalSources: [
      {
        title: "The Genesis of Species and the Character of Nature",
        author: "St. George Jackson Mivart",
        publication: "On the Genesis of Species (1871)",
        quote: "Mivart, a Catholic biologist critical of unaided natural selection, argued that organic life reflects a harmonious, purposeful design rather than mere random struggle and survival.",
        quoteType: "summary",
        sourceUrl: "https://archive.org/details/ongenesisspecie00mivagoog",
        verifyNote: "Companion summary of Mivart's argument — not a quotation. Confirm wording in the original work."
      }
    ],
    egwQuotes: [
      {
        quote: "God desires from all His creatures the service of love—service that springs from an appreciation of His character. He takes no pleasure in a forced obedience.",
        reference: "Patriarchs and Prophets, p. 35.1"
      }
    ],
    scholarlyReferences: [],
    discussionQuestions: [
      "Why is free will essential for true, meaningful love to exist?",
      "In what ways can we safeguard our hearts from the subtle entrance of spiritual pride?"
    ],
    quiz: pp1Quiz,
    egwLink: "https://m.egwwritings.org/en/book/133/toc",
    theme: "The Origin of Evil",
    themes: ["Free Will", "Origin of Sin", "Lucifer", "Government of Love"],
    readingTime: "8 min"
  }
];


export const book: BookType = {
  id: 'patriarchs-and-proph',
  totalChapters: 73,
  title: 'Patriarchs and Prophets',
  author: 'Ellen G. White',
  description: 'Covers the sprawling history of the early world, from the origin of evil and creation up to the close of King David’s reign.',
  coverColor: 'bg-amber-950',
  chapters: patriarchsAndProphetsData,
};
