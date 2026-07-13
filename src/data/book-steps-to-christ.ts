import { BookType } from '../types';
import { stepsToChristData } from './stepsToChrist';

export const book: BookType = {
  id: 'steps-to-christ',
  totalChapters: 13,
  title: 'Steps to Christ',
  author: 'Ellen G. White',
  description: 'A devotional classic navigating the practical steps of building and maintaining a genuine relationship with Jesus Christ.',
  coverColor: 'bg-slate-800',
  chapters: stepsToChristData,
};

export { stepsToChristData };
