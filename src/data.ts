import { ChapterContextType, BookType } from './types';
import { stepsToChristData } from './data/stepsToChrist';
import { da1Quiz, gc1Quiz, pk1Quiz, pp1Quiz, ch1Quiz } from './data/otherQuizzes';
import { gc2Chapter } from './data/gc-2';
import { gc3Chapter } from './data/gc-3';
import { gc4Chapter } from './data/gc-4';
import { gc5Chapter } from './data/gc-5';
import { gc6Chapter } from './data/gc-6';
import { gc7Chapter } from './data/gc-7';
import { gc8Chapter } from './data/gc-8';
import { gc9Chapter } from './data/gc-9';
import { gc10Chapter } from './data/gc-10';
import { gc11Chapter } from './data/gc-11';
import { gc12Chapter } from './data/gc-12';
import { gc13Chapter } from './data/gc-13';
import { gc14Chapter } from './data/gc-14';
import { gc15Chapter } from './data/gc-15';
import { gc16Chapter } from './data/gc-16';
import { gc17Chapter } from './data/gc-17';
import { gc18Chapter } from './data/gc-18';
import { gc19Chapter } from './data/gc-19';
import { gc20Chapter } from './data/gc-20';
import { gc21Chapter } from './data/gc-21';
import { gc22Chapter } from './data/gc-22';
import { gc23Chapter } from './data/gc-23';
import { gc24Chapter } from './data/gc-24';
import { gc25Chapter } from './data/gc-25';
import { gc26Chapter } from './data/gc-26';
import { gc27Chapter } from './data/gc-27';
import { gc28Chapter } from './data/gc-28';
import { gc29Chapter } from './data/gc-29';
import { gc30Chapter } from './data/gc-30';
import { gc31Chapter } from './data/gc-31';
import { gc32Chapter } from './data/gc-32';
import { gc33Chapter } from './data/gc-33';
import { gc34Chapter } from './data/gc-34';
import { gc35Chapter } from './data/gc-35';
import { gc36Chapter } from './data/gc-36';
import { gc37Chapter } from './data/gc-37';
import { gc38Chapter } from './data/gc-38';
import { gc39Chapter } from './data/gc-39';
import { gc40Chapter } from './data/gc-40';
import { gc41Chapter } from './data/gc-41';
import { gc42Chapter } from './data/gc-42';

export { stepsToChristData };

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

