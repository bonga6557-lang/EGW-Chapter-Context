import type { BookType } from '../types';
import { normalizeBook } from './normalizeBooks';

const BOOK_LOADERS = [
  () => import('./book-steps-to-christ'),
  () => import('./book-desire-of-ages'),
  () => import('./book-great-controversy'),
  () => import('./book-prophets-and-kings'),
  () => import('./book-patriarchs-and-prophets'),
  () => import('./book-counsels-on-health'),
] as const;

/** Dynamic per-book imports — each book becomes its own JS chunk. */
export async function loadAllBooks(): Promise<BookType[]> {
  const modules = await Promise.all(BOOK_LOADERS.map((load) => load()));
  return modules.map((m) => normalizeBook(m.book));
}

export async function loadBookById(bookId: string): Promise<BookType | null> {
  const books = await loadAllBooks();
  return books.find((b) => b.id === bookId) || null;
}
