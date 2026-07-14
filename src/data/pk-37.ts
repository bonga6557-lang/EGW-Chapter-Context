import { createAuthoredPkChapter } from './pk-chapter-builder';
import { babylonianChronicleSource, brueggemannReference, josephusBook10Source } from './pk-research-sources';

export const pk37Chapter = createAuthoredPkChapter({
  number: 37,
  title: 'Carried Captive Into Babylon',
  bigIdea: 'Jerusalem falls after sustained refusal of warning, yet even within destruction God preserves witness, offers pardon to the remnant, and begins teaching in exile what prosperity had failed to teach.',
  historicalContext: "The final siege ended with breached walls, Zedekiah's capture, the burning of temple and city, and deportation. Jeremiah survived, chose solidarity with the poor left under Gedaliah, and continued warning the remnant not to flee to Egypt. ABC 5 independently confirms the earlier 597 BCE capture but its surviving tablet ends before the final destruction; Josephus supplies a later Jewish retelling of Zedekiah, Gedaliah, the flight to Egypt, and further Babylonian action.",
  bibleFoundation: [
    '2 Kings 25:1-21 - Jerusalem is breached, Zedekiah captured, the temple burned, and captives deported.',
    'Jeremiah 38:14-23 - The king receives a final private appeal to surrender and save the city from fire.',
    'Jeremiah 40-43 - Jeremiah remains with Gedaliah and warns the surviving community not to flee to Egypt.',
    '2 Chronicles 36:15-21 - Rejected messengers culminate in destruction and exile until the land enjoys its sabbaths.',
  ],
  argumentFlow: [
    { title: 'The Siege Closes', description: 'Famine and military pressure expose how little room remains after years of rejected mercy.' },
    { title: 'A Final Private Appeal', description: 'Jeremiah still offers Zedekiah a path that would preserve life and spare the city from burning.' },
    { title: 'The King Falls With the City', description: 'Flight ends in capture; Zedekiah sees his sons killed, loses his sight, and is taken to Babylon.' },
    { title: 'Temple and Palace Burn', description: 'The sacred and royal symbols people trusted are not exempt from the harvest of covenant rebellion.' },
    { title: 'The Remnant Chooses Egypt', description: 'Even after catastrophe, fear again overrides explicit counsel, showing that suffering alone does not create repentance.' },
  ],
  hardPhrases: [
    { phrase: 'The city was broken up', explanation: 'The breach of Jerusalem\'s defenses after the prolonged Babylonian siege.' },
    { phrase: 'Poor of the land', explanation: 'Those left in Judah as agricultural workers after leaders, soldiers, artisans, and others were deported.' },
    { phrase: 'Carried captive', explanation: 'Forced displacement into Babylonian territory, both imperial policy and the covenant consequence interpreted by the prophets.' },
  ],
  commonMisunderstanding: "The chapter does not teach that catastrophe automatically reforms people. The remnant's flight to Egypt repeats the old pattern: they request God's word, promise obedience, and then reject the answer when it contradicts fear.",
  modernApplication: 'Receive correction before choices collapse into consequences. After failure, do not let panic make the next decision; repentance still requires listening when the safest-looking option conflicts with clear duty.',
  historicalSources: [
    babylonianChronicleSource({ summary: 'The surviving Jerusalem Chronicle confirms Nebuchadnezzar\'s earlier 597 BCE capture and deportation but does not preserve the later 586/587 destruction in its extant text.', relevance: 'Its silence about the final fall is a documented source limit, while its earlier entry independently confirms the Babylonian campaign pattern.' }),
    josephusBook10Source({ summary: 'Josephus retells Zedekiah\'s capture, the appointment and murder of Gedaliah, and the remnant\'s flight into Egypt.', relevance: 'The later Jewish account preserves the same sequence of royal collapse, fragile remnant government, and continued displacement.' }),
  ],
  egwQuotes: [
    { quote: 'Once more the king sent privately for Jeremiah, and bade him faithfully relate the purpose of God toward Jerusalem.', reference: 'Prophets and Kings, p. 456', sourceUrl: 'https://m.egwwritings.org/en/book/88.2014' },
    { quote: 'The beautiful temple that for more than four centuries had crowned the summit of Mount Zion was not spared by the Chaldeans.', reference: 'Prophets and Kings, p. 460', sourceUrl: 'https://m.egwwritings.org/en/book/88.2014' },
    { quote: 'The prophecies of doom pronounced by Jeremiah upon the remnant that had rebelled against Nebuchadnezzar by fleeing to Egypt were mingled with promises of pardon to those who should repent of their folly and stand ready to return.', reference: 'Prophets and Kings, p. 461', sourceUrl: 'https://m.egwwritings.org/en/book/88.2014' },
  ],
  scholarlyReferences: [
    brueggemannReference({ summary: "Brueggemann's exile-and-homecoming framework treats Jerusalem's loss as both historical trauma and a theological crisis in which judgment, grief, and future possibility must be held together.", relevance: "The framework guards against ending the chapter either in triumphalism or in despair." }),
  ],
  discussionQuestions: [
    'What opportunities for mercy remained even during Jerusalem\'s final collapse?',
    'Why did the temple\'s destruction carry theological as well as national shock?',
    'What does the remnant\'s flight teach about the limits of suffering as a moral teacher?',
    'How can a community preserve hope without minimizing the consequences of its choices?',
  ],
  quizPrompts: [
    { question: 'What final course did Jeremiah offer Zedekiah?', correct: 'Surrender to Babylon so his life and the city could be spared.', explanation: 'Mercy remained available even late in the siege.', distractors: ['Flee secretly to Egypt.', 'Burn the temple before Babylon arrived.', 'Execute every Babylonian envoy.'] },
    { question: 'What happened when Zedekiah attempted to flee?', correct: 'He was captured, saw his sons killed, was blinded, and taken to Babylon.', explanation: 'The outcome joined Jeremiah\'s and Ezekiel\'s predictions.', distractors: ['He reached Egypt safely.', 'He defeated Nebuchadnezzar.', 'He became governor under Gedaliah.'] },
    { question: 'What happened to Solomon\'s temple?', correct: 'The Chaldeans burned it along with major buildings in Jerusalem.', explanation: 'Sacred architecture did not shield persistent covenant rebellion.', distractors: ['It was moved intact to Babylon.', 'It became a Persian palace.', 'It was hidden by Jeremiah.'] },
    { question: 'Whom did Babylon appoint over those left in Judah?', correct: 'Gedaliah', explanation: 'Gedaliah governed the poor remnant until he was assassinated.', distractors: ['Baruch', 'Hananiah', 'Cyrus'] },
    { question: 'What counsel did Jeremiah give after Gedaliah\'s death?', correct: 'Remain in Judah rather than flee to Egypt.', explanation: 'The remnant again faced a choice between fear and the prophetic word.', distractors: ['Return immediately to Babylon.', 'Crown Jeremiah as king.', 'Join the Philistine cities.'] },
    { question: 'What did the remnant do with that counsel?', correct: 'They rejected it and went to Egypt.', explanation: 'Catastrophe had not automatically produced obedient trust.', distractors: ['They obeyed and rebuilt the temple.', 'They surrendered to Assyria.', 'They appointed Daniel governor.'] },
  ],
  egwLink: 'https://m.egwwritings.org/en/book/88.2014',
  theme: 'Exile & Consequence',
  themes: ['Jerusalem', 'Captivity', 'Temple', 'Remnant', 'Jeremiah'],
  readingTime: '12 min',
});
