import { ChapterContextType } from '../types';
import { gc8Quiz } from './otherQuizzes';

export const gc8Chapter: ChapterContextType = {
  id: "gc-8",
  title: "Chapter 8: Luther Before the Diet",
  bigIdea: "At the Diet of Worms before Charles V, Luther — after Aleander's failed rhetoric and Duke George's unexpected indictment of Rome — refused to retract unless convinced by Scripture; his 'Here I stand' testimony, imperial safe-conduct honored despite papal demands, and secret refuge at Wartburg turned apparent defeat into gospel advance.",
  historicalContext: "Chapter 8 centers on Worms 1521. Charles V, pressed by Rome yet indebted to Saxony, granted Luther a hearing. Aleander denounced the Reformer before Luther arrived; Duke George of Saxony then detailed papal greed and demanded reform — a speech White says Luther could scarce have bettered. Luther entered Worms amid crowds and warnings of Huss's fate; Charles refused to repeat Sigismund's betrayal. After prayer in anguish — wrestling for truth, not mere safety — Luther answered that he could not retract unless Scripture proved him wrong: 'Here I stand.' Charles admired his courage yet chose ancestral allegiance to Rome. Papists wanted Luther drowned in the Rhine like Huss; German princes upheld honor. Frederick secretly conveyed Luther to Wartburg where he translated the New Testament and warned against hero-worship — God removing him so eyes would turn from the monk to the word.",
  bibleFoundation: [
    "Matthew 10:33 - \"Whosoever shall deny Me before men, him will I also deny before My Father...\"",
    "Matthew 10:28 - \"Fear not them which kill the body, but are not able to kill the soul.\"",
    "Matthew 10:18-20 - \"...for it shall be given you in that same hour what ye shall speak.\"",
    "Ecclesiastes 10:16 - \"Woe to thee, O land, when thy king is a child...\"",
    "John 15:22 - \"If I had not come and spoken unto them, they had not had sin...\"",
    "Psalm 119:130 - \"The entrance of thy words giveth light...\""
  ],
  argumentFlow: [
    {
      title: "Empire Meets the Reformer",
      description: "Charles V's Diet at Worms gathered church and state — yet the deepest interest was Luther's cause, with Saxony demanding scriptural hearing and safe-conduct."
    },
    {
      title: "Aleander and Duke George",
      description: "Rome's orator demanded burning heretics; unexpectedly Duke George denounced papal greed — truth spoken through an opponent before Luther appeared."
    },
    {
      title: "Road to Worms",
      description: "Luther marched toward Worms despite edicts and Huss comparisons, preaching Christ alone at Erfurt — faith, not works, the path to peace."
    },
    {
      title: "Before the Emperor",
      description: "In history's most imposing assembly Luther asked time to answer lest he sin against Christ's word — wisdom that strengthened his final stand."
    },
    {
      title: "Night of Prayer",
      description: "Anguish drove Luther to prayer — not for personal escape but that gospel truth might triumph; like Jacob, he prevailed with God."
    },
    {
      title: "Here I Stand",
      description: "Unless convinced by Scripture or clear reasoning, Luther would not retract — conscience captive to God's word; the assembly stood amazed."
    },
    {
      title: "Honor and Edict",
      description: "Charles honored safe-conduct yet pledged to destroy 'heresy'; princes refused Rhine murder; Luther departed rejoicing that Christ breached Rome's citadel."
    },
    {
      title: "Wartburg and Hidden Work",
      description: "Frederick's secret rescue led to Wartburg — New Testament translation, tracts, and humility lest men honor Luther instead of God's word."
    }
  ],
  hardPhrases: [
    {
      phrase: "Here I stand; I can do no other",
      explanation: "Luther's final answer at Worms — conscience bound by Scripture above pope and councils; the Reformation's definitive refusal to recant truth."
    },
    {
      phrase: "Did not Sigismund cause John Huss to be burnt?",
      explanation: "Bishop's appeal at Worms to violate safe-conduct — Charles refused to blush like Sigismund, remembering Huss's public rebuke of broken faith."
    },
    {
      phrase: "The Rhine should receive his ashes",
      explanation: "Papal party's proposal to murder Luther as Huss had been destroyed — rejected by German princes who feared national calamity."
    },
    {
      phrase: "Wartburg",
      explanation: "Frederick's hidden fortress where Luther was secretly conveyed — 'rocky Patmos' for German New Testament translation and reform writings."
    }
  ],
  commonMisunderstanding: "Some treat Worms as Luther's complete victory that immediately freed Germany. White shows Charles still pledged to crush heresy, an edict followed, and Luther's work continued in hiding — Worms was a moral and spiritual triumph that still required providential protection and years of labor.",
  modernApplication: "Charles rejected light to follow fathers' customs — a warning against tradition that blocks advancing truth. Luther's standard remains: civil obedience in temporal things, but no submission of conscience to men when eternal interests and Scripture are at stake.",
  historicalSources: [
    {
      title: "Aleander on Burning Heretics",
      author: "Aleander (via D'Aubigné)",
      publication: "History of the Reformation, Book VII, ch. 3",
      quote: "In Luther's errors there is enough to warrant the burning of a hundred thousand heretics.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "White cites D'Aubigne GC 148.2 — confirm Book VII, ch. 3.",
      relevance: "Shows Rome's bloodthirsty stance before Luther's defense at Worms."
    },
    {
      title: "Duke George on Papal Greed",
      author: "Duke George of Saxony (via D'Aubigné)",
      publication: "History of the Reformation, Book VII, ch. 4",
      quote: "Money, money, money — so that the preachers who should teach the truth utter nothing but falsehoods.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "Condensed from Duke George's speech GC 150.1.",
      relevance: "Remarkable papist indictment of clerical corruption before Luther spoke."
    },
    {
      title: "Poor Monk, Nobler Stand",
      author: "Old general (via D'Aubigne)",
      publication: "History of the Reformation, Book VII, ch. 8",
      quote: "Poor monk, poor monk, thou art now going to make a nobler stand than I or any other captains have ever made in the bloodiest of our battles.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "Anecdote before Luther entered Diet GC 155.1.",
      relevance: "Human recognition that Worms was spiritual warfare exceeding earthly battle."
    },
    {
      title: "Here I Stand — Full Answer",
      author: "Martin Luther (via D'Aubigné)",
      publication: "History of the Reformation, Book VII, ch. 8",
      quote: "Unless I am convinced by the testimony of Scripture or by the clearest reasoning... I cannot and I will not retract, for it is unsafe for a Christian to speak against his conscience. Here I stand, I can do no other; may God help me. Amen.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "Core Worms declaration GC 160.1 — confirm wording in D'Aubigne Book VII, ch. 8.",
      relevance: "The chapter's climactic confession — Scripture and conscience above Rome."
    },
    {
      title: "Charles on Safe-Conduct",
      author: "Charles V (via D'Aubigné)",
      publication: "History of the Reformation, Book VII, ch. 9",
      quote: "Though honor and faith should be banished from all the world, they ought to find a refuge in the hearts of princes.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "Charles refusing Huss-style betrayal GC 163.2.",
      relevance: "Imperial honor spared Luther immediate destruction — contrast with Constance."
    },
    {
      title: "Should Not Like to Blush Like Sigismund",
      author: "Charles V (via Lenfant)",
      publication: "History of the Council of Constance, vol. 1, p. 422",
      quote: "I should not like to blush like Sigismund.",
      quoteType: "paraphrase",
      sourceUrl: "https://scholar.google.com/scholar?q=Lenfant+Sigismund+Huss+safe-conduct",
      verifyNote: "White cites Lenfant GC 163.2.",
      relevance: "Charles explicitly remembered Huss when urged to violate Luther's safe-conduct."
    },
    {
      title: "Spiritual Submission Is Worship",
      author: "Martin Luther (via D'Aubigné)",
      publication: "History of the Reformation, Book VII, ch. 11",
      quote: "When eternal interests are concerned, God wills not that man should submit unto man. For such submission in spiritual matters is a real worship.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "Letter to emperor after Worms GC 167.2.",
      relevance: "Luther distinguished civil loyalty from conscience owed only to God."
    },
    {
      title: "Satan Himself Under a Monk's Frock",
      author: "Edict of Worms (via D'Aubigné)",
      publication: "History of the Reformation, Book VII, ch. 11",
      quote: "Satan himself under the form of a man and dressed in a monk's frock.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.gutenberg.org/ebooks/40858",
      verifyNote: "Imperial edict after Luther's departure GC 168.1.",
      relevance: "Shows official condemnation that followed — yet God hid Luther at Wartburg."
    }
  ],
  egwQuotes: [
    {
      quote: "I cannot submit my faith either to the pope or to the councils, because it is clear as the day that they have frequently erred and contradicted each other. Unless therefore I am convinced by the testimony of Scripture or by the clearest reasoning... I cannot and I will not retract, for it is unsafe for a Christian to speak against his conscience. Here I stand, I can do no other; may God help me. Amen.",
      reference: "The Great Controversy, p. 160.1"
    },
    {
      quote: "Though honor and faith should be banished from all the world, they ought to find a refuge in the hearts of princes.",
      reference: "The Great Controversy, p. 163.2"
    },
    {
      quote: "The gospel of Christ cannot be preached without offense. ... I would rather give up my body, my blood, and my life.",
      reference: "The Great Controversy, p. 166.1"
    }
  ],
  scholarlyReferences: [
    {
      author: "Mark U. Edwards Jr.",
      year: 2004,
      title: "Law and the Gospel in Luther's Reform",
      source: "Harvard University Press (related Worms scholarship)",
      relevance: "Academic analysis of Luther's legal and theological position at imperial diets.",
      directQuote: "Edwards emphasizes that Luther's Worms stance rested on conscience bound by Scripture within emerging imperial legal norms of safe-conduct.",
      quoteType: "summary",
      sourceUrl: "https://scholar.google.com/scholar?q=Mark+Edwards+Luther+Worms+Diet",
      verifyNote: "Companion summary of scholarly treatment of Worms — not a direct quotation."
    },
    {
      author: "James M. Kittelson",
      year: 1986,
      title: "Luther the Reformer: The Story of the Man and His Career",
      source: "Augsburg Fortress",
      relevance: "Biographical account of Worms journey, Diet sessions, and Wartburg concealment.",
      directQuote: "Kittelson presents Worms as the public crystallization of Luther's scriptural authority already forged in the preceding four years of controversy.",
      quoteType: "summary",
      sourceUrl: "https://scholar.google.com/scholar?q=Kittelson+Luther+the+Reformer+Worms",
      verifyNote: "Companion summary — not a quotation from Kittelson."
    }
  ],
  discussionQuestions: [
    "Why was Duke George's speech against Rome significant when he remained Luther's enemy?",
    "How does Luther's night of prayer at Worms differ from mere fear of martyrdom?",
    "What does Charles's refusal to repeat Sigismund's sin teach about honor — and his rejection of truth?",
    "Why did God remove Luther to Wartburg instead of letting popular acclaim crown the Reformer?"
  ],
  quiz: gc8Quiz,
  egwLink: "https://m.egwwritings.org/en/book/132/toc",
  theme: "Here I Stand at Worms",
  themes: ["Worms", "Charles V", "Here I Stand", "Safe-conduct", "Wartburg", "Conscience"],
  readingTime: "18 min"
};
