import React from 'react';
import { motion } from 'motion/react';
import { BookType } from '../types';
import { BookOpen, ChevronRight } from 'lucide-react';
import { FlourishDivider, CornerAccents } from './Ornaments';

interface HomeProps {
  key?: React.Key;
  books: BookType[];
  onSelectBook: (bookId: string) => void;
}

export function Home({ books, onSelectBook }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      <div className="text-center mb-16 relative">
        <div className="absolute inset-x-0 -top-10 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-[#8a7b66] to-transparent opacity-50" />
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#f0ebe1] mb-4 tracking-wider drop-shadow-sm">
          EGW Chapter Context
        </h1>
        <p className="text-xl md:text-2xl text-[#b5aa9d] font-sans max-w-xl mx-auto italic leading-relaxed">
          An Ellen White study companion explaining the context, Bible foundations, argument flow, and modern application of each chapter.
        </p>
        <FlourishDivider className="w-56 h-8 mt-4" />
      </div>

      <div className="space-y-6 relative">
        <div className="relative">
          <h2 className="font-sans font-medium tracking-widest text-sm text-[#8a7b66] uppercase text-center mb-10 pb-4 border-b border-[#3b3834]">Available Library</h2>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#1c1c1c] px-3">
            <svg className="w-4 h-4 text-[#8a7b66]/60 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.4 9.1L22 10.3L16.5 15.6L17.8 23L12 19.5L6.2 23L7.5 15.6L2 10.3L9.6 9.1L12 2Z" />
            </svg>
          </div>
        </div>
        
        {books.map((book) => (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            key={book.id}
            onClick={() => onSelectBook(book.id)}
            className="group cursor-pointer bg-[#242220] rounded-sm border border-[#3b3834] shadow-2xl hover:border-[#8a7b66] transition-all flex overflow-hidden relative"
          >
            <CornerAccents />
            
            {/* Victorian Book Spine / Cover effect */}
            <div className="w-24 md:w-32 flex-shrink-0 bg-[#2d1e18] border-r border-[#3b3834] flex flex-col items-center justify-between py-6 relative overflow-hidden shadow-inner">
               {/* Leather texture simulation */}
               <div className="absolute inset-0 bg-gradient-to-b from-[#1a110e] via-[#35231c] to-[#120c0a] opacity-90" />
               
               {/* Gilt / Gold decorative borders on spine */}
               <div className="absolute right-1.5 top-0 bottom-0 w-[1px] bg-[#d4af37]/30" />
               <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#d4af37]/30" />
               {/* Spine gold horizontal bands */}
               <div className="absolute inset-x-0 top-4 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
               <div className="absolute inset-x-0 top-12 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
               <div className="absolute inset-x-0 bottom-12 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
               <div className="absolute inset-x-0 bottom-4 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

               {/* Central Emblem to enrich background */}
               <div className="relative z-10 my-auto text-center">
                 <BookOpen className="text-[#d4af37]/80 w-8 h-8 md:w-10 md:h-10 mx-auto mb-2" strokeWidth={1} />
                 <span className="font-serif text-[9px] uppercase tracking-widest text-[#d4af37]/70 block font-bold">
                   VOL. {book.id.toUpperCase()}
                 </span>
               </div>
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex items-center justify-between relative z-10 pl-8">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#e3ddce] mb-3 group-hover:text-[#d4af37] transition-colors tracking-wide">
                  {book.title}
                </h3>
                <p className="text-[#a39a8c] font-sans text-lg md:text-xl leading-relaxed line-clamp-2 md:line-clamp-none">
                  {book.description}
                </p>
                <span className={`inline-block mt-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${
                  book.chapters.length >= book.totalChapters
                    ? 'text-[#85a378] border-[#35472e]'
                    : 'text-[#c9a227] border-[#8a7b66]/40'
                }`}>
                  {book.chapters.length >= book.totalChapters
                    ? `Complete — all ${book.totalChapters} chapters`
                    : `Preview — ${book.chapters.length} of ${book.totalChapters} chapters`}
                </span>
              </div>
              <ChevronRight className="text-[#59544c] w-6 h-6 group-hover:text-[#d4af37] transition-colors ml-4 flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
