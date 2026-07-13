import type { QuizQuestion } from '../types';

/** Pure quiz scoring — used by QuizCard and tests. */
export function scoreQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string>
): number {
  return questions.filter((q) => {
    const pick = answers[q.id];
    return q.options.find((o) => o.id === pick)?.isCorrect;
  }).length;
}
