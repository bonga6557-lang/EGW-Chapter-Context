import { createAuthoredPkChapter } from './pk-chapter-builder';
import { brueggemannReference, josephusBook10Source } from './pk-research-sources';

export const pk38Chapter = createAuthoredPkChapter({
  number: 38,
  title: 'Light Through Darkness',
  bigIdea: 'God plants credible hope inside judgment by giving promises before the crisis, preserving them in Scripture, and calling His people to act as though restoration remains possible.',
  historicalContext: "As Jerusalem neared destruction, Jeremiah bought family land at Anathoth and sealed the deeds before witnesses. The purchase was economically irrational if Babylon's siege defined the future; as an enacted promise it declared that fields would again be possessed. White joins this sign with Jeremiah's restoration promises, Ezekiel's witness among the exiles, Daniel's study of the seventy years, and Isaiah's naming of Cyrus. Josephus later retells Jeremiah's promise of return under Persian and Median rule.",
  bibleFoundation: [
    'Jeremiah 32:6-15 - Jeremiah buys and seals the Anathoth field while Jerusalem is under siege.',
    'Jeremiah 29:10-14 - Exile is limited by a promise of return and renewed seeking.',
    'Jeremiah 31:31-34 - The new covenant promises internalized law and forgiven sin.',
    'Isaiah 44:28-45:4 - Cyrus is named as the ruler through whom rebuilding will advance.',
    'Daniel 9:1-3 - Daniel studies Jeremiah\'s years and turns the promise into confession and prayer.',
  ],
  argumentFlow: [
    { title: 'Hope Prepared Before Exile', description: 'Moses and the prophets had already set judgment within a larger covenant story of repentance and return.' },
    { title: 'A Field Bought Under Siege', description: 'Jeremiah invests in land he cannot presently enjoy, making restoration visible through a costly legal act.' },
    { title: 'The Deeds Are Preserved', description: 'Sealed and open copies hold the promise for a future beyond the immediate buyers and witnesses.' },
    { title: 'Prophets Speak Across Locations', description: 'Jeremiah in Jerusalem, Ezekiel by Chebar, and Daniel in Babylon provide complementary witness rather than isolated optimism.' },
    { title: 'Promise Produces Prayer', description: 'Daniel does not treat prophecy as permission for passivity; the promised timetable drives confession, study, and petition.' },
  ],
  hardPhrases: [
    { phrase: 'The right of redemption is thine', explanation: 'Family land law gave Jeremiah the duty and opportunity to purchase his relative\'s field.' },
    { phrase: 'Sealed ... and open', explanation: 'Two deed forms provided protected legal evidence and an accessible copy of the transaction.' },
    { phrase: 'A new covenant', explanation: 'Jeremiah\'s promise that God would write His law within, establish personal covenant knowledge, and forgive iniquity.' },
  ],
  commonMisunderstanding: 'Biblical hope here is not denial of siege, exile, or guilt. Jeremiah buys the field precisely while judgment is real; hope rests on God\'s declared future, not on optimistic reading of present conditions.',
  modernApplication: 'Build practices that preserve promise through dark periods: study before crisis, pray from the promises rather than merely about circumstances, and take proportionate actions that embody confidence in a faithful future.',
  historicalSources: [
    josephusBook10Source({ summary: 'Josephus reports that Jeremiah foretold both Babylonian captivity and later restoration under Persian and Median rule.', relevance: 'The first-century retelling demonstrates the durable reception of Jeremiah as a prophet of return as well as destruction.' }),
  ],
  egwQuotes: [
    { quote: "The dark years of destruction and death marking the end of the kingdom of Judah would have brought despair to the stoutest heart had it not been for the encouragements in the prophetic utterances of God's messengers.", reference: 'Prophets and Kings, p. 464', sourceUrl: 'https://m.egwwritings.org/en/book/88.2070' },
    { quote: "Laying fast hold on the promises of God, Jeremiah, by means of an acted parable, illustrated before the inhabitants of the fated city his strong faith in the ultimate fulfillment of God's purpose for His people.", reference: 'Prophets and Kings, p. 467', sourceUrl: 'https://m.egwwritings.org/en/book/88.2070' },
    { quote: 'Through the purchase of the Anathoth estate he would do what he could to inspire others with the hope that brought so much comfort to his own heart.', reference: 'Prophets and Kings, p. 467', sourceUrl: 'https://m.egwwritings.org/en/book/88.2070' },
  ],
  scholarlyReferences: [
    brueggemannReference({ summary: "Brueggemann frames Jeremiah around exile and homecoming, reading judgment and anguished loss together with the book's stubborn promises of restored covenant life.", relevance: "This supports the chapter's refusal to choose between honest darkness and grounded hope." }),
  ],
  discussionQuestions: [
    'Why is Jeremiah\'s land purchase more persuasive than a merely verbal statement of optimism?',
    'How do sealed deeds model the preservation of hope for people who may outlive the original witness?',
    'Why did Daniel respond to a promised timetable with more prayer rather than less?',
    'What would a responsible enacted hope look like in a present situation that remains genuinely difficult?',
  ],
  quizPrompts: [
    { question: 'What did Jeremiah purchase while Jerusalem was under siege?', correct: 'A family field at Anathoth', explanation: 'The purchase acted out confidence that land transactions would return.', distractors: ['A house in Babylon', 'The temple treasury', 'An Egyptian chariot'] },
    { question: 'Why were the deeds sealed and preserved?', correct: 'To maintain legal evidence for a future in which the land could again be possessed', explanation: 'The documentation carried hope beyond the immediate crisis.', distractors: ['To hide the transaction from God', 'To cancel the purchase', 'To finance Babylon\'s army'] },
    { question: 'What did the acted parable declare?', correct: 'Houses, fields, and vineyards would again be possessed in the land.', explanation: 'The sign set restoration inside the reality of judgment.', distractors: ['The siege would end that afternoon.', 'Jeremiah would become king.', 'No exile would occur.'] },
    { question: 'Which prophets carried complementary light during the crisis?', correct: 'Jeremiah, Ezekiel, and Daniel', explanation: 'Their different locations joined warning, preservation, and prayer.', distractors: ['Elijah, Elisha, and Jonah', 'Haggai, Malachi, and John', 'Samuel, Nathan, and Gad'] },
    { question: 'How did Daniel use Jeremiah\'s seventy-year promise?', correct: 'He studied it and turned to confession and prayer.', explanation: 'Promise generated active covenant response rather than passivity.', distractors: ['He ignored it as symbolic.', 'He used it to stop praying.', 'He hid it from the exiles.'] },
    { question: 'What is central to Jeremiah\'s new-covenant promise?', correct: 'God writes His law within and forgives iniquity.', explanation: 'Restoration reaches the heart and the broken relationship, not geography alone.', distractors: ['Israel receives a larger army.', 'The temple replaces obedience.', 'Foreign rule becomes permanent.'] },
  ],
  egwLink: 'https://m.egwwritings.org/en/book/88.2070',
  theme: 'Hope in Exile',
  themes: ['Jeremiah', 'Anathoth', 'New Covenant', 'Restoration', 'Promise'],
  readingTime: '12 min',
});