export const greatControversyData: ChapterContextType[] = [
  {
    id: "gc-1",
    title: "Chapter 1: The Destruction of Jerusalem",
    bigIdea: "Jerusalem had light, warnings, temple worship, and Christ Himself — yet rejected God's visitation; the fall of A.D. 70 is prophecy fulfilled through documented history, a miniature of the final conflict between mercy persistently refused and judgment that follows.",
    historicalContext: "Ellen White does not invent the background for this chapter. She reads Jesus' prophecy through the historical fall of Jerusalem, weaving together four layers: Gospel prophecy (Luke 19, Luke 21, Matthew 24, Mark 13), Josephus' account of the siege, Eusebius' tradition of the Christian flight to Pella, and Roman evidence from Tacitus and the Arch of Titus. The sequence is historically traceable: in A.D. 66 the Roman commander Cestius Gallus surrounded Jerusalem and seemed poised to take it, then inexplicably withdrew — Josephus says he retired \"without any reason in the world.\" Christians who remembered Christ's warning in Luke 21:20–21 recognized that sign and fled before the final siege. Eusebius records that believers left Jerusalem and settled in Pella. When Titus came in A.D. 70, the city was already collapsing from within: Josephus describes three warring factions, famine so severe that houses were \"full of dead corpses,\" false prophets promising divine deliverance while the city burned, and ominous portents remembered by eyewitnesses. The temple was destroyed in the chaos; Rome then memorialized the victory on the Arch of Titus. White's point is not merely that Jerusalem fell, but that a people with every spiritual advantage rejected the visitation of God — and that mercy warned first, then judgment came only after mercy was persistently rejected. That is why The Great Controversy opens here: it becomes a prophetic pattern for the final conflict between truth and rebellion.",
    bibleFoundation: [
      "Luke 19:41-44 - \"And when he was come near, he beheld the city, and wept over it, saying... thy enemies shall cast a trench about thee, and compass thee round, and keep thee in on every side.\"",
      "Luke 21:20-21 - \"And when ye shall see Jerusalem compassed with armies, then know that the desolation thereof is nigh. Then let them which are in Judaea flee to the mountains.\"",
      "Matthew 24:2 - \"There shall not be left here one stone upon another, that shall not be thrown down.\"",
      "Mark 13:14 - \"When ye shall see the abomination of desolation... then let them that be in Judaea flee to the mountains.\""
    ],
    argumentFlow: [
      {
        title: "The First Roman Warning: Cestius Gallus (A.D. 66)",
        description: "Before Titus destroyed Jerusalem, Cestius Gallus besieged the city and had a real chance to take it — then suddenly withdrew. Josephus marvels at the retreat. White connects this with Luke 21:20–21: when believers saw Jerusalem surrounded by armies, they were to flee. That unexpected withdrawal was their window of escape."
      },
      {
        title: "The Flight to Pella",
        description: "Eusebius records that the Jerusalem church was warned to leave and settle in Pella, east of the Jordan. White says not one Christian perished in the siege because they obeyed Christ's warning. Scholars debate details of the tradition, but it is ancient and supports the chapter's central claim: obedience to prophetic light saves."
      },
      {
        title: "Jerusalem Destroyed Itself from Within",
        description: "Josephus describes three violent factions fighting inside the city even around the temple, defiling it with murder. White emphasizes that destruction was not only external — spiritual and social collapse preceded Rome's final assault."
      },
      {
        title: "The Horrors of Famine",
        description: "Josephus describes famine so severe that Roman soldiers found whole families dead in houses, upper rooms \"full of dead corpses.\" White's severe tone matches ancient testimony: the siege was one of the most terrible calamities in Jewish history."
      },
      {
        title: "False Prophets and Presumption",
        description: "Josephus says false prophets told the people to expect divine deliverance while the city collapsed. White applies this spiritually: religion used to avoid obedience is presumption, not faith. They waited for a miracle while ignoring the warning Christ had already given."
      },
      {
        title: "Ominous Signs Before the Fall",
        description: "Josephus records chariots and armed troops seen in the clouds and a voice in the temple crying, \"Let us remove hence.\" White refers to similar signs. Whether read literally or symbolically, ancient sources show the fall was remembered as preceded by warnings."
      },
      {
        title: "The Temple Burned",
        description: "Josephus says the temple was burned in the chaos of attack, \"without Caesar's approbation\" — Titus officially tried to spare it. Modern historians note Josephus wrote under Roman patronage, but the result is undisputed: the temple was destroyed, fulfilling Christ's words."
      },
      {
        title: "Rome Memorialized the Victory",
        description: "Tacitus says Titus was chosen to complete the subjugation of Judea. The Arch of Titus depicts temple spoils, including the menorah. The fall was a major imperial victory, carved into Roman public memory — not a minor religious incident."
      }
    ],
    hardPhrases: [
      {
        phrase: "The days of visitation",
        explanation: "The golden window when Jerusalem could have recognized and received the Messiah before mercy was exhausted."
      },
      {
        phrase: "Jerusalem compassed with armies",
        explanation: "Christ's sign in Luke 21:20 — fulfilled first in Cestius Gallus's siege of A.D. 66, giving believers time to flee before Titus's final destruction in A.D. 70."
      },
      {
        phrase: "Not one Christian perished",
        explanation: "White's statement that believers who heeded Christ's warning escaped the siege. Based on the early tradition recorded by Eusebius of a flight to Pella."
      },
      {
        phrase: "God does not destroy; He withdraws protection",
        explanation: "White's key distinction: judgment here is not arbitrary cruelty but the consequence of rejecting divine protection — Rome was the instrument, not the ultimate cause."
      }
    ],
    commonMisunderstanding: "Many read this chapter and see a vindictive God who destroyed Jerusalem. White's argument is the opposite: the city had every warning and rejected them. God withdrew His protective hand; Roman armies and internal factional violence were the secondary causes of a tragedy Jerusalem chose for itself.",
    modernApplication: "Mercy warns before judgment. When God gives light — through Scripture, conscience, or prophetic counsel — presumptuous waiting for a miracle while ignoring that light leads to ruin. True faith obeys the light already given.",
    historicalSources: [
      {
        title: "Cestius Gallus's Inexplicable Retreat",
        author: "Flavius Josephus",
        publication: "The Wars of the Jews, Book II, ch. 19 (c. AD 75)",
        quote: "He retired from the city, without any reason in the world.",
        quoteType: "verbatim",
        sourceUrl: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=2:chapter=19",
        verifyNote: "Whiston translation, Wars 2.19.7. Search the chapter for this exact phrase.",
        relevance: "White ties this A.D. 66 siege and sudden withdrawal to Luke 21:20–21. Believers who saw Jerusalem surrounded by armies recognized Christ's sign and fled before Titus's final siege four years later."
      },
      {
        title: "The Church's Flight to Pella",
        author: "Eusebius of Caesarea",
        publication: "Ecclesiastical History, Book III, ch. 5 (c. AD 325)",
        quote: "The whole body, however, of the church at Jerusalem, having been commanded by a divine revelation... to leave the city and to settle in a certain town of Perea called Pella.",
        quoteType: "paraphrase",
        sourceUrl: "https://www.newadvent.org/fathers/250103.htm",
        verifyNote: "Eusebius, Church History III.5. Blends translation wording (Cruse 'settle' / NPNF 'dwell'); confirm exact phrasing in the edition used.",
        relevance: "Supports White's claim that Christians escaped because they obeyed Christ's warning. The tradition is ancient, though modern scholars debate its details."
      },
      {
        title: "Three Factions Destroying the City",
        author: "Flavius Josephus",
        publication: "The Wars of the Jews, Book V, ch. 1 (c. AD 75)",
        quote: "The city was divided into three factions... and the temple was defiled by murders.",
        quoteType: "paraphrase",
        sourceUrl: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=5:whiston+chapter=1",
        verifyNote: "Condensed summary of Josephus, Wars 5.1 (three factions defiling the temple); not a single verbatim sentence.",
        relevance: "Confirms White's point that Jerusalem's ruin was not only external. Internal hatred and violence had already spiritually and socially collapsed the city before Rome finished the work."
      },
      {
        title: "Famine During the Siege",
        author: "Flavius Josephus",
        publication: "The Wars of the Jews, Book V, ch. 12 (c. AD 75)",
        quote: "The upper rooms were full of dead corpses.",
        quoteType: "paraphrase",
        sourceUrl: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=5:whiston+chapter=12",
        verifyNote: "Paraphrase of Josephus, Wars 5.12; Whiston's text reads 'the upper rooms were full of dead women and children.'",
        relevance: "Explains the chapter's severe tone. White is not exaggerating — Josephus describes one of the most terrible sieges in Jewish history."
      },
      {
        title: "False Prophets in the Siege",
        author: "Flavius Josephus",
        publication: "The Wars of the Jews, Book VI, ch. 5 (c. AD 75)",
        quote: "Now there was then a great number of false prophets suborned by the tyrants to impose on the people, who denounced this to them, that they should wait for deliverance from God.",
        quoteType: "verbatim",
        sourceUrl: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=6:whiston+chapter=5:whiston+section=2",
        verifyNote: "Whiston translation, Josephus, Wars 6.5.2 (War 6.286). Wording corrected to match Whiston exactly.",
        relevance: "Directly parallels White's spiritual warning: people used religion to avoid obedience, waiting for divine rescue while ignoring the warning Christ had already given."
      },
      {
        title: "Portents Before the Destruction",
        author: "Flavius Josephus",
        publication: "The Wars of the Jews, Book VI, ch. 5 (c. AD 75)",
        quote: "Chariots and troops of soldiers in their armor were seen running about among the clouds... Moreover, at the feast which we call Pentecost, as the priests were going by night into the inner court of the temple... they said that they heard a great noise, and then a voice saying, \"Let us remove hence.\"",
        quoteType: "verbatim",
        sourceUrl: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=6:whiston+chapter=5:whiston+section=3",
        verifyNote: "Whiston translation, Josephus, Wars 6.5.3; excerpted with ellipses from the account of the portents.",
        relevance: "White refers to similar signs in this chapter. Josephus shows that contemporaries remembered the fall as preceded by ominous warnings."
      },
      {
        title: "The Burning of the Temple",
        author: "Flavius Josephus",
        publication: "The Wars of the Jews, Book VI, ch. 4 (c. AD 75)",
        quote: "The temple was burned against the will of Caesar.",
        quoteType: "paraphrase",
        sourceUrl: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0148:book=6:whiston+chapter=4",
        verifyNote: "Paraphrase of Josephus, Wars 6.4, where Titus is depicted trying to spare the temple; not a verbatim sentence.",
        relevance: "Fulfills Christ's prophecy that not one stone would remain upon another. Josephus presents Titus as trying to prevent the destruction, though some historians question how much Josephus protects his Roman patron."
      },
      {
        title: "Rome's Conquest of Judea",
        author: "Tacitus",
        publication: "Histories, Book V (c. AD 110)",
        quote: "Titus was appointed to complete the subjugation of Judaea.",
        quoteType: "paraphrase",
        sourceUrl: "https://en.wikisource.org/wiki/The_Histories_(Tacitus)/Book_5",
        verifyNote: "Condensed from Tacitus, Histories 5.1 (Church & Brodribb: 'selected by his father to complete the subjugation of Judaea').",
        relevance: "Shows the fall of Jerusalem was a major imperial event, not a minor religious incident — consistent with White's framing of prophecy fulfilled on the stage of world history."
      }
    ],
    egwQuotes: [
      {
        quote: "The tears of Christ were not for Himself... He wept for Jerusalem—the city of His pride, which had rejected the salvation He came to bring.",
        reference: "The Great Controversy, p. 17.1"
      },
      {
        quote: "When the idolatrous standards of the Romans were set up in the holy ground, which extended some furlongs outside the city walls, and when the siege was begun, Christians within the city took the warning of Christ and fled.",
        reference: "The Great Controversy, p. 26.1"
      },
      {
        quote: "Not one Christian perished in the destruction of Jerusalem. Christ had given His disciples warning, and all who believed His words watched for the promised sign.",
        reference: "The Great Controversy, p. 30.2"
      }
    ],
    scholarlyReferences: [
      {
        author: "Dr. Rolf J. Pöhler",
        year: 2020,
        title: "The Great Controversy: Hermeneutical Aspects",
        source: "Andrews University Seminary Studies",
        relevance: "Explains why White opens the book with Jerusalem: history is framed as a struggle over God's character and law, not random geopolitical events.",
        directQuote: "White's treatment of the fall of Jerusalem lays the groundwork for her entire philosophy of history. She frames history not as a series of random geopolitical events, but as a struggle over the character and law of God.",
        quoteType: "summary",
        sourceUrl: "https://scholar.google.com/scholar?q=Rolf+P%C3%B6hler+Great+Controversy+Hermeneutical+Andrews",
        verifyNote: "Companion summary of Pöhler's argument — confirm wording in the journal article."
      },
      {
        author: "Kinji Hidemura",
        year: 1967,
        title: "The Tradition of the Jewish Christians' Flight to Pella and the Church of Jerusalem",
        source: "Bulletin of the Society for Near Eastern Studies in Japan",
        relevance: "Surveys scholarly debate over the Pella tradition — including S. G. F. Brandon's skepticism — while noting the tradition dates to Eusebius in the fourth century and may rest on genuine early Christian memory.",
        directQuote: "There are grave reasons for doubting the credibility of this tradition... But this conclusion does not necessarily imply that the accounts of the two Christian writers are entirely fabrications, but these may rest upon some genuine traditions of Pella having once given shelter to a body of Jewish Christians.",
        quoteType: "paraphrase",
        sourceUrl: "https://www.jstage.jst.go.jp/article/jorient1962/10/3-4/10_3-4_17/_article/-char/en",
        verifyNote: "Excerpt from Hidemura's abstract (1967) with ellipsis. Read the full article at J-STAGE."
      }
    ],
    discussionQuestions: [
      "How does Cestius Gallus's withdrawal in A.D. 66 strengthen the connection between Luke 21:20–21 and the Christian escape before A.D. 70?",
      "What is the difference between God actively punishing and God withdrawing His protective hand?",
      "How did false prophets inside besieged Jerusalem illustrate the danger of presumptuous faith that ignores clear warnings?",
      "Why does White begin The Great Controversy with Jerusalem rather than with the Reformation or end-time prophecy?"
    ],
    quiz: gc1Quiz,
    egwLink: "https://m.egwwritings.org/en/book/132/toc",
    theme: "Prophecy & Judgment",
    themes: ["Prophecy", "Jerusalem AD 70", "Josephus", "Protective Grace", "Obedience to Light"],
    readingTime: "14 min"
  },
  gc2Chapter,
  gc3Chapter,
  gc4Chapter,
  gc5Chapter,
  gc6Chapter,
  gc7Chapter,
  gc8Chapter,
  gc9Chapter,
  gc10Chapter,
  gc11Chapter,
  gc12Chapter,
  gc13Chapter,
  gc14Chapter,
  gc15Chapter,
  gc16Chapter,
  gc17Chapter,
  gc18Chapter,
  gc19Chapter,
  gc20Chapter,
  gc21Chapter,
  gc22Chapter,
  gc23Chapter,
  gc24Chapter,
  gc25Chapter,
  gc26Chapter,
  gc27Chapter,
  gc28Chapter,
  gc29Chapter,
  gc30Chapter,
  gc31Chapter,
  gc32Chapter,
  gc33Chapter,
  gc34Chapter,
  gc35Chapter,
  gc36Chapter,
  gc37Chapter,
  gc38Chapter,
  gc39Chapter,
  gc40Chapter,
  gc41Chapter,
  gc42Chapter
];

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
        quote: "At the beginning of his reign Solomon knew that he was but a child, and in his helplessness he sought wisdom from God.",
        reference: "Prophets and Kings, p. 30.1"
      }
    ],
    scholarlyReferences: [],
    discussionQuestions: [
      "How do we cultivate a 'little child' spirit of humility when we get more educated or powerful?",
      "In what areas of your life are you relying on your own intellect rather than seeking divine wisdom?"
    ],
    quiz: pk1Quiz,
    egwLink: "https://m.egwwritings.org/en/book/131/toc",
    theme: "Wisdom & Humility",
    themes: ["Solomon", "Wisdom", "Leadership", "Humility"],
    readingTime: "7 min"
  }
];

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

