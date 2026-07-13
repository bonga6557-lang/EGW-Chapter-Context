import { ChapterContextType } from '../types';
import { gc13Quiz } from './otherQuizzes';

export const gc13Chapter: ChapterContextType = {
  id: "gc-13",
  title: "Chapter 13: The Netherlands and Scandinavia",
  bigIdea: "From Waldensian roots and Menno Simons to William of Orange, the Low Countries paid in blood for an open Bible — while in Denmark and Sweden, Tausen and the Petri brothers brought Luther's gospel north with Scripture in the vernacular and kings won to reform.",
  historicalContext: "Chapter 13 widens the Reformation map. In the Netherlands, bishops seven centuries before Luther impeached papal tyranny (Brandt); Waldensian missionaries left verse Bibles and simple gospel teaching. Menno Simons, a priest who feared reading Scripture, found rebaptism and justification in the New Testament and labored twenty-five years amid fanatic confusion and fierce edicts — Bible reading, preaching, or secret prayer could mean death by sword or burial alive. Wylie records families burned for worshiping at home; wives sang psalms at husbands' stakes. Persecution increased witnesses; William of Orange's revolution at last secured worship freedom. In Scandinavia, students from Wittenberg carried light north: Tausen, forbidden to attend Wittenberg, went anyway and preached until Denmark accepted reform; Olaf and Laurentius Petri, trained by Luther and Melanchthon, defended sola Scriptura before the Swedish king, translated the Bible, and helped Sweden become a Protestant bulwark — later aiding Germany in the Thirty Years' War. White uses the obscure Petri disputation to show Reformers' rank and file were learned Bible men, not ignorant sectaries.",
  bibleFoundation: [
    "Galatians 1:8 - \"But though we, or an angel from heaven, preach any other gospel unto you than that which we have preached unto you, let him be accursed.\"",
    "John 7:16 - \"My doctrine is not mine, but his that sent me.\"",
    "Acts 2:38 - \"Repent, and be baptized every one of you in the name of Jesus Christ...\"",
    "Matthew 28:19-20 - \"Go ye therefore, and teach all nations...\"",
    "Revelation 12:11 - \"They overcame him by the blood of the Lamb, and by the word of their testimony...\"",
    "Revelation 1:9 - \"...for the word of God, and for the testimony of Jesus Christ.\""
  ],
  argumentFlow: [
    {
      title: "Early Dutch Protest",
      description: "Centuries before Luther, Low Country bishops and Waldensian missionaries upheld Scripture against Rome — vernacular verse Bibles and refusal to coerce belief."
    },
    {
      title: "Menno Simons and Anabaptist Clarity",
      description: "A Catholic priest converted through Scripture separated from fanatic violence, taught believers' baptism and peace, and evangelized Germany and Holland for twenty-five years under persecution."
    },
    {
      title: "Netherlands Under Fire",
      description: "Charles V and Philip II banned Bible, preaching, and even private prayer; men died by sword, women by live burial — yet faith multiplied."
    },
    {
      title: "Martyrs' Courage",
      description: "Families worshiped secretly; martyrs sang at the stake; young maidens entered graves as if going to marriage — persecution could not crush testimony."
    },
    {
      title: "William of Orange",
      description: "After generations of terror, the Dutch Revolution secured freedom to worship — blood of Christians as seed fulfilled again."
    },
    {
      title: "Tausen and Denmark",
      description: "Forbidden Wittenberg, Tausen read Luther, preached from cloister cells, was expelled, and under royal protection led Denmark to accept reform with Danish New Testament."
    },
    {
      title: "Petri Brothers in Sweden",
      description: "Olaf and Laurentius, Luther's students, defended Scripture against Fathers before the king — Bible only as rule of faith; Sweden received vernacular Bible and school instruction."
    },
    {
      title: "Northern Bulwark",
      description: "Freed from Romish oppression, Scandinavia gained strength; a century later Sweden's armies helped turn the tide for Protestant Germany."
    }
  ],
  hardPhrases: [
    {
      phrase: "Blood of the Christians was seed",
      explanation: "Tertullian's ancient observation (via White) — persecution spreads rather than destroys the gospel."
    },
    {
      phrase: "Reformer of Denmark",
      explanation: "Title White gives Hans Tausen — peasant-born monk turned Wittenberg student and national evangelist."
    },
    {
      phrase: "Church in the Desert",
      explanation: "Not in this chapter's title but related Huguenot/Waldensian imagery elsewhere — here the Dutch 'desert' of secret worship under edict."
    },
    {
      phrase: "Rank and file of the army of Reformers",
      explanation: "Wylie's phrase (via White) for learned, Scripture-grounded leaders like the Petri brothers beyond famous centers like Wittenberg."
    }
  ],
  commonMisunderstanding: "Some lump all Dutch Anabaptists with Munsterite violence. White distinguishes Menno's peaceful, Scripture-based movement from fanatic sedition. Others think Scandinavian reform was imposed only by kings; the chapter shows preachers, translators, and disputations — yet also royal edicts protecting teachers.",
  modernApplication: "Secret worship, family Bible reading, and patient evangelism under oppression remain models where liberty is threatened. The chapter also warns against confusing zealous error with the gospel Menno defended.",
  historicalSources: [
    {
      title: "Bishops Impeach the Papacy",
      author: "Two bishops (via Gerard Brandt)",
      publication: "History of the Reformation in and About the Low Countries, Book I, p. 6",
      quote: "You set up yourself in the temple of God; instead of a pastor, you are become a wolf to the sheep; you would make us believe you are a supreme bishop, but you rather behave like a tyrant.",
      quoteType: "paraphrase",
      sourceUrl: "https://scholar.google.com/scholar?q=Gerard+Brandt+Reformation+Low+Countries+bishops+wolf",
      verifyNote: "White GC 238.1 quotes Brandt Book I, p. 6; confirm in Brandt translation.",
      relevance: "Shows early Netherlands resistance to papal claims centuries before Luther."
    },
    {
      title: "No Man Coerced to Believe",
      author: "Ancient believers (via Brandt)",
      publication: "History of the Reformation in and About the Low Countries, Book I, p. 14",
      quote: "The Bible is the only infallible authority in religion, and no man should be coerced to believe, but should be won by preaching.",
      quoteType: "paraphrase",
      sourceUrl: "https://scholar.google.com/scholar?q=Brandt+Low+Countries+coerced+to+believe",
      verifyNote: "Companion summary of twelfth-century Waldensian teaching White cites GC 239.1 via Brandt.",
      relevance: "Anticipates later Dutch commitment to Scripture and voluntary faith."
    },
    {
      title: "Family Worship Before the Inquisitors",
      author: "Young son (via Wylie)",
      publication: "The History of Protestantism, Book XVIII, ch. 6",
      quote: "We fall on our knees, and pray that God may enlighten our minds and pardon our sins; we pray for our sovereign, that his reign may be prosperous and his life happy; we pray for our magistrates, that God may preserve them.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/white/controversy/controversy.viii.html",
      verifyNote: "White GC 240.2; Wylie Book XVIII, ch. 6.",
      relevance: "Illustrates domestic piety criminalized under Spanish rule."
    },
    {
      title: "Wives at the Stake",
      author: "J. A. Wylie",
      publication: "The History of Protestantism, Book XVIII, ch. 6",
      quote: "Wives would take their stand by their husband's stake, and while he was enduring the fire they would whisper words of solace, or sing psalms to cheer him.",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/white/controversy/controversy.viii.html",
      verifyNote: "White GC 240.3; confirm Wylie Book XVIII, ch. 6.",
      relevance: "Shows domestic courage of Dutch martyrs."
    },
    {
      title: "The Blood of Christians Is Seed",
      author: "Tertullian",
      publication: "Apology, ch. 50 (Ante-Nicene Fathers)",
      quote: "The blood of Christians is seed.",
      quoteType: "paraphrase",
      sourceUrl: "https://www.ccel.org/ccel/tertullian/apology/anf03.v.iii.iii.l.html",
      verifyNote: "Classic Tertullian maxim White cites GC 240.3; confirm exact wording in Apology ch. 50.",
      relevance: "Explains why persecution expanded rather than ended Dutch Protestantism."
    },
    {
      title: "Who Shall Enact Dogmas?",
      author: "Olaf Petri (via Wylie)",
      publication: "The History of Protestantism, Book X, ch. 4",
      quote: "How, then, shall others presume to enact dogmas at their pleasure, and impose them as things necessary to salvation?",
      quoteType: "paraphrase",
      sourceUrl: "https://ccel.org/ccel/white/controversy/controversy.viii.html",
      verifyNote: "White GC 243.2; Wylie Book X, ch. 4 on Swedish disputation.",
      relevance: "States Protestant rejection of human decrees beyond Scripture."
    },
    {
      title: "My Doctrine Is Not Mine",
      author: "Jesus (John)",
      publication: "King James Version, John 7:16",
      quote: "My doctrine is not mine, but his that sent me.",
      quoteType: "verbatim",
      sourceUrl: "https://www.biblegateway.com/passage/?search=John+7%3A16&version=KJV",
      verifyNote: "Olaf Petri cited this GC 243.2; KJV wording.",
      relevance: "Biblical anchor for Swedish defense of sola Scriptura."
    },
    {
      title: "Tausen Forbidden Wittenberg",
      author: "Monastic superiors (narrative via White)",
      publication: "The Great Controversy, ch. 13 (1911), pp. 241–242",
      quote: "The scholar of the church was not to be endangered by the poison of heresy. So said the friars — yet Tausen chose Wittenberg and returned to preach Christ in Denmark.",
      quoteType: "summary",
      sourceUrl: "https://archive.org/details/sda-ellen-g-white-the-great-controversy-1911",
      verifyNote: "Companion summary of GC 241–242 narrative on Tausen — not a quotation from a primary chronicle.",
      relevance: "Shows how Scandinavian reform depended on Wittenberg's Scripture teaching."
    }
  ],
  egwQuotes: [
    {
      quote: "In The Netherlands the papal tyranny very early called forth resolute protest. Seven hundred years before Luther's time the Roman pontiff was thus fearlessly impeached by two bishops, who, having been sent on an embassy to Rome, had learned the true character of the \"holy see.\"",
      reference: "The Great Controversy, p. 237.1",
      sourceUrl: "https://m.egwwritings.org/en/book/132/13"
    },
    {
      quote: "To read the Bible, to hear or preach it, or even to speak concerning it, was to incur the penalty of death by the stake. To pray to God in secret, to refrain from bowing to an image, or to sing a psalm, was also punishable with death.",
      reference: "The Great Controversy, p. 240.1",
      sourceUrl: "https://m.egwwritings.org/en/book/132/13"
    },
    {
      quote: "In the presence of the monarch and the leading men of Sweden, Olaf Petri with great ability defended the doctrines of the reformed faith against the Romish champions. He declared that the teachings of the Fathers are to be received only when in accordance with the Scriptures.",
      reference: "The Great Controversy, p. 243.1",
      sourceUrl: "https://m.egwwritings.org/en/book/132/13"
    }
  ],
  scholarlyReferences: [
    {
      author: "Alastair Duke",
      year: 1990,
      title: "Reformation and Revolt in the Low Countries",
      source: "Hambledon Press",
      relevance: "Academic history of Dutch Reformation and revolt complementing White's providential narrative.",
      directQuote: "Duke analyzes how reformed teaching spread among artisans and nobles before open revolt under William of Orange.",
      quoteType: "summary",
      sourceUrl: "https://scholar.google.com/scholar?q=Alastair+Duke+Reformation+Revolt+Low+Countries",
      verifyNote: "Companion summary — not a quotation from Duke's text."
    },
    {
      author: "Craig Stephenson",
      year: 1986,
      title: "The Reformation in Sweden: From Catholic to Protestant, 1520–1550",
      source: "Related Scandinavian Reformation studies",
      relevance: "Context for Olaf and Laurentius Petri's disputation and Bible translation White summarizes.",
      directQuote: "Stephenson treats the Petri brothers as trained humanists and theologians who linked Swedish reform to Wittenberg exegesis.",
      quoteType: "summary",
      sourceUrl: "https://scholar.google.com/scholar?q=Swedish+Reformation+Olaf+Petri+Laurentius",
      verifyNote: "Companion summary — verify exact monograph title before verbatim citation."
    }
  ],
  discussionQuestions: [
    "How does Menno Simons's story differ from Munsterite fanaticism, and why does White emphasize the distinction?",
    "What does Tertullian's 'blood is seed' mean in the Dutch and Scandinavian contexts?",
    "Why does White highlight obscure Swedish disputants alongside famous Reformers?",
    "How did vernacular Bible translation function in both Netherlands and Scandinavia?"
  ],
  quiz: gc13Quiz,
  egwLink: "https://m.egwwritings.org/en/book/132/13",
  theme: "Scripture Under Persecution",
  themes: ["Netherlands", "Menno Simons", "William of Orange", "Denmark", "Sweden", "Vernacular Bible"],
  readingTime: "8 min"
};
