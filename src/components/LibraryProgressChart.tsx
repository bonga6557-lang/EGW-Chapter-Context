import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookType } from '../types';
import { BarChart2, Award, Compass } from 'lucide-react';

interface ProgressChartProps {
  books: BookType[];
  exploredChapters: Record<string, boolean>;
}

export function LibraryProgressChart({ books, exploredChapters }: ProgressChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Total chapters in the entire library
  const totalChaptersInLibrary = books.reduce((acc, book) => acc + book.chapters.length, 0);
  
  // Total chapters explored in the entire library
  const totalExploredInLibrary = books.reduce((acc, book) => {
    const exploredInBook = book.chapters.filter(ch => exploredChapters[ch.id]).length;
    return acc + exploredInBook;
  }, 0);

  // Calculate data points for each book
  const data = books.map((book) => {
    const chaptersCount = book.chapters.length;
    const exploredCount = book.chapters.filter(ch => exploredChapters[ch.id]).length;
    const pctComplete = Math.round((exploredCount / chaptersCount) * 100) || 0;
    
    // Relative contribution to the whole library's total completion
    const pctOfLibrary = totalChaptersInLibrary > 0 
      ? Math.round((exploredCount / totalChaptersInLibrary) * 100) 
      : 0;

    return {
      id: book.id,
      title: book.title,
      chaptersCount,
      exploredCount,
      pctComplete,
      pctOfLibrary,
      color: getThemeColors(book.id),
    };
  });

  const totalLibraryPct = totalChaptersInLibrary > 0 
    ? Math.round((totalExploredInLibrary / totalChaptersInLibrary) * 100) 
    : 0;

  function getThemeColors(bookId: string) {
    switch (bookId) {
      case 'steps-to-christ': return { fill: '#1b3d2f', stroke: '#d4af37', text: '#5da082' };
      case 'desire-of-ages': return { fill: '#40121a', stroke: '#e5bf58', text: '#cb6677' };
      case 'great-controversy': return { fill: '#13233c', stroke: '#d4af37', text: '#688dbf' };
      case 'prophets-and-kings': return { fill: '#43301a', stroke: '#d4af37', text: '#aa8254' };
      case 'patriarchs-and-proph': return { fill: '#2b1b3d', stroke: '#e2bf5b', text: '#8964b5' };
      case 'counsels-on-health': return { fill: '#1b3a3d', stroke: '#d4af37', text: '#509faa' };
      default: return { fill: '#332211', stroke: '#d4af37', text: '#a08060' };
    }
  }

  // Dimensions for our custom SVG container
  const width = 640;
  const rowHeight = 44;
  const paddingLeft = 140;
  const paddingRight = 60;
  const chartWidth = width - paddingLeft - paddingRight;
  const height = data.length * rowHeight + 50;

  return (
    <motion.div
      id="library-progress-ledger-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#141211]/90 backdrop-blur-sm border border-[#2e2a25] rounded-sm p-6 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative metal rivets */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#3e352b] border border-[#d4af37]/35" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#3e352b] border border-[#d4af37]/35" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#3e352b] border border-[#d4af37]/35" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#3e352b] border border-[#d4af37]/35" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#2e261f] pb-4 mb-5">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#e3ddce] flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#d4af37]" />
            Library Accretion Ledger
          </h3>
          <p className="text-xs text-[#8a7b66] font-sans mt-0.5">
            An archival visualization of your reading completion across the entire volume stack.
          </p>
        </div>
        
        {/* Total stats summaries */}
        <div className="flex items-center gap-4 bg-[#1b1917] px-4 py-2 border border-[#302a24] rounded-sm">
          <div className="text-center">
            <span className="block text-[9px] uppercase font-bold text-[#8a7b66] tracking-wider">Total Shelf Journey</span>
            <span className="font-serif text-base font-bold text-[#d4af37]">
              {totalExploredInLibrary} / {totalChaptersInLibrary} Chapters
            </span>
          </div>
          <div className="h-6 w-[1.5px] bg-[#302a24]" />
          <div className="text-center">
            <span className="block text-[9px] uppercase font-bold text-[#8a7b66] tracking-wider">Completeness</span>
            <span className="font-serif text-lg font-black text-[#18392b] bg-[#d4af37] px-2 py-0.5 rounded-xs leading-none">
              {totalLibraryPct}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* The SVG Ledger Drawing Pane */}
        <div className="lg:col-span-8 flex flex-col justify-center overflow-x-auto">
          <div className="min-w-[500px]">
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full h-auto overflow-visible select-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {/* Parchment background for chart canvas */}
              <rect 
                width={width} 
                height={height} 
                fill="#1a1816" 
                rx={2} 
                stroke="#2a241f" 
                strokeWidth={1} 
              />
              
              {/* Traditional Gridlines with Roman Numeral Markers */}
              {[0, 25, 50, 75, 100].map((tick) => {
                const x = paddingLeft + (tick / 100) * chartWidth;
                const romanNumerals = { 0: 'O', 25: 'XXV', 50: 'L', 75: 'LXXV', 100: 'C' };
                const label = romanNumerals[tick as keyof typeof romanNumerals];

                return (
                  <g key={tick} className="opacity-40">
                    <line 
                      x1={x} 
                      y1={15} 
                      x2={x} 
                      y2={height - 35} 
                      stroke="#43372c" 
                      strokeWidth={1.2}
                      strokeDasharray="4 4"
                    />
                    <text
                      x={x}
                      y={height - 18}
                      fill="#8a7b66"
                      fontSize="9.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      letterSpacing="1"
                    >
                      {tick}% ({label})
                    </text>
                  </g>
                );
              })}

              {/* Draw Data Rows */}
              {data.map((item, idx) => {
                const y = idx * rowHeight + 25;
                const scoreX = paddingLeft + (item.pctComplete / 100) * chartWidth;
                const isHovered = hoveredIndex === idx;

                return (
                  <g 
                    key={item.id} 
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    {/* Row highlight on hover */}
                    {isHovered && (
                      <rect 
                        x={4} 
                        y={y - 8} 
                        width={width - 8} 
                        height={rowHeight - 4} 
                        fill="#d4af37" 
                        fillOpacity={0.03} 
                      />
                    )}

                    {/* Book Label (Abbreviated to fit neatly) */}
                    <text
                      x={paddingLeft - 15}
                      y={y + 16}
                      fill={isHovered ? "#d4af37" : "#e3ddce"}
                      fontSize="11"
                      textAnchor="end"
                      fontWeight="bold"
                      className="transition-colors duration-200"
                    >
                      {item.title.length > 20 ? item.title.slice(0, 18) + '...' : item.title}
                    </text>

                    {/* Background Bar (Vintage Cast Iron look) */}
                    <rect
                      x={paddingLeft}
                      y={y + 4}
                      width={chartWidth}
                      height={18}
                      fill="#201c18"
                      stroke="#352e25"
                      strokeWidth={1.5}
                      rx={2}
                    />

                    {/* Gilded Inner Scale Track if complete */}
                    {item.pctComplete > 0 && (
                      <motion.rect
                        initial={{ width: 0 }}
                        animate={{ width: (item.pctComplete / 100) * chartWidth }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        x={paddingLeft}
                        y={y + 4}
                        height={18}
                        fill={item.color.fill}
                        stroke={item.color.stroke}
                        strokeWidth={1.2}
                        rx={2}
                      />
                    )}

                    {/* Golden Rivet indicator showing the reading bookmark node */}
                    <motion.circle
                      initial={{ cx: paddingLeft }}
                      animate={{ cx: scoreX }}
                      transition={{ duration: 0.8 }}
                      cy={y + 13}
                      r={4.5}
                      fill="#d4af37"
                      stroke="#ffffff"
                      strokeWidth={1}
                      className="shadow-md"
                    />

                    {/* Right-Hand Percentage readout */}
                    <text
                      x={width - 15}
                      y={y + 17}
                      fill={isHovered ? "#d4af37" : "#8a7b66"}
                      fontSize="11.5"
                      textAnchor="end"
                      fontWeight="bold"
                      className="transition-colors duration-150"
                    >
                      {item.pctComplete}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Side Panel Analysis & Dynamic Legend details */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#1b1917] border border-[#2a241e] p-4 rounded-sm flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-widest block mb-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#d4af37]" /> Logged Compendium Weight
              </span>
              
              <AnimatePresence mode="wait">
                {hoveredIndex === null ? (
                  <motion.div
                    key="default-ledger"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-xs text-[#a39a8c] leading-relaxed">
                      Hover over any book's column line on the left to review its segmented contribution relative to the complete library.
                    </p>
                    <div className="border border-[#2e261f]/50 bg-[#121110] p-3 rounded-xs text-[11px] text-[#8a7b66] space-y-1">
                      <div className="flex justify-between items-center">
                        <span>Total Library Volume</span>
                        <strong className="text-[#e3ddce]">6 Master References</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cumulative Chapters</span>
                        <strong className="text-[#e3ddce]">{totalChaptersInLibrary} Chapters</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Acquired Milestone</span>
                        <strong className="text-[#d4af37] font-serif">{totalLibraryPct}% Complete</strong>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`book-ledger-${hoveredIndex}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3.5"
                  >
                    <div>
                      <h4 className="font-serif font-black text-sm text-[#e3ddce]">
                        {data[hoveredIndex].title}
                      </h4>
                      <div className="w-8 h-0.5 bg-[#d4af37]/60 mt-1" />
                    </div>

                    <div className="space-y-2 text-xs text-[#a39a8c]">
                      <div className="flex justify-between">
                        <span>Chapter Progress:</span>
                        <strong className="text-[#f2edd9]">
                          {data[hoveredIndex].exploredCount} of {data[hoveredIndex].chaptersCount} Explored
                        </strong>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Single Volume Score:</span>
                        <strong className="text-[#d4af37] font-semibold">
                          {data[hoveredIndex].pctComplete}% complete
                        </strong>
                      </div>

                      <div className="flex justify-between border-t border-[#2e261f] pt-2">
                        <span>Library Contribution:</span>
                        <strong className="text-[#64a06d] font-bold">
                          {data[hoveredIndex].pctOfLibrary}% of whole shelf
                        </strong>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#8a7b66] italic leading-tight bg-[#141211] p-2 rounded-xs border border-[#2e2a25]/40 mt-2">
                      💡 Mark chapters explored inside the Active Library sidebar to automatically update this scale.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-[#2a241e] pt-3.5 mt-4 text-[10px] text-[#8a7b66] font-sans flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#d4af37]/60" aria-hidden="true" />
              <span>Mark chapters explored in the Study Desk sidebar to update this ledger.</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