export const counselsOnHealthData: ChapterContextType[] = [
  {
    id: "ch-1",
    title: "Chapter 1: Our Bodies a Temple of the Holy Spirit",
    bigIdea: "Stewardship of the physical body directly affects mental clarity and our capability to perceive and respond to spiritual truth.",
    historicalContext: "Published as a compilation of letters and articles in 1923, a period when sanitary science and preventive medicine were primitive, Ellen White pioneered the concept of holistic health, connecting physical habits directly with spiritual welfare.",
    bibleFoundation: [
      "1 Corinthians 6:19 - \"What? know ye not that your body is the temple of the Holy Ghost...\"",
      "3 John 1:2 - \"I wish above all things that thou mayest prosper and be in health...\""
    ],
    argumentFlow: [
      {
        title: "The Holistic Connection",
        description: "The mind and soul communicate through the physical nervous system. Therefore, physical health is a spiritual concern."
      },
      {
        title: "Stewardship of Energy",
        description: "Intemperance or neglecting rest exhausts the vitality, clouding our spiritual perception and decision making."
      }
    ],
    hardPhrases: [
      {
        phrase: "Violation of natural law",
        explanation: "Breaking the biological rules of health—such as poor diet or lack of rest—which is a moral transgression against our Creator."
      }
    ],
    commonMisunderstanding: "Some view health reform as a legalistic requirement for salvation. Ellen White presents it as a merciful provision to maximize our joy and capacity to serve.",
    modernApplication: "In our high-stress, fast-food digital era, maintaining sleep, clean eating, and exercise is a vital spiritual discipline that restores mental sovereignty.",
    historicalSources: [
      {
        title: "The Principles of Sanitary Science",
        author: "Dr. John Harvey Kellogg",
        publication: "The Battle Creek Sanitarium System (1908)",
        quote: "Kellogg promoted the Battle Creek regimen of pure water, fresh air, sunlight, exercise, and a diet of grains, fruits, and nuts, teaching that the body tends toward self-healing when given natural conditions.",
        quoteType: "summary",
        sourceUrl: "https://archive.org/details/battlecreeksanit00kell",
        verifyNote: "Companion summary of Kellogg's health philosophy — not a quotation. Confirm wording in the original work."
      }
    ],
    egwQuotes: [
      {
        quote: "The body is the only medium through which the mind and the soul are developed for the upbuilding of character.",
        reference: "Counsels on Health, p. 11.2"
      }
    ],
    scholarlyReferences: [
      {
        author: "Ronald L. Numbers",
        year: 2008,
        title: "Prophetess of Health: A Study of Ellen G. White",
        source: "University of Wisconsin Press",
        relevance: "A historical biography analyzing the connection between Victorian health reform and Ellen White's health visions.",
        directQuote: "Numbers situates Ellen White's health teachings within nineteenth-century American health reform, arguing that her emphasis on diet, natural remedies, and hygiene paralleled contemporary reformers while she cast these lifestyle habits as a moral and spiritual duty.",
        quoteType: "summary",
        sourceUrl: "https://archive.org/details/prophetessofheal0000numb",
        verifyNote: "Companion summary of Numbers's argument — not a quotation. Confirm wording in the book (3rd ed., Univ. of Wisconsin Press, 2008)."
      }
    ],
    discussionQuestions: [
      "How does physical tiredness affect your patience and spiritual awareness?",
      "In what practical way can you treat your body more like a sacred temple this week?"
    ],
    quiz: ch1Quiz,
    egwLink: "https://m.egwwritings.org/en/book/140/toc",
    theme: "Holistic Stewardship",
    themes: ["Health Temple", "Holistic Health", "Mental Clarity", "TEMPERANCE"],
    readingTime: "5 min"
  }
];

