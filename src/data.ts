/**
 * Book catalog loader. Chapter content is code-split per book via dynamic import().
 * Prefer `loadAllBooks()` from App; sync `allBooks` is removed to keep the entry chunk small.
 */
export { loadAllBooks, loadBookById } from './data/loadBooks';
export { stepsToChristData } from './data/book-steps-to-christ';
