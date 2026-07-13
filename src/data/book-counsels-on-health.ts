import { ChapterContextType, BookType } from '../types';
import { ch1Quiz } from './otherQuizzes';

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


export const book: BookType = {
  id: 'counsels-on-health',
  totalChapters: 8,
  title: 'Counsels on Health',
  author: 'Ellen G. White',
  description: 'A comprehensive manual details the moral, spiritual, and medical principles of healthy living as a divine calling.',
  coverColor: 'bg-teal-950',
  chapters: counselsOnHealthData,
};