export const allBooks: BookType[] = [
  {
    id: "steps-to-christ",
    totalChapters: 13,
    title: "Steps to Christ",
    author: "Ellen G. White",
    description: "A devotional classic navigating the practical steps of building and maintaining a genuine relationship with Jesus Christ.",
    coverColor: "bg-slate-800",
    chapters: stepsToChristData
  },
  {
    id: "desire-of-ages",
    totalChapters: 87,
    title: "The Desire of Ages",
    author: "Ellen G. White",
    description: "An incredibly deep, gorgeous account focusing on the personal ministry, teachings, and transformative love of Jesus Christ.",
    coverColor: "bg-emerald-900",
    chapters: desireOfAgesData
  },
  {
    id: "great-controversy",
    totalChapters: 42,
    title: "The Great Controversy",
    author: "Ellen G. White",
    description: "A sweeping historical and prophetic outline of the battle between truth and error from the fall of Jerusalem to the future.",
    coverColor: "bg-red-950",
    chapters: greatControversyData
  },
  {
    id: "prophets-and-kings",
    totalChapters: 60,
    title: "Prophets and Kings",
    author: "Ellen G. White",
    description: "An inspiring history tracing the spiritual stories of the monarchs, prophets, and judges of the Old Testament.",
    coverColor: "bg-blue-950",
    chapters: prophetsAndKingsData
  },
  {
    id: "patriarchs-and-proph",
    totalChapters: 73,
    title: "Patriarchs and Prophets",
    author: "Ellen G. White",
    description: "Covers the sprawling history of the early world, from the origin of evil and creation up to the close of King David's reign.",
    coverColor: "bg-amber-950",
    chapters: patriarchsAndProphetsData
  },
  {
    id: "counsels-on-health",
    totalChapters: 8,
    title: "Counsels on Health",
    author: "Ellen G. White",
    description: "A comprehensive manual details the moral, spiritual, and medical principles of healthy living as a divine calling.",
    coverColor: "bg-teal-950",
    chapters: counselsOnHealthData
  }
];
