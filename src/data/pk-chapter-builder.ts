import { ChapterContextType, QuizQuestion } from '../types';

export type PkQuizPrompt = {
  question: string;
  correct: string;
  explanation: string;
  distractors: [string, string, string];
};

export type AuthoredPkChapterInput = Omit<ChapterContextType, 'id' | 'title' | 'quiz'> & {
  number: number;
  title: string;
  quizPrompts: [PkQuizPrompt, PkQuizPrompt, PkQuizPrompt, PkQuizPrompt, PkQuizPrompt, PkQuizPrompt];
};

export function createAuthoredPkChapter(input: AuthoredPkChapterInput): ChapterContextType {
  const { number, title, quizPrompts, ...chapter } = input;
  const quiz: QuizQuestion[] = quizPrompts.map((prompt, index) => ({
    id: `pk-${number}-q${index + 1}`,
    question: prompt.question,
    options: [
      { id: 'a', text: prompt.correct, isCorrect: true, explanation: prompt.explanation },
      { id: 'b', text: prompt.distractors[0], isCorrect: false, explanation: prompt.explanation },
      { id: 'c', text: prompt.distractors[1], isCorrect: false, explanation: prompt.explanation },
      { id: 'd', text: prompt.distractors[2], isCorrect: false, explanation: prompt.explanation },
    ],
  }));

  return {
    id: `pk-${number}`,
    title: `Chapter ${number}: ${title}`,
    ...chapter,
    quiz,
  };
}
