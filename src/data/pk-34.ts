import { createAuthoredPkChapter } from './pk-chapter-builder';
import { brueggemannReference, josephusBook10Source } from './pk-research-sources';

export const pk34Chapter = createAuthoredPkChapter({
  number: 34,
  title: 'Jeremiah',
  bigIdea: 'Prophetic faithfulness joins unflinching truth with grief-filled love, refusing both false security and loveless denunciation.',
  historicalContext: "Jeremiah's call began while he was young in Josiah's thirteenth year and extended through Judah's last kings. White follows the movement from his sense of inadequacy to the temple sermon, where he attacks confidence in sacred buildings without covenant obedience. Josephus remembers Jeremiah as a priestly prophet active from Josiah until Jerusalem's destruction; Brueggemann emphasizes the book's setting amid Judah's social and religious disintegration and its intertwined themes of anguish, obedience, justice, and hope.",
  bibleFoundation: [
    'Jeremiah 1:4-10 - God appoints Jeremiah before birth and places His words in the young prophet\'s mouth.',
    'Jeremiah 7:1-15 - The temple sermon rejects confidence in the sanctuary without amended conduct.',
    'Jeremiah 9:1 - The prophet longs for tears because of the slain and deceived people.',
    'Jeremiah 20:7-13 - Jeremiah names the pain of his vocation yet confesses the Lord as a mighty defender.',
  ],
  argumentFlow: [
    { title: 'Called While Young', description: 'Jeremiah answers his commission with inadequacy, but God grounds the call in divine knowledge and presence rather than natural confidence.' },
    { title: 'Words Placed in His Mouth', description: 'The prophet is not licensed to improvise; he is commissioned to uproot and destroy, but also to build and plant.' },
    { title: 'Repentance Must Reach Foundations', description: 'Jeremiah calls Judah to break up fallow ground rather than cover entrenched injustice with religious ceremony.' },
    { title: 'The Temple Is Not a Charm', description: 'Shiloh proves that a sacred location cannot protect a people who use worship to shield oppression and idolatry.' },
    { title: 'Courage With Tears', description: 'His severe warnings arise from identification with the people; prophetic truth and prophetic grief remain inseparable.' },
  ],
  hardPhrases: [
    { phrase: 'A defenced city, and an iron pillar', explanation: "Images of God-given resilience: Jeremiah will be attacked, but opposition will not nullify his commission." },
    { phrase: 'Break up your fallow ground', explanation: 'A farming metaphor for deep repentance that prepares the heart instead of scattering truth over hardened habits.' },
    { phrase: 'The temple of the Lord', explanation: 'A true confession turned into a false slogan when people treated the building as protection from the moral claims of its God.' },
  ],
  commonMisunderstanding: "Jeremiah's tears do not make him indecisive, and his warnings do not make him cruel. The chapter presents lament as evidence that judgment is announced by someone who loves the people he must confront.",
  modernApplication: 'Speak difficult truth only after allowing it to search your own life and awaken love for those affected. Religious institutions should be measured by justice, repentance, and faithfulness, not by their symbolic importance alone.',
  historicalSources: [
    josephusBook10Source({
      summary: "Josephus identifies Jeremiah as a priestly prophet who lived in Jerusalem from Josiah's thirteenth year until the city and temple were destroyed.",
      relevance: "The later Jewish history preserves the same long ministry horizon that makes Jeremiah a witness across Judah's final reigns.",
    }),
  ],
  egwQuotes: [
    { quote: 'In the youthful Jeremiah, God saw one who would be true to his trust and who would stand for the right against great opposition.', reference: 'Prophets and Kings, p. 407', sourceUrl: 'https://m.egwwritings.org/en/book/88.1818' },
    { quote: 'As a wise master builder, Jeremiah at the very beginning of his lifework sought to encourage the men of Judah to lay the foundations of their spiritual life broad and deep, by making thorough work of repentance.', reference: 'Prophets and Kings, p. 410', sourceUrl: 'https://m.egwwritings.org/en/book/88.1818' },
    { quote: 'In like manner, during the days of Jeremiah, the inhabitants of Judah were prone to believe that a strict observance of the divinely appointed services of the temple would preserve them from a just punishment for their wicked course.', reference: 'Prophets and Kings, p. 416', sourceUrl: 'https://m.egwwritings.org/en/book/88.1818' },
  ],
  scholarlyReferences: [
    brueggemannReference({
      summary: "Brueggemann reads Jeremiah's anguish over Judah's disintegration as reflecting divine yearning and treats the book as an invitation to faith, obedience, justice, and compassion.",
      relevance: "This supports reading Jeremiah's severity and lament together rather than separating social critique from covenant love.",
    }),
  ],
  discussionQuestions: [
    'Why is a sense of inadequacy compatible with a genuine call?',
    'Which modern religious slogans can function like Judah\'s repeated appeal to the temple?',
    'How does remembering Shiloh challenge confidence in institutions?',
    'What practices help truth-telling remain courageous without becoming contemptuous?',
  ],
  quizPrompts: [
    { question: 'When did Jeremiah receive his prophetic call?', correct: "While still young, in the thirteenth year of Josiah's reign", explanation: 'The call began early and extended across Judah\'s final decades.', distractors: ['After Jerusalem had already fallen', 'During the return under Cyrus', 'In the reign of Darius the Mede'] },
    { question: 'What answered Jeremiah\'s objection that he was only a child?', correct: 'God promised His presence and placed His words in Jeremiah\'s mouth.', explanation: 'The commission rests on divine presence rather than natural eloquence.', distractors: ['The priests elected him by majority vote.', 'He was excused from public speaking.', 'He received command of the army.'] },
    { question: 'What false security did the temple sermon confront?', correct: 'The belief that possessing the temple could protect persistent injustice and idolatry', explanation: 'Jeremiah rejects worship used as shelter from obedience.', distractors: ['The belief that prayer was permitted', 'The practice of reading Scripture', 'The rebuilding of Jerusalem\'s walls'] },
    { question: 'Why did Jeremiah refer to Shiloh?', correct: 'Its ruined sanctuary showed that sacred places do not override covenant rebellion.', explanation: 'Shiloh was historical evidence against magical confidence in the temple.', distractors: ['It was Jeremiah\'s birthplace.', 'It housed the Persian court.', 'It was where Cyrus issued his decree.'] },
    { question: 'What paired movements belong to Jeremiah\'s commission?', correct: 'Uprooting and tearing down, but also building and planting', explanation: 'Prophetic judgment clears ground for restoration rather than delighting in ruin.', distractors: ['Commerce and taxation', 'Conquest and colonization', 'Silence and withdrawal'] },
    { question: 'What gives Jeremiah\'s warnings their distinctive moral character?', correct: 'They are joined to grief and love for the people.', explanation: 'His tears reveal that faithful warning is not detached condemnation.', distractors: ['They guarantee his popularity.', 'They avoid naming sin.', 'They depend on royal approval.'] },
  ],
  egwLink: 'https://m.egwwritings.org/en/book/88.1818',
  theme: 'Faithful Warning',
  themes: ['Jeremiah', 'Prophetic Call', 'Temple Sermon', 'Repentance', 'Courage'],
  readingTime: '11 min',
});
