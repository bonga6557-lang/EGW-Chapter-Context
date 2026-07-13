import React from 'react';
import { motion } from 'motion/react';
import { BookType } from '../types';
import { ArrowLeft, ChevronRight, FileText } from 'lucide-react';
import { CornerAccents, FlourishDivider } from './Ornaments';

interface BookDetailProps {
  key?: React.Key;
  book: BookType;
  onBack: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export function BookDetail({ book, onBack, onSelectChapter }: BookDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      <button
        onClick={onBack}
        className="flex items-center text-[#8a7b66] hover:text-[#d4af37] transition-colors mb-12 font-sans text-base font-medium group uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Library
      </button>

      <div className="mb-16 flex items-start border-b border-[#3b3834] pb-12 relative">
        {/* Intricately detailed Victorian bookplate/embossed cover badge */}
        <div className="w-24 h-36 bg-[#2d1e18] border border-[#d4af37]/40 rounded-sm shadow-2xl mr-8 flex-shrink-0 relative overflow-hidden flex flex-col justify-between p-3">
           {/* Leather texture */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#1a110e] via-[#35231c] to-[#120c0a] opacity-95" />
           <div className="absolute inset-1 border border-[#d4af37]/20 pointer-events-none" />
           
           <div className="relative z-10 text-center my-auto">
             <span className="font-serif text-[10px] font-bold text-[#d4af37] block leading-tight uppercase tracking-wider">{book.title}</span>
             <div className="w-6 h-[1px] bg-[#d4af37]/40 mx-auto my-1.5" />
             <span className="font-sans text-[7px] italic text-[#a39a8c]/90 block">E.G. White</span>
           </div>
        </div>
        
        <div className="pt-2">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#f0ebe1] mb-3 drop-shadow-sm tracking-wide">
            {book.title}
          </h1>
          <p className="text-[#a39a8c] font-sans text-xl italic">{book.author}</p>
          <span className={`inline-block mt-4 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${
            book.chapters.length >= book.totalChapters
              ? 'text-[#85a378] border-[#35472e]'
              : 'text-[#c9a227] border-[#8a7b66]/40'
          }`}>
            {book.chapters.length >= book.totalChapters
              ? `Complete — all ${book.totalChapters} chapters`
              : `Preview — ${book.chapters.length} of ${book.totalChapters} chapters covered so far`}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans font-medium tracking-widest text-sm text-[#8a7b66] uppercase">Chapters in this Context Guide</h2>
          <div className="h-[1px] flex-1 bg-[#3b3834] ml-4 opacity-50" />
        </div>
        
        {book.chapters.map((chapter) => (
          <motion.div
            whileHover={{ x: 4 }}
            key={chapter.id}
            onClick={() => onSelectChapter(chapter.id)}
            className="group cursor-pointer bg-[#242220]/50 rounded-sm border border-[#3b3834] p-5 flex items-center justify-between hover:border-[#8a7b66]/50 hover:bg-[#242220] transition-all shadow-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#3b3834] text-[#8a7b66] group-hover:text-[#d4af37] flex items-center justify-center mr-5 shadow-inner transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#e3ddce] group-hover:text-[#d4af37] transition-colors">
                {chapter.title}
              </h3>
            </div>
            <ChevronRight className="text-[#59544c] w-5 h-5 group-hover:text-[#d4af37] transition-colors relative z-10" />
          </motion.div>
        ))}
      </div>
      
      <FlourishDivider className="w-48 h-8 mt-12" />
    </motion.div>
  );
}
