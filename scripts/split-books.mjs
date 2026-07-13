import fs from 'fs';

const src = fs.readFileSync('src/data.ts', 'utf8');
const lines = src.split(/\r?\n/);

function slice(startLine, endLineExclusive) {
  return lines.slice(startLine - 1, endLineExclusive - 1).join('\n');
}

const gcImports = `import { ChapterContextType, BookType } from '../types';
import { gc1Quiz } from './otherQuizzes';
import { gc2Chapter } from './gc-2';
import { gc3Chapter } from './gc-3';
import { gc4Chapter } from './gc-4';
import { gc5Chapter } from './gc-5';
import { gc6Chapter } from './gc-6';
import { gc7Chapter } from './gc-7';
import { gc8Chapter } from './gc-8';
import { gc9Chapter } from './gc-9';
import { gc10Chapter } from './gc-10';
import { gc11Chapter } from './gc-11';
import { gc12Chapter } from './gc-12';
import { gc13Chapter } from './gc-13';
import { gc14Chapter } from './gc-14';
import { gc15Chapter } from './gc-15';
import { gc16Chapter } from './gc-16';
import { gc17Chapter } from './gc-17';
import { gc18Chapter } from './gc-18';
import { gc19Chapter } from './gc-19';
import { gc20Chapter } from './gc-20';
import { gc21Chapter } from './gc-21';
import { gc22Chapter } from './gc-22';
import { gc23Chapter } from './gc-23';
import { gc24Chapter } from './gc-24';
import { gc25Chapter } from './gc-25';
import { gc26Chapter } from './gc-26';
import { gc27Chapter } from './gc-27';
import { gc28Chapter } from './gc-28';
import { gc29Chapter } from './gc-29';
import { gc30Chapter } from './gc-30';
import { gc31Chapter } from './gc-31';
import { gc32Chapter } from './gc-32';
import { gc33Chapter } from './gc-33';
import { gc34Chapter } from './gc-34';
import { gc35Chapter } from './gc-35';
import { gc36Chapter } from './gc-36';
import { gc37Chapter } from './gc-37';
import { gc38Chapter } from './gc-38';
import { gc39Chapter } from './gc-39';
import { gc40Chapter } from './gc-40';
import { gc41Chapter } from './gc-41';
import { gc42Chapter } from './gc-42';
`;

const gcData = slice(118, 358);
fs.writeFileSync(
  'src/data/book-great-controversy.ts',
  gcImports +
    '\n' +
    gcData +
    `

export const book: BookType = {
  id: 'great-controversy',
  totalChapters: 42,
  title: 'The Great Controversy',
  author: 'Ellen G. White',
  description: 'A sweeping historical and prophetic outline of the battle between truth and error from the fall of Jerusalem to the future.',
  coverColor: 'bg-red-950',
  chapters: greatControversyData,
};
`
);

const da = slice(48, 118);
fs.writeFileSync(
  'src/data/book-desire-of-ages.ts',
  `import { ChapterContextType, BookType } from '../types';
import { da1Quiz } from './otherQuizzes';

${da}

export const book: BookType = {
  id: 'desire-of-ages',
  totalChapters: 87,
  title: 'The Desire of Ages',
  author: 'Ellen G. White',
  description: 'An incredibly deep, gorgeous account focusing on the personal ministry, teachings, and transformative love of Jesus Christ.',
  coverColor: 'bg-emerald-900',
  chapters: desireOfAgesData,
};
`
);

const pk = slice(359, 417);
fs.writeFileSync(
  'src/data/book-prophets-and-kings.ts',
  `import { ChapterContextType, BookType } from '../types';
import { pk1Quiz } from './otherQuizzes';

${pk}

export const book: BookType = {
  id: 'prophets-and-kings',
  totalChapters: 60,
  title: 'Prophets and Kings',
  author: 'Ellen G. White',
  description: 'An inspiring history tracing the spiritual stories of the monarchs, prophets, and judges of the Old Testament.',
  coverColor: 'bg-blue-950',
  chapters: prophetsAndKingsData,
};
`
);

const pp = slice(417, 475);
fs.writeFileSync(
  'src/data/book-patriarchs-and-prophets.ts',
  `import { ChapterContextType, BookType } from '../types';
import { pp1Quiz } from './otherQuizzes';

${pp}

export const book: BookType = {
  id: 'patriarchs-and-proph',
  totalChapters: 73,
  title: 'Patriarchs and Prophets',
  author: 'Ellen G. White',
  description: 'Covers the sprawling history of the early world, from the origin of evil and creation up to the close of King David\u2019s reign.',
  coverColor: 'bg-amber-950',
  chapters: patriarchsAndProphetsData,
};
`
);

const ch = slice(475, 545);
fs.writeFileSync(
  'src/data/book-counsels-on-health.ts',
  `import { ChapterContextType, BookType } from '../types';
import { ch1Quiz } from './otherQuizzes';

${ch}

export const book: BookType = {
  id: 'counsels-on-health',
  totalChapters: 8,
  title: 'Counsels on Health',
  author: 'Ellen G. White',
  description: 'A comprehensive manual details the moral, spiritual, and medical principles of healthy living as a divine calling.',
  coverColor: 'bg-teal-950',
  chapters: counselsOnHealthData,
};
`
);

fs.writeFileSync(
  'src/data/book-steps-to-christ.ts',
  `import { BookType } from '../types';
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
`
);

console.log('ok');
