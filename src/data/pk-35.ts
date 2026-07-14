import { createAuthoredPkChapter } from './pk-chapter-builder';
import { babylonianChronicleSource, brueggemannReference } from './pk-research-sources';

export const pk35Chapter = createAuthoredPkChapter({
  number: 35,
  title: 'Approaching Doom',
  bigIdea: "Destroying a written warning cannot destroy the word behind it; rejected truth returns as a stronger witness while political rebellion narrows the path to disaster.",
  historicalContext: "Jehoiakim ruled as Babylon replaced Egypt as the decisive regional power. Jeremiah announced Babylonian domination, dictated his messages to Baruch, and sent the scroll into public hearing because he himself was restricted. Jehoiakim cut and burned the roll, but Jeremiah dictated it again with additional words. ABC 5 independently records Nebuchadnezzar's campaigns after Carchemish and the capture of Jerusalem in 597 BCE, while also exposing a regnal-year discrepancy between the Babylonian record and 2 Kings 24:12.",
  bibleFoundation: [
    'Jeremiah 25:1-12 - Jeremiah identifies Babylon as the coming instrument of judgment after years of ignored warning.',
    'Jeremiah 36:1-32 - Baruch reads the scroll, Jehoiakim burns it, and the message is rewritten with additions.',
    '2 Kings 24:1-16 - Jehoiakim rebels and Jehoiachin is carried to Babylon with leaders and craftsmen.',
    'Daniel 1:1-7 - Daniel and companions enter Babylonian court service during the crisis.',
  ],
  argumentFlow: [
    { title: 'Empire Shifts East', description: 'The defeat of Egyptian power and Babylon\'s rise make Jeremiah\'s warnings politically concrete.' },
    { title: 'Twenty-Three Years of Appeal', description: 'Judgment is not sudden caprice; the prophet reviews a long record of early, repeated, and despised messages.' },
    { title: 'The Scroll Goes Public', description: 'Baruch carries the written word into spaces Jeremiah cannot enter, multiplying rather than silencing the witness.' },
    { title: 'The King Cuts the Warning', description: 'Jehoiakim treats the scroll as a disposable object, confusing destruction of the medium with defeat of the message.' },
    { title: 'The Word Returns Enlarged', description: 'The rewritten roll demonstrates that resistance adds testimony against the rejecter without reducing divine authority.' },
  ],
  hardPhrases: [
    { phrase: 'The fourth year of Jehoiakim', explanation: 'A chronological hinge associated with Nebuchadnezzar\'s accession and the post-Carchemish shift of regional power.' },
    { phrase: 'The roll of a book', explanation: 'A scroll on which Baruch recorded Jeremiah\'s dictated messages for public reading and preservation.' },
    { phrase: 'Added besides ... many like words', explanation: 'The second scroll did not merely replace the first; rejection resulted in an expanded prophetic record.' },
  ],
  commonMisunderstanding: "The scroll episode is not mainly a lesson about protecting physical books. Its force lies in the king's attempt to neutralize moral accountability by destroying the form in which warning reached him.",
  modernApplication: 'When a message exposes wrongdoing, examine the truth before attacking its messenger, format, or tone. Suppression may remove immediate discomfort while hardening the very course the warning was meant to interrupt.',
  historicalSources: [
    babylonianChronicleSource({
      summary: "ABC 5 records Nebuchadnezzar's victory over Egypt at Carchemish, his western campaigns, and the capture of Jerusalem in his seventh regnal year, February/March 597 BCE.",
      relevance: "This Babylonian record independently anchors the imperial transition and first major deportation behind Jeremiah's warnings, while differing from 2 Kings on the regnal-year count.",
    }),
  ],
  egwQuotes: [
    { quote: 'Jehoiakim, Jehoiachin, Zedekiah—all these Jewish kings were in turn to become vassals of the Babylonian ruler, and all in turn were to rebel.', reference: 'Prophets and Kings, p. 423', sourceUrl: 'https://m.egwwritings.org/en/book/88.1886' },
    { quote: "Such were the wonderful prophecies uttered by Jeremiah during the closing years of the history of the kingdom of Judah, when the Babylonians were coming unto universal rule, and were even then bringing their besieging armies against the walls of Zion.", reference: 'Prophets and Kings, p. 427', sourceUrl: 'https://m.egwwritings.org/en/book/88.1886' },
    { quote: "Jeremiah's words of warning and entreaty reached every part of the kingdom, and all had opportunity to know the will of God concerning the nation.", reference: 'Prophets and Kings, p. 429', sourceUrl: 'https://m.egwwritings.org/en/book/88.1886' },
  ],
  scholarlyReferences: [
    brueggemannReference({
      summary: "Brueggemann treats Jeremiah's historical setting and theological message as a sustained confrontation with Judah's social and religious collapse, not as isolated predictions detached from public life.",
      relevance: "The frame helps connect the scroll episode, royal policy, justice, and covenant accountability.",
    }),
  ],
  discussionQuestions: [
    'Why is burning the scroll a revealing political and spiritual act?',
    'What modern strategies resemble attacking a warning\'s medium instead of answering its substance?',
    'How does the long history of appeals change the way divine judgment is understood?',
    'What should faithful communicators learn from Jeremiah and Baruch about preserving a message under pressure?',
  ],
  quizPrompts: [
    { question: 'What regional change sharpened Jeremiah\'s warning?', correct: 'Babylon defeated Egyptian power and became the dominant empire.', explanation: 'The shift after Carchemish made the coming Babylonian domination immediate.', distractors: ['Persia fell to Greece.', 'Assyria conquered Babylon.', 'Judah annexed Egypt.'] },
    { question: 'Who wrote Jeremiah\'s dictated messages on the scroll?', correct: 'Baruch son of Neriah', explanation: 'Baruch served as scribe and public reader while Jeremiah was restricted.', distractors: ['Hilkiah', 'Daniel', 'Shaphan'] },
    { question: 'How did Jehoiakim respond as the scroll was read?', correct: 'He cut its columns and burned them in the fire.', explanation: 'The act dramatized his refusal to humble himself before the warning.', distractors: ['He tore his clothes in repentance.', 'He sent it to Huldah.', 'He copied it for every city.'] },
    { question: 'What happened after the first scroll was destroyed?', correct: 'Jeremiah dictated it again, and many additional words were included.', explanation: 'Destroying the scroll did not silence the prophetic word.', distractors: ['The message was permanently lost.', 'Jeremiah withdrew every warning.', 'Babylon abandoned its campaign.'] },
    { question: 'What does ABC 5 independently record?', correct: "Nebuchadnezzar's western campaigns and Jerusalem's capture in 597 BCE", explanation: 'The Babylonian chronicle anchors the geopolitical setting outside the biblical text.', distractors: ['The rebuilding of Nehemiah\'s wall', 'The decree against Daniel\'s prayer', 'The reign of Queen Esther'] },
    { question: 'What discrepancy does the chronicle highlight?', correct: 'It dates the capture to Nebuchadnezzar\'s seventh year, while 2 Kings uses the eighth.', explanation: 'Responsible research reports the regnal-year conflict rather than silently harmonizing it.', distractors: ['It denies that Babylon existed.', 'It places Cyrus before Josiah.', 'It identifies Jeremiah as king.'] },
  ],
  egwLink: 'https://m.egwwritings.org/en/book/88.1886',
  theme: 'Warnings Rejected',
  themes: ['Jehoiakim', 'Jeremiah', 'Baruch', 'Scroll', 'Babylon'],
  readingTime: '12 min',
});
