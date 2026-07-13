import { describe, expect, it } from 'vitest';
import { scoreQuiz } from '../src/utils/quizScore';
import type { QuizQuestion } from '../src/types';

const questions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'One?',
    options: [
      { id: 'a', text: 'A', isCorrect: true, explanation: '' },
      { id: 'b', text: 'B', isCorrect: false, explanation: '' },
    ],
  },
  {
    id: 'q2',
    question: 'Two?',
    options: [
      { id: 'a', text: 'A', isCorrect: false, explanation: '' },
      { id: 'b', text: 'B', isCorrect: true, explanation: '' },
    ],
  },
];

describe('scoreQuiz', () => {
  it('counts correct answers', () => {
    expect(scoreQuiz(questions, { q1: 'a', q2: 'b' })).toBe(2);
    expect(scoreQuiz(questions, { q1: 'b', q2: 'b' })).toBe(1);
    expect(scoreQuiz(questions, {})).toBe(0);
  });
});
