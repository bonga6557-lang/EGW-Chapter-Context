import { createAuthoredPkChapter } from './pk-chapter-builder';
import { babylonianChronicleSource, brueggemannReference, josephusBook10Source } from './pk-research-sources';

export const pk36Chapter = createAuthoredPkChapter({
  number: 36,
  title: 'The Last King of Judah',
  bigIdea: 'Moral weakness can destroy as surely as open defiance when a leader repeatedly knows the right course but lets fear, false counsel, and political calculation prevent obedience.',
  historicalContext: "Zedekiah received Judah's throne from Babylon and repeatedly sought Jeremiah while resisting his counsel to submit. Competing prophets promised a quick reversal of captivity; Jeremiah's yoke sign and confrontation with Hananiah insisted that Babylonian rule would continue for the appointed period. Josephus preserves the later tradition that Zedekiah discounted Jeremiah and Ezekiel because their predictions appeared to conflict, while ABC 5 anchors the earlier 597 BCE capture that placed him on the throne.",
  bibleFoundation: [
    'Jeremiah 27-28 - Jeremiah wears a yoke, counsels submission, and confronts Hananiah\'s false two-year promise.',
    'Jeremiah 37-38 - Zedekiah consults Jeremiah secretly but yields to fearful and divided officials.',
    'Ezekiel 17:11-21 - Zedekiah\'s oath-breaking alliance with Egypt is interpreted as covenant treachery.',
    '2 Chronicles 36:11-16 - The king hardens himself against the prophetic word as Judah rejects repeated messengers.',
  ],
  argumentFlow: [
    { title: 'A Vassal With a Witness', description: 'Zedekiah begins with Babylonian trust and Jeremiah as counselor, leaving a genuine path of restrained obedience open.' },
    { title: 'The Yoke as Public Theology', description: 'Jeremiah makes submission visible, declaring that temporary political humiliation is now the faithful course.' },
    { title: 'Hananiah Offers the Easier Future', description: 'The false prophet breaks the wooden yoke and promises rapid restoration, confusing hope with denial.' },
    { title: 'An Oath Is Broken', description: 'Zedekiah seeks Egyptian support despite his sworn loyalty, turning political rebellion into moral and covenant failure.' },
    { title: 'Private Conviction, Public Paralysis', description: 'He keeps asking Jeremiah for truth but fears princes and people more than the God whose word he requests.' },
  ],
  hardPhrases: [
    { phrase: 'Put a yoke upon thy neck', explanation: 'Jeremiah\'s acted sign that Judah and neighboring nations were to accept Babylonian domination for a defined period.' },
    { phrase: 'Yokes of iron', explanation: 'The intensified consequence announced after Hananiah broke the wooden yoke and contradicted the warning.' },
    { phrase: 'Despised the oath', explanation: 'Ezekiel\'s moral interpretation of Zedekiah\'s treaty-breaking; political convenience did not erase sworn accountability.' },
  ],
  commonMisunderstanding: "Zedekiah is not portrayed as innocent because stronger personalities pressured him. His repeated access to clear counsel makes fear-driven indecision a form of accountable disobedience.",
  modernApplication: 'Do not confuse privately admiring truth with obeying it. Leaders must decide which commitments remain binding when advisers, crowds, and immediate risks all press in another direction.',
  historicalSources: [
    babylonianChronicleSource({ summary: "ABC 5 records Jerusalem's 597 BCE capture and the installation of a king chosen by Nebuchadnezzar.", relevance: "The terse Babylonian notice provides the imperial background for Zedekiah's vassal status and later rebellion." }),
    josephusBook10Source({ summary: "Josephus retells Zedekiah's rejection of Jeremiah and Ezekiel and notes that their predictions appeared contradictory to the king even though the later outcome reconciled them.", relevance: "The retelling illuminates how apparent tension in prophetic wording could be exploited as an excuse for unbelief." }),
  ],
  egwQuotes: [
    { quote: 'From the first, Jeremiah had followed a consistent course in counseling submission to the Babylonians.', reference: 'Prophets and Kings, p. 443', sourceUrl: 'https://m.egwwritings.org/en/book/88.1962' },
    { quote: 'Jeremiah, in the presence of the priests and people, earnestly entreated them to submit to the king of Babylon for the time the Lord had specified.', reference: 'Prophets and Kings, p. 445', sourceUrl: 'https://m.egwwritings.org/en/book/88.1962' },
    { quote: 'While Jeremiah continued to bear his testimony in the land of Judah, the prophet Ezekiel was raised up from among the captives in Babylon, to warn and to comfort the exiles, and also to confirm the word of the Lord that was being spoken through Jeremiah.', reference: 'Prophets and Kings, p. 448', sourceUrl: 'https://m.egwwritings.org/en/book/88.1962' },
  ],
  scholarlyReferences: [
    brueggemannReference({ summary: "Brueggemann's commentary reads Jeremiah within the collision of imperial crisis, covenant disobedience, grief, and the urgent demand for faithful action.", relevance: "That frame helps interpret submission to Babylon not as political cowardice but as the specific obedience Jeremiah demanded in this crisis." }),
  ],
  discussionQuestions: [
    'Why can weak indecision be as destructive as aggressive rebellion?',
    'How should believers test hopeful messages that contradict unwelcome but well-grounded warnings?',
    'What does Zedekiah teach about repeatedly requesting advice without intending to follow it?',
    'When does a political promise become a spiritual and moral obligation?',
  ],
  quizPrompts: [
    { question: 'What course did Jeremiah consistently counsel?', correct: 'Submit to Babylon for the period God had specified.', explanation: 'In this crisis, submission rather than revolt was the commanded path.', distractors: ['Seek immediate alliance with Egypt.', 'Abandon Jerusalem for Nineveh.', 'Crown Hananiah as king.'] },
    { question: 'What did Hananiah do to Jeremiah\'s wooden yoke?', correct: 'He broke it and promised Babylon\'s yoke would end within two years.', explanation: 'The dramatic counter-sign offered false reassurance.', distractors: ['He carried it to Babylon.', 'He placed it on Zedekiah.', 'He preserved it in the temple.'] },
    { question: 'What followed the broken wooden yoke?', correct: 'Jeremiah announced an iron yoke and Hananiah\'s death.', explanation: 'The rejected warning returned in a more severe form.', distractors: ['Immediate national independence', 'The coronation of Jehoiachin', 'The restoration of the ark'] },
    { question: 'Why was Zedekiah\'s Egyptian alliance more than strategy?', correct: 'It violated the oath he had sworn to Babylon in God\'s name.', explanation: 'Ezekiel treats the broken treaty as covenant treachery.', distractors: ['Egypt had no army.', 'Jeremiah was Egyptian.', 'The law forbade all diplomacy.'] },
    { question: 'What repeatedly prevented Zedekiah from acting on Jeremiah\'s counsel?', correct: 'Fear of officials, opponents, and public consequences', explanation: 'He sought truth privately but would not sustain it publicly.', distractors: ['He never heard the counsel.', 'He could not understand Jeremiah\'s language.', 'He had already left the country.'] },
    { question: 'How did Josephus explain one excuse for Zedekiah\'s unbelief?', correct: 'Jeremiah and Ezekiel seemed to predict incompatible details about his fate.', explanation: 'The outcome later joined the details: he went to Babylon but did not see it.', distractors: ['The prophets denied Babylon existed.', 'They both promised instant victory.', 'They refused to speak to the king.'] },
  ],
  egwLink: 'https://m.egwwritings.org/en/book/88.1962',
  theme: 'Weakness Under Pressure',
  themes: ['Zedekiah', 'Jeremiah', 'Hananiah', 'Oath', 'Fear'],
  readingTime: '12 min',
});
