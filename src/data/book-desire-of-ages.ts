import { ChapterContextType, BookType } from '../types';
import { da1Quiz } from './otherQuizzes';

export const desireOfAgesData: ChapterContextType[] = [
  {
    id: "da-1",
    title: "Chapter 1: \"God With Us\"",
    bigIdea: "The incarnation of Christ bridged the gap of sin, bringing the character and light of God directly to live with humanity.",
    historicalContext: "Published in 1898 during a period of growing theological skepticism (Modernism and Higher Criticism) which doubted the literal divinity of Christ, Ellen White crafted The Desire of Ages as an immersive, highly spiritual biography that re-established Christ as fully divine, fully human, and inherently loving toward us.",
    bibleFoundation: [
      "Matthew 1:23 - \"They shall call His name Immanuel... God with us.\"",
      "John 1:14 - \"And the Word was made flesh, and dwelt among us...\""
    ],
    argumentFlow: [
      {
        title: "Immanuel: The Character of God",
        description: "From the days of eternity the Lord Jesus Christ was one with the Father; His life revealed what God's love actually looks like."
      },
      {
        title: "Revealing the Law of Self-Renunciation",
        description: "Christ lived a life of giving rather than self-service, which is the foundational law of life in the universe."
      }
    ],
    hardPhrases: [
      {
        phrase: "Law of self-renunciation",
        explanation: "The core principle that life is designed to flow outward in benediction to others, not accumulate inward for self."
      }
    ],
    commonMisunderstanding: "Some view the incarnation as a tactical, temporary plan. This chapter shows it is an eternal pledge of God's union with humanity.",
    modernApplication: "In a world driven by self-promotion, Christ's self-renouncing love is the ultimate model for true human fulfillment and influence.",
    historicalSources: [
      {
        title: "Higher Criticism and the Historical Jesus",
        author: "Charles Augustus Briggs",
        publication: "The Bible, the Church, and the Reason (1892)",
        quote: "In this work Briggs argued that higher criticism, rather than destroying Scripture, could free it from traditional accretions and serve the faith — a claim that made him a lightning rod in the modernist–fundamentalist conflict of the 1890s.",
        quoteType: "summary",
        sourceUrl: "https://onlinebooks.library.upenn.edu/webbin/book/lookupname?key=Briggs%2C+Charles+A.+%28Charles+Augustus%29%2C+1841-1913",
        verifyNote: "Companion summary of Briggs's argument — not a quotation. Confirm wording in the original work."
      }
    ],
    egwQuotes: [
      {
        quote: "But by coming to dwell with us, Jesus was to reveal God to both men and angels. He was the Word of God,—God's thought made audible.",
        reference: "The Desire of Ages, p. 19.1"
      }
    ],
    scholarlyReferences: [
      {
        author: "Dr. Fred Veltman",
        year: 1988,
        title: "The Desire of Ages Project",
        source: "General Conference of Seventh-day Adventists",
        relevance: "A comprehensive denominational study analyzing the composition, literary sources, and historical reliability of the text.",
        directQuote: "Veltman's eight-year Life of Christ Research Project concluded that Ellen White drew on earlier authors — chiefly William Hanna's Life of Christ — and that on average roughly 31 percent of the sampled Desire of Ages text shows some literary dependence, while affirming her distinctive devotional and theological purpose.",
        quoteType: "summary",
        sourceUrl: "https://documents.adventistarchives.org/Resources/LOCRP/LOCRP-00_Pre.pdf",
        verifyNote: "Companion summary of Veltman's findings — not a quotation. See the full Life of Christ Research Project report at the Adventist archives."
      }
    ],
    discussionQuestions: [
      "What does 'God with us' mean to you in moments of profound loneliness?",
      "How is the 'law of self-renunciation' visible in the creation around us?"
    ],
    quiz: da1Quiz,
    egwLink: "https://m.egwwritings.org/en/book/130/toc",
    theme: "The Incarnation & Eternity",
    themes: ["Incarnation", "God With Us", "Love", "Self-Renunciation"],
    readingTime: "8 min"
  }
];


export const book: BookType = {
  id: 'desire-of-ages',
  totalChapters: 87,
  title: 'The Desire of Ages',
  author: 'Ellen G. White',
  description: 'An incredibly deep, gorgeous account focusing on the personal ministry, teachings, and transformative love of Jesus Christ.',
  coverColor: 'bg-emerald-900',
  chapters: desireOfAgesData,
};
