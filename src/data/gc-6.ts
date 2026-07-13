import { ChapterContextType } from '../types';
import { gc6Quiz } from './otherQuizzes';

export const gc6Chapter: ChapterContextType = {
  id: "gc-6",
  title: "Chapter 6: Huss and Jerome",
  bigIdea: "John Huss and Jerome of Prague carried Wycliffe's seed into Bohemia — preaching Scripture, defying papal interdicts, and dying at Constance after Sigismund betrayed his safe-conduct; their ashes in the Rhine could not extinguish truth, and Hussite armies and the United Brethren kept reform alive until Luther's century dawned.",
  historicalContext: "Chapter 6 opens the Bohemian line from Wycliffe's closing paragraph. Early Bohemia had Scripture and worship in the vernacular until papal bulls suppressed it; Waldensian refugees preserved faith in secret. Pre-Huss martyrs prophesied a reformer from among the common people. Huss, a charity scholar at Prague, became royal chaplain and Bethlehem preacher, reading Wycliffe through Queen Anne's influence and the English artists' contrast of Christ on an ass with the pope on a horse. Summoned to Rome, condemned in absentia, and met with interdict, he withdrew yet spread the gospel wider. At Constance he trusted emperor and pope's safe-conduct — both violated. Jerome followed, briefly recanted under torture, then reclaimed the truth and joined Huss at the stake. Bohemian wrath, Ziska and Procopius, miraculous crusader routs, and a compromised peace followed; yet the United Brethren endured persecution, corresponded with Waldenses, and waited for the century Huss and Jerome foretold — fulfilled as Luther rose.",
  bibleFoundation: [
    "2 Corinthians 13:8 - \"For we can do nothing against the truth, but for the truth.\"",
    "Matthew 10:18-20 - \"...for it shall be given you in that same hour what ye shall speak.\"",
    "1 Kings 18:17 - \"...Art thou he that troubleth Israel?\"",
    "Matthew 21:5 - \"...meek, and sitting upon an ass...\"",
    "Psalm 53:5 - \"There were they in great fear, where no fear was...\"",
    "Acts 7:59 - \"...Lord Jesus, receive my spirit.\""
  ],
  argumentFlow: [
    {
      title: "Bohemia's Hidden Light",
      description: "Scripture and vernacular worship once flourished in Bohemia until Rome forbade the native tongue; Waldensian exiles kept truth alive in secret through centuries of persecution."
    },
    {
      title: "Huss Rises at Prague",
      description: "From humble origins Huss became university rector and Bethlehem preacher, denouncing vice and reading Wycliffe — entering a path that would lead far from Rome."
    },
    {
      title: "Pictures and Protest",
      description: "English evangelists' contrast of Christ's humility and papal pride, plus Wycliffe's writings, deepened Huss's Bible study and bold denunciation of hierarchy."
    },
    {
      title: "Interdict and Withdrawal",
      description: "Condemned at Rome and threatened with interdict, Huss withdrew yet continued preaching — Rome's measures spread the gospel rather than silencing it."
    },
    {
      title: "Scripture Over Church Voice",
      description: "Huss still honored the church in theory but obeyed Scripture when Rome commanded sin — Wylie describes the torment of that conflict until conscience found its rule in God's word."
    },
    {
      title: "Constance and Betrayal",
      description: "Summoned to the council with imperial and papal safe-conduct, Huss was arrested, imprisoned, tried amid three rival popes, and condemned though the pontiff himself was soon degraded."
    },
    {
      title: "Two Stakes at Constance",
      description: "Huss died singing at the stake; Jerome, after recanting under cruelty, repented publicly, defended Huss, and perished on the same spot — ashes cast into the Rhine."
    },
    {
      title: "Hussites, Crusades, and Brethren",
      description: "Bohemian wars under Ziska and Procopius repelled papal crusades; compromised peace and persecution followed, yet United Brethren preserved gospel light until the Reformation."
    }
  ],
  hardPhrases: [
    {
      phrase: "Interdict",
      explanation: "Papal sentence suspending worship, closing churches, and denying Christian burial in a region — used to terrorize Bohemia when Huss would not submit."
    },
    {
      phrase: "Safe-conduct",
      explanation: "Imperial and papal pledge of protection for Huss traveling to Constance — shamelessly violated when he was arrested, recalling Sigismund's later betrayal of Jerome and Huss."
    },
    {
      phrase: "Archheretic",
      explanation: "Word on the paper miter placed on Huss at degradation — he called it a crown of shame worn joyfully for Christ who wore thorns."
    },
    {
      phrase: "United Brethren",
      explanation: "Bohemian Christians who separated when others compromised with Rome — preserving Scripture worship in caves while seeking fellowship with Waldenses."
    }
  ],
  commonMisunderstanding: "Some treat Huss as a fully developed Protestant who cleanly broke with Rome from the start. White shows he long viewed the church as Christ's spouse and battled abuses before seeing that submission to corrupt authority was sin — Jerome's temporary recantation under torture also warns against judging martyrs' lowest moments apart from their final witness.",
  modernApplication: "When institutions demand obedience that contradicts Scripture, Huss's path — appeal to God's word, accept costly witness, trust truth to outlive ashes — still defines faithful leadership. Safe-conducts and councils can fail; conscience bound by the Bible cannot.",
  historicalSources: [
    {
      title: "Gregory VII on Vernacular Worship",
      author: "J. A. Wylie",
      publication: "The History of Protestantism, Book III, ch. 1 (1878)",
      quote: "It was pleasing to the Omnipotent that His worship should be celebrated in an unknown language, and that many evils and heresies had arisen from not observing this rule.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/wylie/protestantism",
      verifyNote: "White quotes Wylie GC 97.1; confirm in Wylie Book III, ch. 1.",
      relevance: "Shows Rome deliberately extinguishing vernacular Scripture in Bohemia before Huss."
    },
    {
      title: "Prophecy of a Common Reformer",
      author: "J. A. Wylie",
      publication: "The History of Protestantism, Book III, ch. 1",
      quote: "There shall arise one from among the common people, without sword or authority, and against him they shall not be able to prevail.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/wylie/protestantism",
      verifyNote: "Martyr tradition via Wylie GC 98.1 — confirm wording in Wylie.",
      relevance: "Foreshadows Huss and the century-long delay before Luther."
    },
    {
      title: "Huss's Letter on Withdrawal",
      author: "John Huss (via Bonnechose)",
      publication: "The Reformers Before the Reformation, vol. 1, p. 87",
      quote: "If I have withdrawn from the midst of you, it is to follow the precept and example of Jesus Christ... but I have not quitted you to deny the divine truth.",
      quoteType: "paraphrase",
      sourceUrl: "https://scholar.google.com/scholar?q=Bonnechose+Reformers+Before+the+Reformation+Huss+letter",
      verifyNote: "Condensed from Bonnechose as cited GC 101.2.",
      relevance: "Explains Huss's withdrawal during interdict — not retreat from truth but pastoral prudence."
    },
    {
      title: "Scripture Rules Conscience",
      author: "J. A. Wylie",
      publication: "The History of Protestantism, Book III, ch. 2",
      quote: "God speaking in the Bible, and not the church speaking through the priesthood, is the one infallible guide.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/wylie/protestantism",
      verifyNote: "Summary of Wylie's analysis of Huss's inner conflict GC 102.1.",
      relevance: "Captures Huss's decisive shift toward Scripture as supreme authority over Rome's voice."
    },
    {
      title: "Faith Need Not Be Kept with Heretics",
      author: "Council of Constance (via Lenfant)",
      publication: "History of the Council of Constance, vol. 1, p. 516",
      quote: "Faith ought not to be kept with heretics, nor persons suspected of heresy, though they are furnished with safe-conducts from the emperor and kings.",
      quoteType: "paraphrase",
      sourceUrl: "https://scholar.google.com/scholar?q=Lenfant+Council+of+Constance+safe-conduct+heretics",
      verifyNote: "White cites Lenfant GC 107.2 — confirm page in Lenfant edition.",
      relevance: "Documents the principle used to betray Huss despite solemn safe-conduct."
    },
    {
      title: "Huss Commits His Spirit",
      author: "John Huss (via Wylie)",
      publication: "The History of Protestantism, Book III, ch. 7",
      quote: "I do commit my spirit into Thy hands, O Lord Jesus, for Thou hast redeemed me.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/wylie/protestantism",
      verifyNote: "White quotes Wylie GC 109.1 at degradation; confirm in Wylie Book III, ch. 7.",
      relevance: "Huss's Christ-centered defiance at the ceremony of degradation before the stake."
    },
    {
      title: "Jerome's Repentance for Condemning Huss",
      author: "Jerome of Prague (via Bonnechose)",
      publication: "The Reformers Before the Reformation, vol. 2, pp. 151-153",
      quote: "Of all the sins that I have committed since my youth, none weigh so heavily on my mind... as that which I committed when I approved of the iniquitous sentence rendered against... John Huss, my master and my friend.",
      quoteType: "paraphrase",
      sourceUrl: "https://scholar.google.com/scholar?q=Bonnechose+Jerome+Huss+recantation",
      verifyNote: "Condensed from Bonnechose GC 113-114; confirm in vol. 2.",
      relevance: "Jerome's final speech reclaimed the truth he had briefly denied under torture."
    },
    {
      title: "Crusaders Routed Without Battle",
      author: "J. A. Wylie",
      publication: "The History of Protestantism, Book III, ch. 17",
      quote: "Instead of dashing across the stream and closing in battle with the Hussites, they stood gazing in silence at those warriors — then suddenly a mysterious terror fell upon the host.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/wylie/protestantism",
      verifyNote: "White summarizes Wylie GC 117.1 — confirm narrative in Book III, ch. 17.",
      relevance: "Illustrates divine intervention in Hussite defense against papal crusades."
    }
  ],
  egwQuotes: [
    {
      quote: "The gospel had been planted in Bohemia as early as the ninth century. The Bible was translated, and public worship was conducted, in the language of the people. But as the power of the pope increased, so the word of God was obscured.",
      reference: "The Great Controversy, p. 97.1"
    },
    {
      quote: "\"Most joyfully,\" said Huss, \"will I wear this crown of shame for Thy sake, O Jesus, who for me didst wear a crown of thorns.\"",
      reference: "The Great Controversy, p. 109.1"
    },
    {
      quote: "These were to the Taborites [Hussites] what the words of Joseph were to the tribes in the house of bondage: \"I die, and God will surely visit you, and bring you out.\"",
      reference: "The Great Controversy, p. 119.1"
    }
  ],
  scholarlyReferences: [
    {
      author: "Thomas A. Fudge",
      year: 2010,
      title: "The Memory and Morality of Jan Hus",
      source: "Cascade Books",
      relevance: "Modern scholarly treatment of Huss's trial, safe-conduct controversy, and legacy after Constance.",
      directQuote: "Fudge argues that Huss's condemnation at Constance became a defining martyrdom narrative that shaped Bohemian religious identity and later Reformation memory.",
      quoteType: "summary",
      sourceUrl: "https://scholar.google.com/scholar?q=Thomas+A+Fudge+Memory+Morality+Jan+Hus",
      verifyNote: "Companion summary of Fudge's thesis — not a quotation from the monograph."
    },
    {
      author: "Ezra Hall Gillett",
      year: 1863,
      title: "Life and Times of John Huss",
      source: "Volume 2 (historical narrative cited by White)",
      relevance: "White cites Gillett on United Brethren growth at the century's end — corroborates the remnant church theme.",
      directQuote: "Gillett records that by the early sixteenth century the Brethren's churches numbered two hundred in Bohemia and Moravia despite persecution.",
      quoteType: "summary",
      sourceUrl: "https://scholar.google.com/scholar?q=Ezra+Hall+Gillett+Life+Times+John+Huss",
      verifyNote: "Companion summary of Gillett vol. 2, p. 570 as cited GC 119.2."
    }
  ],
  discussionQuestions: [
    "Why does White emphasize Huss's inner conflict between church authority and Scripture — and what does that teach about gradual reformation?",
    "How did violating Huss's safe-conduct at Constance affect Bohemia and later reformers' trust in princes?",
    "What parallels exist between Jerome's temporary recantation and later restoration, and Luther's fear of leading souls astray?",
    "Why could Rome not destroy Huss's doctrine by casting his ashes into the Rhine?"
  ],
  quiz: gc6Quiz,
  egwLink: "https://m.egwwritings.org/en/book/132/toc",
  theme: "Martyrs at Constance",
  themes: ["Huss", "Jerome", "Constance", "Safe-conduct", "Hussites", "United Brethren"],
  readingTime: "18 min"
};
