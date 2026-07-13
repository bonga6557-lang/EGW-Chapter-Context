import React from 'react';

// Elegant Victorian style floral flourish divider
export function FlourishDivider({ className = "w-48 h-12" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center mx-auto my-6 ${className}`}>
      <svg 
        viewBox="0 0 300 30" 
        className="w-full h-full text-[#8a7b66] opacity-60 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left scroll segment */}
        <path d="M 120 15 C 100 10, 80 5, 50 15 C 30 22, 15 15, 5 5 C 12 11, 25 12, 35 7 C 45 2, 60 2, 75 8 C 90 14, 105 16, 120 15 Z" />
        <circle cx="20" cy="12" r="2" />
        <circle cx="45" cy="5" r="1.5" />
        {/* Mirror right scroll segment */}
        <path d="M 180 15 C 200 10, 220 5, 250 15 C 270 22, 285 15, 295 5 C 288 11, 275 12, 265 7 C 255 2, 240 2, 225 8 C 210 14, 195 16, 180 15 Z" />
        <circle cx="280" cy="12" r="2" />
        <circle cx="255" cy="5" r="1.5" />
        {/* Central emblem */}
        <path d="M 150 5 L 155 12 L 165 15 L 155 18 L 150 25 L 145 18 L 135 15 L 145 12 Z" />
        <path d="M 150 15 C 145 15, 140 10, 140 5 L 142 5 C 142 8, 145 11, 150 11 Z" />
        <path d="M 150 15 C 155 15, 160 10, 160 5 L 158 5 C 158 8, 155 11, 150 11 Z" />
        <circle cx="150" cy="15" r="3" className="text-[#d4af37]" />
      </svg>
    </div>
  );
}

// Vintage corner brackets for placing inside absolute positions of card borders
export function CornerAccents() {
  return (
    <>
      {/* Top Left */}
      <svg 
        className="absolute top-2 left-2 w-8 h-8 text-[#8a7b66]/30 pointer-events-none" 
        viewBox="0 0 40 40" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 L 25 0 C 20 5, 15 5, 15 15 C 15 15, 5 15, 0 25 Z" fill="currentColor" />
        <path d="M 3 3 L 12 3 C 12 6, 6 12, 3 12 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="3" cy="3" r="1" className="text-[#d4af37]" />
      </svg>
      {/* Top Right */}
      <svg 
        className="absolute top-2 right-2 w-8 h-8 text-[#8a7b66]/30 pointer-events-none rotate-90" 
        viewBox="0 0 40 40" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 L 25 0 C 20 5, 15 5, 15 15 C 15 15, 5 15, 0 25 Z" fill="currentColor" />
        <circle cx="3" cy="3" r="1" className="text-[#d4af37]" />
      </svg>
      {/* Bottom Left */}
      <svg 
        className="absolute bottom-2 left-2 w-8 h-8 text-[#8a7b66]/30 pointer-events-none -rotate-90" 
        viewBox="0 0 40 40" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 L 25 0 C 20 5, 15 5, 15 15 C 15 15, 5 15, 0 25 Z" fill="currentColor" />
        <circle cx="3" cy="3" r="1" className="text-[#d4af37]" />
      </svg>
      {/* Bottom Right */}
      <svg 
        className="absolute bottom-2 right-2 w-8 h-8 text-[#8a7b66]/30 pointer-events-none rotate-180" 
        viewBox="0 0 40 40" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0 0 L 25 0 C 20 5, 15 5, 15 15 C 15 15, 5 15, 0 25 Z" fill="currentColor" />
        <circle cx="3" cy="3" r="1" className="text-[#d4af37]" />
      </svg>
    </>
  );
}

// Highly stylized gilded border wrapper with dual thin/thick margins
export function AntiqueBorderFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 md:p-8 border border-[#3b3834] bg-[#242220]/20 rounded-sm">
      <div className="absolute inset-1.5 border border-[#8a7b66]/30 pointer-events-none rounded-sm" />
      <div className="absolute inset-3 border border-[#d4af37]/10 pointer-events-none rounded-sm" />
      <CornerAccents />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Stylized Drop Cap for beginning paragraphs with illuminated style letter
export function IlluminatedLetter({ letter }: { letter: string }) {
  return (
    <span className="relative float-left text-5xl md:text-6xl font-serif font-bold text-[#d4af37] bg-[#242220] border border-[#8a7b66]/50 rounded-sm px-3.5 py-1.5 mr-3.5 mt-1.5 leading-none shadow-md">
      <span className="absolute inset-0.5 border border-[#8a7b66]/20 pointer-events-none" />
      {letter}
    </span>
  );
}
