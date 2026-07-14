import { createAuthoredPkChapter } from './pk-chapter-builder';
import { brightReference, josephusBook10Source } from './pk-research-sources';

export const pk33Chapter = createAuthoredPkChapter({
  number: 33,
  title: 'The Book of the Law',
  bigIdea: "Scripture becomes an agent of revival when it is recovered as God's judging and guiding word, heard with repentance, and embodied in covenant action.",
  historicalContext: "Temple repairs under Josiah brought the neglected book of the law to light. The discovery did not begin Josiah's reforming concern, but it gave that concern covenant definition: the king tore his clothes, consulted Huldah, gathered the nation, renewed the covenant, removed idolatrous practices, and celebrated Passover. Josephus independently preserves a later retelling of Josiah's reform and exceptional Passover, while modern histories place the episode within Judah's final decades between Assyrian decline and Babylonian expansion.",
  bibleFoundation: [
    '2 Kings 22:8-13 - Hilkiah finds the book of the law, Shaphan reads it, and Josiah responds with grief.',
    '2 Kings 23:1-3 - The king reads the covenant publicly and pledges obedience with the people.',
    '2 Chronicles 35:1-19 - Josiah leads a Passover ordered according to the written law.',
    'Deuteronomy 30:19-20 - Covenant hearing presses Israel to choose life through faithful love and obedience.',
  ],
  argumentFlow: [
    { title: 'A Lost Authority Recovered', description: 'The temple manuscript exposes how far public religion had drifted from the covenant it claimed to preserve.' },
    { title: 'The King Under the Word', description: 'Josiah does not use Scripture to confirm his program; he lets it judge him and tears his clothes in repentance.' },
    { title: 'Huldah Confirms Both Judgment and Mercy', description: 'The prophetess refuses false reassurance: national consequences remain, yet Josiah will be spared their final sight because his heart was tender.' },
    { title: 'Covenant Becomes Public', description: 'The law is read before leaders and people, turning private conviction into a shared pledge of reform.' },
    { title: 'Passover Embodies Memory', description: 'The renewed feast joins text, worship, history, and communal obedience rather than leaving reform at the level of promises.' },
  ],
  hardPhrases: [
    { phrase: 'The book of the law', explanation: 'The recovered covenant text associated especially with Mosaic instruction and the blessings and curses pressed upon Israel.' },
    { phrase: 'A tender heart', explanation: "Huldah's description of Josiah's teachable response: he trembles before the word instead of defending himself against it." },
    { phrase: 'Stood to the covenant', explanation: 'The public commitment to order national worship and conduct by the recovered divine instruction.' },
  ],
  commonMisunderstanding: "The chapter is not romantic archaeology in which finding an old object automatically produces revival. The decisive movement is from discovery to hearing, from hearing to repentance, and from repentance to sustained covenant practice.",
  modernApplication: "Treat Scripture as an authority capable of correcting inherited habits, not as a religious possession that merely validates them. Genuine renewal should become visible in worship, public commitments, and repaired practices.",
  historicalSources: [
    josephusBook10Source({
      summary: "Josephus's Antiquities Book X retells Josiah's reforms and describes his Passover as exceptional in its conformity to ancestral law.",
      relevance: "This first-century Jewish retelling shows how Josiah's law-centered reform and Passover were remembered beyond the biblical narrative itself.",
    }),
  ],
  egwQuotes: [
    { quote: "Thus Josiah, from his earliest manhood, had endeavored to take advantage of his position as king to exalt the principles of God's holy law.", reference: 'Prophets and Kings, p. 398', sourceUrl: 'https://m.egwwritings.org/en/book/88.1753' },
    { quote: 'Josiah now proposed that those highest in authority unite with the people in solemnly covenanting before God to co-operate with one another in an effort to institute decided changes.', reference: 'Prophets and Kings, p. 401', sourceUrl: 'https://m.egwwritings.org/en/book/88.1753' },
    { quote: 'The king sought further to establish the faith of Judah in the God of their fathers by holding a great Passover feast, in harmony with the provisions made in the book of the law.', reference: 'Prophets and Kings, p. 403', sourceUrl: 'https://m.egwwritings.org/en/book/88.1753' },
  ],
  scholarlyReferences: [
    brightReference({
      summary: "Bright's history places Josiah in the final period of Judah's monarchy, when Assyrian power was receding and new imperial pressures were forming around the small kingdom.",
      relevance: "The geopolitical setting clarifies why covenant reform and Josiah's later encounter with Egypt carried national as well as religious consequences.",
    }),
  ],
  discussionQuestions: [
    'What is the difference between possessing Scripture and standing under its authority?',
    "Why did Josiah seek Huldah's interpretation instead of assuming that sincere reform had canceled every consequence?",
    'Which communal practices would need to change if your stated beliefs were taken with covenant seriousness?',
    'How can public reform avoid becoming spectacle while still moving beyond private intention?',
  ],
  quizPrompts: [
    { question: 'What event brought the covenant crisis into sharp focus for Josiah?', correct: 'The book of the law was found during repairs to the temple.', explanation: 'The recovered manuscript exposed both divine requirements and Judah\'s accumulated disobedience.', distractors: ['A Babylonian army entered Jerusalem.', 'Jeremiah was imprisoned.', 'The ark was returned from exile.'] },
    { question: 'How did Josiah first respond when the law was read?', correct: 'He tore his clothes and humbled himself before God.', explanation: 'His tender response distinguishes repentance from mere antiquarian interest.', distractors: ['He hid the manuscript from the people.', 'He dismissed it as obsolete.', 'He immediately declared war on Egypt.'] },
    { question: 'Who delivered the prophetic interpretation of the discovery?', correct: 'Huldah the prophetess', explanation: 'Huldah confirmed coming judgment while recognizing Josiah\'s tender heart.', distractors: ['Daniel', 'Ezra', 'Esther'] },
    { question: 'What public action followed Josiah\'s private grief?', correct: 'He read the covenant before the people and led them to renew it.', explanation: 'The chapter moves from personal conviction to communal covenant action.', distractors: ['He abdicated the throne.', 'He closed the temple permanently.', 'He moved the capital to Samaria.'] },
    { question: 'Why does the Passover matter in the chapter\'s argument?', correct: 'It embodied renewed obedience and remembered redemption according to the written law.', explanation: 'The feast turned covenant memory into ordered communal worship.', distractors: ['It celebrated a military victory over Babylon.', 'It replaced the covenant reading.', 'It ended the need for reform.'] },
    { question: 'What limit remained even after Josiah\'s reform?', correct: 'His faithfulness did not erase every consequence of generations of rebellion.', explanation: 'Huldah holds mercy toward Josiah together with judgment on the nation.', distractors: ['God refused to hear Josiah at all.', 'The law was declared unreliable.', 'Judah became permanently immune to invasion.'] },
  ],
  egwLink: 'https://m.egwwritings.org/en/book/88.1753',
  theme: 'Scripture & Revival',
  themes: ['Josiah', 'Book of the Law', 'Covenant', 'Passover', 'Reform'],
  readingTime: '11 min',
});
