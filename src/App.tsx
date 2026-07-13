import { useState, useEffect, useMemo, useRef, ChangeEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Search, BookMarked, Lightbulb, Link as LinkIcon,
  AlertTriangle, Copy, Download, Sparkles, Book,
  ChevronRight, HelpCircle, Archive, ClipboardList, CheckCircle2,
  Bookmark, Compass, Languages, Quote, Landmark, ZoomIn, ZoomOut, RotateCcw, Layers
} from 'lucide-react';
import { allBooks } from './data';
import { CornerAccents, FlourishDivider } from './components/Ornaments';
import { QuizCard } from './components/QuizCard';
import { LibraryProgressChart } from './components/LibraryProgressChart';
import { CulturalHistory } from './components/CulturalHistory';
import { ChapterDetail } from './components/ChapterDetail';
import { splitVerseEntry, bibleGatewayUrl } from './utils/bibleLink';
import { resolveHistoricalVerification, resolveScholarlyVerification, egwWritingsUrl } from './utils/sourceVerification';
import { SourceVerification, SourceVerificationNotice } from './components/SourceVerification';

// Deterministic dust-mote field so layout is stable across renders.
const DUST_MOTES = Array.from({ length: 26 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rnd = seed / 233280;
  const rnd2 = ((i * 4523 + 1234) % 997) / 997;
  return {
    id: i,
    left: `${(rnd * 100).toFixed(2)}%`,
    size: 1 + rnd2 * 2.4,
    duration: 14 + rnd * 22,
    delay: -rnd * 30,
    drift: `${(rnd2 - 0.5) * 120}px`,
    opacity: 0.25 + rnd2 * 0.35,
  };
});

const READING_ZOOM_MIN = 80;
const READING_ZOOM_MAX = 150;
const READING_ZOOM_STEP = 10;
const READING_ZOOM_DEFAULT = 100;
const READING_ZOOM_KEY = 'egw-reading-zoom';

function DustMotes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden" aria-hidden="true">
      {DUST_MOTES.map((m) => (
        <span
          key={m.id}
          className="absolute bottom-[-10px] rounded-full bg-[#e8d9a8]"
          style={{
            left: m.left,
            width: `${m.size}px`,
            height: `${m.size}px`,
            filter: 'blur(0.4px)',
            boxShadow: '0 0 4px rgba(212,175,55,0.5)',
            // Custom props consumed by the moteFloat keyframe
            ['--mote-drift' as string]: m.drift,
            ['--mote-opacity' as string]: m.opacity,
            animation: `moteFloat ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'study' | 'library' | 'notes' | 'cultural'>('study');
  const [selectedBookId, setSelectedBookId] = useState<string>('steps-to-christ');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('sc-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [chapterPageOpen, setChapterPageOpen] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pTab, setPTab] = useState<'context' | 'sources' | 'literary'>('context');
  const toastTimer = useRef<number | undefined>(undefined);
  const books = allBooks;
  const [readingZoom, setReadingZoom] = useState(() => {
    try {
      const saved = localStorage.getItem(READING_ZOOM_KEY);
      const n = saved ? Number(saved) : READING_ZOOM_DEFAULT;
      if (!Number.isFinite(n)) return READING_ZOOM_DEFAULT;
      return Math.min(READING_ZOOM_MAX, Math.max(READING_ZOOM_MIN, n));
    } catch {
      return READING_ZOOM_DEFAULT;
    }
  });

  const setReadingZoomPersist = (next: number) => {
    const clamped = Math.min(READING_ZOOM_MAX, Math.max(READING_ZOOM_MIN, next));
    setReadingZoom(clamped);
    localStorage.setItem(READING_ZOOM_KEY, String(clamped));
  };

  // Track explored/completed chapters in localStorage
  const [exploredChapters, setExploredChapters] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('egw-explored-chapters');
      return saved ? JSON.parse(saved) : { 'sc-1': true };
    } catch {
      return { 'sc-1': true };
    }
  });

  // Track notes saved per chapter in localStorage
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('egw-saved-notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentBook = books.find(b => b.id === selectedBookId) || books[0];
  const currentChapter =
    currentBook.chapters.find(c => c.id === selectedChapterId) ||
    currentBook.chapters[0];

  // Sync current chapter's notes
  useEffect(() => {
    const key = `${selectedBookId}-${selectedChapterId}`;
    setNotes(savedNotes[key] || '');
  }, [selectedBookId, selectedChapterId, savedNotes]);

  // Reset parchment sub-tab and quiz on chapter/book switch
  useEffect(() => {
    setPTab('context');
    setShowQuiz(false);
  }, [selectedChapterId, selectedBookId]);

  useEffect(() => {
    setChapterPageOpen(false);
  }, [selectedBookId]);

  const openChapterOnDesk = (bookId: string, chapterId: string) => {
    setSelectedBookId(bookId);
    setSelectedChapterId(chapterId);
    setActiveTab('study');
    setChapterPageOpen(false);
    setShowQuiz(false);
  };

  const handleMarkExplored = (chapterId: string) => {
    if (exploredChapters[chapterId]) return;
    const newExplored = { ...exploredChapters, [chapterId]: true };
    setExploredChapters(newExplored);
    localStorage.setItem('egw-explored-chapters', JSON.stringify(newExplored));
    showToast('Guided read complete — chapter marked explored!');
  };

  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value.slice(0, 1000);
    setNotes(val);
    const key = `${selectedBookId}-${selectedChapterId}`;
    const newNotes = { ...savedNotes, [key]: val };
    setSavedNotes(newNotes);
    localStorage.setItem('egw-saved-notes', JSON.stringify(newNotes));
  };

  const handleToggleExplored = (chapterId: string) => {
    const newExplored = { ...exploredChapters, [chapterId]: !exploredChapters[chapterId] };
    setExploredChapters(newExplored);
    localStorage.setItem('egw-explored-chapters', JSON.stringify(newExplored));
    showToast(newExplored[chapterId] ? "Chapter marked as explored!" : "Chapter marked unexplored");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopySummary = () => {
    if (!currentChapter || !currentChapter.historicalContext) {
      showToast("No context generated for this chapter yet.");
      return;
    }
    const textToCopy = `
=== ${currentBook.title} - ${currentChapter.title} ===
Theme: ${currentChapter.theme}
The Big Idea: ${currentChapter.bigIdea}
Historical Context: ${currentChapter.historicalContext}
Argument Flow:
${currentChapter.argumentFlow.map((flow, i) => `${i + 1}. ${flow.title}: ${flow.description}`).join('\n')}
Common Misreading: ${currentChapter.commonMisunderstanding}
    `.trim();

    navigator.clipboard.writeText(textToCopy).then(
      () => showToast("Study summary copied to clipboard!"),
      () => showToast("Could not copy — check browser permissions.")
    );
  };

  const handleExportNotes = () => {
    if (!currentChapter) {
      showToast("Select a chapter to export notes.");
      return;
    }
    const noteText = `
=============================================
EGW CHAPTER CONTEXT COMPANION - STUDY NOTES
=============================================
Book: ${currentBook.title}
Chapter: ${currentChapter.title}
Theme: ${currentChapter.theme || 'General'}
Date: ${new Date().toLocaleDateString()}

STUDY NOTES:
---------------------------------------------
${notes || 'No notes saved for this chapter yet.'}

---------------------------------------------
BIBLE FOUNDATIONS STREAMS:
${(currentChapter.bibleFoundation || []).join('\n')}

DISCUSSION REFLECTIONS:
${(currentChapter.discussionQuestions || []).map((q, i) => `Q${i + 1}: ${q}\n`).join('\n')}
=============================================
    `.trim();

    const blob = new Blob([noteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedBookId}-${selectedChapterId}-study-notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Notes exported successfully!");
  };

  // Search filter matching
  const filteredSearch = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => books.flatMap(book =>
    book.chapters.map(chapter => ({
      book,
      chapter,
      matches:
        book.title.toLowerCase().includes(filteredSearch) ||
        chapter.title.toLowerCase().includes(filteredSearch) ||
        (chapter.theme && chapter.theme.toLowerCase().includes(filteredSearch)) ||
        chapter.bigIdea.toLowerCase().includes(filteredSearch)
    }))
  ).filter(item => filteredSearch && item.matches), [filteredSearch, books]);

  const totalExploredInBook = currentBook.chapters.filter(c => exploredChapters[c.id]).length;
  const progressPercent = Math.round((totalExploredInBook / currentBook.chapters.length) * 100) || 0;

  const getBookCoverStyles = (bookId: string) => {
    switch (bookId) {
      case 'steps-to-christ':
        return {
          bg: 'bg-[#1b3d2f]',
          accent: 'border-[#d4af37]/40 text-[#d4af37]',
          spine: 'from-[#0e2119] via-[#1b3d2f] to-[#0a1410]'
        };
      case 'desire-of-ages':
        return {
          bg: 'bg-[#40121a]',
          accent: 'border-[#d4af37]/40 text-[#e5bf58]',
          spine: 'from-[#250b10] via-[#40121a] to-[#120508]'
        };
      case 'great-controversy':
        return {
          bg: 'bg-[#13233c]',
          accent: 'border-[#d4af37]/40 text-[#d4af37]',
          spine: 'from-[#0a1220] via-[#13233c] to-[#050a10]'
        };
      case 'prophets-and-kings':
        return {
          bg: 'bg-[#43301a]',
          accent: 'border-[#d4af37]/40 text-[#d4af37]',
          spine: 'from-[#20160a] via-[#43301a] to-[#0d0a05]'
        };
      case 'patriarchs-and-proph':
        return {
          bg: 'bg-[#2b1b3d]',
          accent: 'border-[#d4af37]/40 text-[#e2bf5b]',
          spine: 'from-[#170e21] via-[#2b1b3d] to-[#0a060f]'
        };
      case 'counsels-on-health':
        return {
          bg: 'bg-[#1b3a3d]',
          accent: 'border-[#d4af37]/45 text-[#d4af37]',
          spine: 'from-[#0e1f21] via-[#1b3a3d] to-[#091112]'
        };
      default:
        return {
          bg: 'bg-[#2d1e18]',
          accent: 'border-[#d4af37]/40 text-[#d4af37]',
          spine: 'from-[#1a110e] via-[#35231c] to-[#120c0a]'
        };
    }
  };

  // Shared staggered-entrance variants
  const containerStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  };
  const riseItem = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const tabs: { id: typeof activeTab; label: string; icon: typeof Archive; cls: string }[] = [
    { id: 'library', label: 'Book Shelf', icon: Archive, cls: 'bg-[#3b3834]/40 text-[#d4af37] border-[#d4af37]/20' },
    { id: 'study',   label: 'Study Desk', icon: Bookmark, cls: 'bg-[#2b241e] text-[#d4af37] border-[#d4af37]/45' },
    { id: 'notes',   label: 'Notes Log', icon: ClipboardList, cls: 'bg-[#3b3834]/40 text-[#d4af37] border-[#d4af37]/20' },
    { id: 'cultural',label: 'Cultural History', icon: Landmark, cls: 'bg-[#3b3834]/40 text-[#ebd392] border-[#ebd392]/30' },
  ];

  const currentCover = getBookCoverStyles(selectedBookId);

  return (
    <div className="cinematic-bg min-h-screen text-[#e3ddce] selection:bg-[#343029] selection:text-[#d4af37] flex flex-col overflow-x-hidden font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#18392b] focus:text-[#f2edd9] focus:px-4 focus:py-2 focus:rounded-sm focus:border focus:border-[#d4af37]/50">
        Skip to content
      </a>
      <DustMotes />
      <div className="vignette-overlay" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -24, x: '-50%', scale: 0.96 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -24, x: '-50%', scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            role="status"
            aria-live="polite"
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#162a14]/95 backdrop-blur-sm border border-[#305326] text-[#c0d6ba] px-6 py-3.5 rounded shadow-2xl font-sans tracking-wide text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-[#4e8c3b]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER BAR */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-40 border-b border-[#201e1c] bg-[#121211]/90 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 sticky top-0 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      >

        {/* Title, Subtitle, and golden quill logo */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -12, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 220, damping: 16 }}
            className="relative w-10 h-10 rounded bg-[#201d19] border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37] breath-glow"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M5.46 19c-.31-.56-.46-1.19-.46-1.84 0-1.63.93-3.04 2.37-3.92.51-.31.84-.87.84-1.5V11.2c.49-.66 1.1-1.22 1.79-1.66l6.76-4.63c.47-.32.96-.41 1.41-.26.35.12.63.35.83.69.2.34.25.75.14 1.18l-1.95 7.15c-.17.63-.58 1.14-1.12 1.48l-2.02 1.3c-.66.42-1.42.66-2.21.68h-.83c-.63 0-1.19.33-1.5.83-.88 1.44-2.29 2.37-3.92 2.37-.65 0-1.28-.15-1.84-.46zm14.18-12.72c-.11-.18-.28-.31-.47-.38-.21-.07-.46-.03-.7.13l-.53.36 1.34 1.34.36-.53c.16-.24.2-.49.13-.7-.07-.19-.2-.36-.38-.47l-.75-.5c-.34-.2-.75-.25-1.18-.14L5.19 19.31c.21-.07.46-.03.7.13.34.2.75.25 1.18.14" />
            </svg>
          </motion.div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wider uppercase flex items-center gap-1.5">
              <span className="shimmer-text">EGW Chapter Context</span>
            </h1>
            <p className="text-[10px] uppercase font-sans tracking-widest text-[#8a7b66] font-medium">
              Historical &bull; Biblical &bull; Practical
            </p>
          </div>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative flex-1 max-w-md w-full">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#8a7b66]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            aria-label="Search books, chapters, and themes"
            aria-expanded={!!searchQuery}
            placeholder="Search books, chapters, themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1b1918] border border-[#3b3834] rounded-full pl-10 pr-4 py-2 text-sm text-[#e3ddce] placeholder-[#5c5448] focus:outline-none focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/20 transition-all font-sans"
          />

          {/* Search suggestions dropdown */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-2 bg-[#141312] border border-[#3b3834] rounded shadow-2xl z-50 max-h-80 overflow-y-auto p-2 scrollbar-thin"
              >
                {searchResults.length > 0 ? (
                  searchResults.map(({ book, chapter }) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        openChapterOnDesk(book.id, chapter.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2.5 hover:bg-[#201e1b] rounded flex items-start gap-2.5 border-b border-[#201e1c]/40 last:border-0 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#d4af37] mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-[#8a7b66] font-medium uppercase tracking-wider">{book.title}</div>
                        <div className="text-sm text-[#e3ddce] font-serif font-semibold">{chapter.title}</div>
                        <div className="text-xs text-[#a39a8c] italic opacity-85 mt-0.5 line-clamp-1">{chapter.theme || chapter.bigIdea}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-[#5c5448] font-sans">No matching chapters or themes found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tab Buttons (Victorian library panels) */}
        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-1.5 bg-[#1b1918] p-1 border border-[#3b3834] rounded tab-scroll overflow-x-auto max-w-full shrink-0">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => setActiveTab(t.id)}
                className={`relative px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all rounded-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 ${active ? t.cls + ' border' : 'text-[#8a7b66] hover:text-[#e3ddce] border border-transparent'}`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {t.label}
              </button>
            );
          })}
        </nav>
      </motion.header>

      {/* WORKSPACE AREA */}
      <main id="main-content" className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col gap-6 md:px-8 max-w-[1920px] mx-auto w-full">

        {/* STUDY DESK WORKSPACE TAB */}
        {activeTab === 'study' && chapterPageOpen && currentChapter?.historicalContext && (
          <motion.div variants={containerStagger} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <motion.section variants={riseItem} className="lg:col-span-3 space-y-4 order-1 hidden lg:block">
              <div className="panel-glass p-4">
                <h2 className="font-sans font-bold text-xs text-[#8a7b66] uppercase tracking-widest mb-3">Chapters</h2>
                <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {currentBook.chapters.map(ch => (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`w-full text-left py-2 px-2.5 rounded-sm text-xs transition-colors border ${
                        selectedChapterId === ch.id
                          ? 'bg-[#2b241e]/55 text-[#d4af37] border-[#d4af37]/20 font-semibold'
                          : 'text-[#a39a8c] hover:bg-[#201e1b] border-transparent'
                      }`}
                    >
                      {ch.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
            <motion.section variants={riseItem} className="lg:col-span-9 order-2">
              <ChapterDetail
                book={currentBook}
                chapter={currentChapter}
                onBack={() => setChapterPageOpen(false)}
                onSelectChapter={setSelectedChapterId}
                onGuidedComplete={handleMarkExplored}
              />
            </motion.section>
          </motion.div>
        )}

        {activeTab === 'study' && !(chapterPageOpen && currentChapter?.historicalContext) && (
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >

            {/* COLUMN 1: LEFT SIDEBAR (LIBRARY & NAVIGATION) */}
            <motion.section variants={riseItem} className="lg:col-span-3 space-y-4 order-1">

              <div className="panel-glass p-4">
                <div className="flex items-center justify-between mb-4 border-b border-[#2e2b28] pb-2">
                  <h2 className="font-sans font-bold text-xs text-[#8a7b66] uppercase tracking-widest flex items-center gap-1.5">
                    <Book className="w-3.5 h-3.5 text-[#d4af37]" /> Active Library
                  </h2>
                  <span className="text-[10px] font-mono text-[#5c5448]">VOL. I-VI</span>
                </div>

                {/* Library Book Accordion list */}
                <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
                  {books.map((book) => {
                    const isBookActive = selectedBookId === book.id;
                    const bookCover = getBookCoverStyles(book.id);

                    return (
                      <div
                        key={book.id}
                        className={`border rounded-sm transition-all overflow-hidden ${isBookActive ? 'border-[#8a7b66]/60 bg-[#1c1a19]' : 'border-[#2c2926] bg-[#141312] hover:border-[#524c43]'}`}
                      >
                        {/* Book Header / Accordion trigger */}
                        <button
                          onClick={() => {
                            setSelectedBookId(book.id);
                            // Auto select first chapter of selected book
                            if (book.chapters.length > 0) {
                              setSelectedChapterId(book.chapters[0].id);
                            }
                          }}
                          className="w-full p-3 flex items-center justify-between text-left cursor-pointer group"
                        >
                          <span className={`font-serif text-sm font-semibold tracking-wide group-hover:text-[#d4af37] transition-colors ${isBookActive ? 'text-[#d4af37]' : 'text-[#b5aa9d]'}`}>
                            {book.title}
                          </span>
                          <span className="text-[#5c5448] text-xs font-mono">
                            {isBookActive ? 'Active' : `+`}
                          </span>
                        </button>

                        {/* Expandable book contents */}
                        <AnimatePresence initial={false}>
                          {isBookActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 bg-[#131211] border-t border-[#262422] space-y-4">

                                {/* Realistic physical book layout badge */}
                                <div className="flex gap-3 bg-[#1e1c1a] border border-[#302c28] p-3 rounded-sm relative overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-r from-[#170e0b]/50 to-transparent pointer-events-none" />

                                  {/* Gilded Embossed Cover */}
                                  <div className={`${bookCover.bg} w-20 h-28 border ${bookCover.accent} rounded-sm shadow-xl flex-shrink-0 relative overflow-hidden flex flex-col justify-between p-2`}>
                                    <div className="absolute inset-0 bg-noise opacity-10" />
                                    <div className={`absolute inset-0 bg-gradient-to-b ${bookCover.spine} opacity-95`} />
                                    <div className="absolute inset-0.5 border border-[#d4af37]/25 pointer-events-none" />

                                    <div className="relative z-10 text-center my-auto flex flex-col items-center justify-center h-full">
                                      <span className="font-serif text-[7.5px] font-bold block leading-tight uppercase tracking-wider text-center">{book.title}</span>
                                      <div className="w-5 h-[1.5px] bg-[#d4af37]/50 mx-auto my-1.5" />
                                      <span className="font-sans text-[6px] italic text-[#a39a8c]/80 block">E.G. White</span>
                                    </div>
                                  </div>

                                  <div className="flex-1 flex flex-col justify-center">
                                    <h4 className="font-serif font-bold text-sm text-[#f2edd9] line-clamp-1">{book.title}</h4>
                                    <p className="text-[10px] text-[#8a7b66] italic mt-0.5">by {book.author}</p>

                                    {/* Progress explored tracker */}
                                    <div className="mt-3.5 space-y-1">
                                      <div className="flex items-center justify-between text-[10px] font-mono">
                                        <span className="text-[#8a7b66] font-medium">{totalExploredInBook} of {book.chapters.length} explored</span>
                                        <span className="text-[#d4af37] font-bold">{progressPercent}%</span>
                                      </div>
                                      <div className="w-full bg-[#292623] h-1.5 rounded-full overflow-hidden border border-[#171615]">
                                        <motion.div
                                          className="bg-gradient-to-r from-[#8a7b66] via-[#d4af37] to-[#8a7b66] h-full"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${progressPercent}%` }}
                                          transition={{ duration: 0.7, ease: 'easeOut' }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Chapters inside expanded book */}
                                <div className="space-y-1">
                                  <div className="text-[10px] text-[#5c5448] font-bold uppercase tracking-widest mb-1.5">Chapters</div>
                                  {book.chapters.map((ch) => {
                                    const isChActive = selectedChapterId === ch.id;
                                    const isChExplored = exploredChapters[ch.id];

                                    return (
                                      <div
                                        key={ch.id}
                                        className={`w-full rounded-sm flex items-stretch overflow-hidden border ${
                                          isChActive ? 'bg-[#2b241e]/55 border-[#d4af37]/20' : 'border-transparent hover:bg-[#201e1b]'
                                        }`}
                                      >
                                        <button
                                          type="button"
                                          role="checkbox"
                                          aria-checked={!!isChExplored}
                                          aria-label={`Mark ${ch.title} as explored`}
                                          onClick={() => handleToggleExplored(ch.id)}
                                          className={`flex-shrink-0 w-9 flex items-center justify-center border-r border-[#2e2a26]/80 transition-all ${
                                            isChExplored ? 'bg-[#d4af37]/15 text-[#d4af37]' : 'text-[#5c5448] hover:text-[#8a7b66]'
                                          }`}
                                        >
                                          <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                                            isChExplored ? 'bg-[#d4af37] border-[#d4af37] text-[#1c1c1c]' : 'border-[#3b3834]'
                                          }`}>
                                            {isChExplored && (
                                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
                                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                              </svg>
                                            )}
                                          </span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => openChapterOnDesk(book.id, ch.id)}
                                          className={`flex-1 text-left py-2 px-2.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                                            isChActive ? 'text-[#d4af37] font-semibold' : 'text-[#a39a8c] hover:text-[#e3ddce]'
                                          }`}
                                        >
                                          <span className="line-clamp-1">{ch.title}</span>
                                          <Bookmark className={`w-3 h-3 flex-shrink-0 ml-2 ${isChActive ? 'text-[#d4af37] fill-[#d4af37]/20' : 'text-[#3b3834]'}`} />
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Scripture card with a Glowing Burning candle */}
              <div className="bg-[#121110]/90 backdrop-blur-sm border border-[#24211f] rounded-sm p-4 relative overflow-hidden flex flex-col justify-between shadow-lg">
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#d4af37]/5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute inset-1 border border-[#302c28]/45 pointer-events-none rounded-sm" />

                <div className="relative z-10 flex gap-3">
                  <div className="flex-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8a7b66]/60 mb-2">
                      <path d="M3 5h18v2H3V5zm0 4h12v2H3V9zm0 4h18v2H3v-2zm0 4h12v2H3v-2z" />
                    </svg>
                    <blockquote className="font-serif italic text-xs leading-relaxed text-[#a39a8c]">
                      &ldquo;Search the Scriptures, for in them ye think ye have eternal life.&rdquo;
                    </blockquote>
                    <p className="font-sans text-[10px] text-[#8a7b66] font-bold tracking-widest mt-2">
                      &mdash; John 5:39
                    </p>
                  </div>

                  {/* 3D Animated Candlestick */}
                  <div className="flex items-end self-end flex-shrink-0">
                    <div className="relative w-8 h-20 flex flex-col items-center justify-end">

                      {/* Glowing halo behind flame */}
                      <div className="absolute top-0 w-8 h-8 rounded-full bg-[#f5c441]/30 blur-md flame-glow pointer-events-none" />

                      {/* Burning Pulsing Flame */}
                      <div className="absolute top-2 w-3 h-5 flame-anim" style={{ filter: 'drop-shadow(0 0 8px #f5b833)' }}>
                        <div className="w-3 h-5 bg-gradient-to-t from-[#d98a1d] via-[#f0bc34] to-[#fff3b0] rounded-t-full rounded-b-full" />
                        <div className="w-1 h-2 bg-[#fff7e0] rounded-full mx-auto -mb-1 opacity-90" />
                      </div>

                      {/* Black wick */}
                      <div className="absolute top-[23px] w-[0.8px] h-2.5 bg-[#171615]" />

                      {/* Melty Candlewax tube */}
                      <div className="w-2.5 h-10 bg-[#eae3cf] rounded-t-sm border border-[#beb395] relative overflow-hidden" style={{ boxShadow: 'inset -2px 0 3px rgba(0,0,0,0.1)' }}>
                        <div className="absolute top-0.5 left-0.5 w-[2px] h-3 bg-[#eae3cf] rounded-full" />
                        <div className="absolute top-1 right-0.5 w-[1.5px] h-2 bg-[#eae3cf] rounded-full" />
                      </div>

                      {/* Antique brass stand */}
                      <div className="w-6 h-1.5 bg-[#8a7b66] border border-[#d4af37]/30 rounded-t-sm" />
                      <div className="w-8 h-2 bg-gradient-to-r from-[#59544c] via-[#d4af37] to-[#43301a] rounded-full shadow-md border-t border-[#d4af37]/45" />
                    </div>
                  </div>

                </div>
              </div>

            </motion.section>

            {/* COLUMN 2: CENTER CHAPTER CONTENT (THE PARCHMENT SCROLL) */}
            <motion.section variants={riseItem} className="lg:col-span-6 relative order-2">

              {/* THE BEAUTIFUL PARCHMENT PAGE SHEET */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedBookId}-${selectedChapterId}`}
                  initial={{ opacity: 0, y: 30, rotateX: -6, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="parchment-tex bg-[#f3eedb] text-[#24221f] rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-[#ded5be] relative overflow-auto p-5 sm:p-8 md:p-12 min-h-[min(750px,85vh)]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(243,238,219,0.3) 100%)',
                    transformPerspective: 1200,
                  }}
                >
                  {/* Thin golden internal margin border */}
                  <div className="absolute inset-4 border border-[#d4af37]/25 pointer-events-none rounded-xs" />
                  <div className="absolute inset-5 border border-[#8a7b66]/10 pointer-events-none rounded-xs" />

                  {/* Dark Forest Green Ribbon bookmark */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 112 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                    className="absolute top-0 left-7 w-6 bg-[#18392b] shadow-lg flex flex-col justify-between items-center py-2 z-10 rounded-b-xs border-r border-t border-[#d4af37]/30 overflow-hidden"
                  >
                    <div className="w-full h-[1px] bg-[#d4af37]/50" />
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#d4af37] opacity-80">
                      <path d="M12 2L14.4 9.1L22 10.3L16.5 15.6L17.8 23L12 19.5L6.2 23L7.5 15.6L2 10.3L9.6 9.1L12 2Z" />
                    </svg>
                  </motion.div>

                  {currentChapter?.historicalContext && (
                    <div
                      role="group"
                      aria-label="Reading zoom"
                      className="absolute top-3 right-3 z-20 flex items-center gap-0.5 bg-[#f0ebda]/95 border border-[#ded5be] rounded-sm shadow-md p-0.5"
                    >
                      <button
                        type="button"
                        aria-label="Zoom out"
                        disabled={readingZoom <= READING_ZOOM_MIN}
                        onClick={() => setReadingZoomPersist(readingZoom - READING_ZOOM_STEP)}
                        className="p-1.5 rounded-sm text-[#5c5448] hover:text-[#18392b] hover:bg-[#ded5be]/50 disabled:opacity-35 disabled:pointer-events-none transition-colors"
                      >
                        <ZoomOut className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span className="text-[10px] font-mono text-[#5c5448] w-9 text-center tabular-nums select-none" aria-live="polite">
                        {readingZoom}%
                      </span>
                      <button
                        type="button"
                        aria-label="Reset zoom"
                        onClick={() => setReadingZoomPersist(READING_ZOOM_DEFAULT)}
                        className="p-1.5 rounded-sm text-[#5c5448] hover:text-[#18392b] hover:bg-[#ded5be]/50 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label="Zoom in"
                        disabled={readingZoom >= READING_ZOOM_MAX}
                        onClick={() => setReadingZoomPersist(readingZoom + READING_ZOOM_STEP)}
                        className="p-1.5 rounded-sm text-[#5c5448] hover:text-[#18392b] hover:bg-[#ded5be]/50 disabled:opacity-35 disabled:pointer-events-none transition-colors"
                      >
                        <ZoomIn className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}

                  {!currentChapter?.historicalContext ? (
                    <div className="mt-16 sm:mt-20 text-center py-16 font-sans space-y-4">
                      <BookOpen className="w-12 h-12 text-[#8a7b66] mx-auto opacity-40" />
                      <h3 className="font-serif text-xl font-bold text-[#2b251e]">Chapter Unavailable</h3>
                      <p className="text-xs text-[#7a6d59] max-w-xs mx-auto">Select another chapter from the Active Library sidebar.</p>
                    </div>
                  ) : (
                    <div
                      className="origin-top"
                      style={{ zoom: readingZoom / 100 }}
                    >
                      {/* Main Parchment Header */}
                      <div className="mt-8 text-center">
                    <motion.h3
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.6 }}
                      className="font-serif text-3xl md:text-4xl font-extrabold tracking-wide text-[#2b251e] leading-tight max-w-[85%] mx-auto"
                    >
                      {currentChapter.title}
                    </motion.h3>

                    {/* Flourish mini decoration lines */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.6 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="flex items-center justify-center gap-3 my-4"
                    >
                      <div className="w-16 h-[1px] bg-[#8a7b66]/35" />
                      <span className="text-[#8a7b66] text-xs">❦</span>
                      <div className="w-16 h-[1px] bg-[#8a7b66]/35" />
                    </motion.div>

                    {/* Metadata info bar */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-sans text-[#7a6d59] font-medium border-t border-b border-[#ded5be]/60 py-2.5 px-4 max-w-lg mx-auto">
                      <span className="flex items-center gap-1">
                        📖 <strong className="text-[#4a4235]">Book:</strong> {currentBook.title}
                      </span>
                      <span className="w-[1.5px] h-3 bg-[#ded5be]" />
                      <span className="flex items-center gap-1">
                        🏷️ <strong className="text-[#4a4235]">Theme:</strong> {currentChapter.theme || 'Devout Walk'}
                      </span>
                      <span className="w-[1.5px] h-3 bg-[#ded5be]" />
                      <span className="flex items-center gap-1">
                        ⏱️ <strong className="text-[#4a4235]">Reading time:</strong> {currentChapter.readingTime || '5 min'}
                      </span>
                    </div>

                    <div className="flex justify-center mt-5 mb-2">
                      <button
                        type="button"
                        onClick={() => setChapterPageOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#18392b] text-[#f2edd9] border border-[#d4af37]/45 px-5 py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest shadow-md hover:bg-[#1f4a38] hover:border-[#d4af37] transition-colors"
                      >
                        <Layers className="w-4 h-4 text-[#d4af37]" />
                        Read Bit by Bit — Guided Study
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-[#7a6d59] font-sans max-w-md mx-auto mb-4">
                      Click a chapter in the sidebar for the Study Desk parchment. Use the button above for guided bit-by-bit reading.
                    </p>

                    {/* Parchment Sub-Tab Navigation */}
                    <div role="tablist" aria-label="Chapter content sections" className="flex justify-center border-b border-[#ded5be]/80 pb-1 mt-6 mb-4 max-w-lg mx-auto gap-1 sm:gap-4 flex-wrap">
                      {([
                        ['context', 'Core Journey'],
                        ['sources', 'Scholarly & Historical'],
                        ['literary', 'Phrases & Quotes'],
                      ] as const).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          id={`parchment-tab-${key}`}
                          aria-selected={pTab === key}
                          aria-controls={`parchment-panel-${key}`}
                          role="tab"
                          onClick={() => setPTab(key)}
                          className={`px-3 py-2 text-[11px] uppercase tracking-wider font-bold transition-all relative ${
                            pTab === key ? 'text-[#18392b] font-extrabold' : 'text-[#7a6d59] hover:text-[#2b251e]'
                          }`}
                        >
                          {label}
                          {pTab === key && (
                            <motion.div layoutId="parchmentUnderline" className="absolute bottom-0 left-1 right-1 h-0.5 bg-[#18392b]" />
                          )}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pTab}
                        id={`parchment-panel-${pTab}`}
                        role="tabpanel"
                        aria-labelledby={`parchment-tab-${pTab}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                      >
                        {pTab === 'context' && (
                          <div className="space-y-6">
                            {/* CARD 1: THE BIG IDEA */}
                            <ParchmentCard delay={0.05}>
                              <div className="w-12 h-12 rounded-full bg-[#242220] border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-md">
                                <Lightbulb className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-sans font-bold text-[11px] tracking-widest text-[#8a7b66] uppercase mb-1">
                                  The Big Idea
                                </h4>
                                <p className="font-serif text-xl md:text-2xl text-[#3b352b] leading-relaxed font-semibold">
                                  {currentChapter.bigIdea}
                                </p>
                              </div>
                            </ParchmentCard>

                            {/* CARD 2: HISTORICAL CONTEXT WITH CAP DROP */}
                            <ParchmentCard delay={0.12} variant="soft">
                              <div className="w-12 h-12 rounded-full bg-[#242220] border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-md">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                                  <rect x="4" y="18" width="16" height="3" rx="1" />
                                  <line x1="8" y1="18" x2="8" y2="7" />
                                  <line x1="12" y1="18" x2="12" y2="7" />
                                  <line x1="16" y1="18" x2="16" y2="7" />
                                  <path d="M6 7h12V5a1 1 0 00-1-1H7a1 1 0 00-1 1v2z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-sans font-bold text-[11px] tracking-widest text-[#8a7b66] uppercase mb-2">
                                  Historical Context
                                </h4>
                                <div className="font-sans text-[#52493d] text-base leading-relaxed text-justify">
                                  {currentChapter.historicalContext && currentChapter.historicalContext.length > 0 ? (
                                    <div className="relative">
                                      <div className="float-left text-4xl font-serif font-extrabold text-[#d4af37] bg-[#242220] border border-[#d4af37]/35 rounded px-2.5 py-0.5 mr-2.5 mt-1 text-center shadow-md select-none">
                                        {currentChapter.historicalContext.charAt(0)}
                                      </div>
                                      <span>{currentChapter.historicalContext.slice(1)}</span>
                                    </div>
                                  ) : (
                                    currentChapter.historicalContext
                                  )}
                                </div>
                              </div>
                            </ParchmentCard>

                            {/* CARD 3: ARGUMENT FLOW LIST */}
                            <ParchmentCard delay={0.18}>
                              <div className="w-12 h-12 rounded-full bg-[#242220] border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-md">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                                  <line x1="8" y1="6" x2="21" y2="6" strokeLinecap="round" />
                                  <line x1="8" y1="12" x2="21" y2="12" strokeLinecap="round" />
                                  <line x1="8" y1="18" x2="21" y2="18" strokeLinecap="round" />
                                  <circle cx="3.5" cy="6" r="1.5" />
                                  <circle cx="3.5" cy="12" r="1.5" />
                                  <circle cx="3.5" cy="18" r="1.5" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-sans font-bold text-[11px] tracking-widest text-[#8a7b66] uppercase mb-3">
                                  Argument Flow
                                </h4>
                                <ul className="space-y-3.5">
                                  {currentChapter.argumentFlow.map((flow, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -12 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                                      className="flex gap-3"
                                    >
                                      <span className="w-5 h-5 rounded-full bg-[#242220] text-[#d4af37] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                        {i + 1}
                                      </span>
                                      <div>
                                        <span className="font-serif font-bold text-[#3d362c] text-[15px]">{flow.title}:</span>
                                        <p className="font-sans text-sm text-[#5d5244] leading-relaxed inline ml-1.5">{flow.description}</p>
                                      </div>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </ParchmentCard>

                            {/* CARD 4: COMMON MISREADING */}
                            <ParchmentCard delay={0.24} variant="soft">
                              <div className="w-12 h-12 rounded-full bg-[#242220] border-2 border-[#d4af37] text-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-md">
                                <AlertTriangle className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-sans font-bold text-[11px] tracking-widest text-[#8a7b66] uppercase mb-1.5">
                                  Common Misreading
                                </h4>
                                <p className="font-serif text-[15px] leading-relaxed text-[#5c3e1e] font-medium italic">
                                  {currentChapter.commonMisunderstanding}
                                </p>
                              </div>
                            </ParchmentCard>

                            {/* CARD 5: MODERN APPLICATION */}
                            {currentChapter.modernApplication && (
                              <ParchmentCard delay={0.3}>
                                <div className="w-12 h-12 rounded-full bg-[#242220] border-2 border-[#18392b] text-[#18392b] flex items-center justify-center flex-shrink-0 shadow-md">
                                  <Compass className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                  <h4 className="font-sans font-bold text-[11px] tracking-widest text-[#18392b] uppercase mb-1">
                                    Modern Application
                                  </h4>
                                  <p className="font-serif text-[#2b251e] text-base leading-relaxed">
                                    {currentChapter.modernApplication}
                                  </p>
                                </div>
                              </ParchmentCard>
                            )}
                          </div>
                        )}

                        {pTab === 'sources' && (
                          <div className="space-y-6 text-[#24221f]">
                            <div className="pt-2">
                              <h3 className="font-serif text-lg font-bold text-[#2b251e] border-b border-[#ded5be] pb-2 flex items-center gap-2">
                                <span>✏️</span> Scholarly References & Analysis
                              </h3>
                              <p className="text-xs text-[#7a6d59] mt-1 font-sans">
                                Critical companion context and modern historical assessments from Ellen White and Adventist historians.
                              </p>
                            </div>

                            {currentChapter.scholarlyReferences && currentChapter.scholarlyReferences.length > 0 ? (
                              <div className="space-y-5">
                                <SourceVerificationNotice variant="parchment" />
                                {currentChapter.scholarlyReferences.map((ref, idx) => {
                                  const v = resolveScholarlyVerification(ref);
                                  return (
                                  <div key={idx} className="bg-[#faf8ef]/70 border border-[#ded5be]/70 rounded-xs p-5 md:p-6 relative overflow-hidden shadow-sm">
                                    <div className="absolute top-2 right-2 text-3xl opacity-[0.05] font-serif pointer-events-none select-none">❧</div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-3.5">
                                      <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                          <span className="font-serif font-bold text-[#2b251e] text-base">{ref.author}</span>
                                          <span className="text-[10px] bg-[#d4af37]/15 text-[#6b5514] font-mono px-2 py-0.5 rounded-sm font-semibold">{ref.year}</span>
                                        </div>
                                        <h4 className="font-serif italic font-semibold text-xs text-[#4e4033] mb-2">
                                          {ref.title} &mdash; <span className="font-sans text-xs not-italic text-[#7a6d59]">{ref.source}</span>
                                        </h4>

                                        <p className="font-sans text-xs text-[#6e5d48] leading-relaxed mb-4">
                                          <strong className="text-[#3d3326]">Significance:</strong> {ref.relevance}
                                        </p>

                                        <div className="bg-[#f0ebda]/60 border-l-[3.5px] border-[#d4af37] py-3 px-4 rounded-r-xs italic font-serif text-[#3b3328] text-[13.5px] leading-relaxed">
                                          &ldquo;{ref.directQuote}&rdquo;
                                        </div>
                                        <SourceVerification variant="parchment" quoteType={v.quoteType} sourceUrl={v.sourceUrl} verifyNote={v.verifyNote} />
                                      </div>
                                    </div>
                                  </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <EmptyParchmentNote text="Archival scholarly annotations for this chapter are currently being indexed." />
                            )}

                            <div className="pt-4">
                              <h3 className="font-serif text-lg font-bold text-[#2b251e] border-b border-[#ded5be] pb-2 flex items-center gap-2">
                                <span>📰</span> Historical Source Material & Articles
                              </h3>
                              <p className="text-xs text-[#7a6d59] mt-1 font-sans">
                                Primary sources, newspapers, and journals detailing the social, cultural, and spiritual environment of the era.
                              </p>
                            </div>

                            {currentChapter.historicalSources && currentChapter.historicalSources.length > 0 ? (
                              <div className="space-y-5">
                                <SourceVerificationNotice variant="parchment" />
                                {currentChapter.historicalSources.map((source, idx) => {
                                  const v = resolveHistoricalVerification(source);
                                  return (
                                  <div key={idx} className="bg-[#faf8ef]/50 border border-[#ded5be]/60 rounded-xs p-5 md:p-6 shadow-sm border-dashed relative">
                                    <div className="absolute top-2 right-2 text-2xl opacity-[0.05] pointer-events-none select-none">🗄️</div>

                                    <div className="mb-3">
                                      <h4 className="font-serif font-bold text-base text-[#2b251e]">{source.title}</h4>
                                      <p className="text-xs text-[#7a6d59] font-sans mt-0.5">
                                        Authored by <strong className="text-[#4e4233]">{source.author}</strong> &bull; Published in <em className="text-[#4e4233]">{source.publication}</em>
                                      </p>
                                    </div>

                                    <div className="bg-[#faf9f4] border border-[#ded5be]/80 p-4 rounded-sm shadow-inner relative overflow-hidden">
                                      <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#eae3ce]/20 rounded-full filter blur-xl" />
                                      <Quote className="w-5 h-5 text-[#ded5be] absolute top-2 right-2 pointer-events-none" />
                                      <p className="font-serif text-xs italic leading-relaxed text-[#4a4034] relative z-10 pr-6">
                                        &ldquo;{source.quote}&rdquo;
                                      </p>
                                    </div>
                                    <SourceVerification variant="parchment" quoteType={v.quoteType} sourceUrl={v.sourceUrl} verifyNote={v.verifyNote} />
                                  </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <EmptyParchmentNote text="No primary historical articles linked directly to this chapter yet. Explore other chapters on the shelf for archival primary documents." />
                            )}
                          </div>
                        )}

                        {pTab === 'literary' && (
                          <div className="space-y-6 text-[#24221f]">
                            <div className="pt-2">
                              <h3 className="font-serif text-lg font-bold text-[#2b251e] border-b border-[#ded5be] pb-2 flex items-center gap-2">
                                <span>✍️</span> Authoritative Direct Quotations
                              </h3>
                              <p className="text-xs text-[#7a6d59] mt-1 font-sans">
                                Anchored core statements and beautiful spiritual highlights directly taken from the official text.
                              </p>
                            </div>

                            {currentChapter.egwQuotes && currentChapter.egwQuotes.length > 0 ? (
                              <div className="grid grid-cols-1 gap-5">
                                {currentChapter.egwQuotes.map((q, idx) => (
                                  <div key={idx} className="bg-[#faf8ef]/70 border border-[#ded5be]/70 rounded-xs p-5 md:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
                                    <Quote className="w-10 h-10 text-[#d4af37]/10 absolute -top-1 -left-1 pointer-events-none stroke-[2]" />
                                    <p className="font-serif italic text-base text-[#2b251e] leading-relaxed mb-3 relative z-10">
                                      &ldquo;{q.quote}&rdquo;
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-2 text-right border-t border-[#ded5be]/50 pt-2">
                                      <a
                                        href={q.sourceUrl ?? egwWritingsUrl(q.reference)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[9px] font-bold uppercase tracking-widest text-[#18392b] border border-[#18392b]/25 px-2.5 py-1 rounded-sm hover:border-[#18392b]/50 transition-colors"
                                      >
                                        Verify on EGW Writings
                                      </a>
                                      <span className="font-sans font-bold text-[9px] tracking-widest text-[#8a7b66] uppercase">
                                        &mdash; {q.reference}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <EmptyParchmentNote text="No specific quotes highlighted for this chapter. Open the official book text using the action button below to read the complete text." />
                            )}

                            <div className="pt-4">
                              <h3 className="font-serif text-lg font-bold text-[#2b251e] border-b border-[#ded5be] pb-2 flex items-center gap-2">
                                <span>📖</span> Victorian Phrase Glossary
                              </h3>
                              <p className="text-xs text-[#7a6d59] mt-1 font-sans">
                                Translating nineteenth-century idioms, traditional expressions, and complex terms into accessible vocabulary.
                              </p>
                            </div>

                            {currentChapter.hardPhrases && currentChapter.hardPhrases.length > 0 ? (
                              <div className="space-y-4">
                                {currentChapter.hardPhrases.map((phrase, idx) => (
                                  <div key={idx} className="bg-[#faf8ef]/50 border border-[#ded5be]/60 rounded-xs p-5 shadow-sm flex items-start gap-4">
                                    <div className="w-9 h-9 rounded bg-[#242220] border border-[#d4af37]/45 text-[#d4af37] flex items-center justify-center flex-shrink-0 font-bold font-serif text-sm">
                                      <Languages className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-serif font-bold text-sm text-[#18392b] mb-1">
                                        &ldquo;{phrase.phrase}&rdquo;
                                      </h4>
                                      <p className="font-sans text-xs text-[#5c4f3d] leading-relaxed">
                                        <strong className="text-[#3b3124] uppercase font-bold text-[9px] tracking-wider block mb-0.5">Explanation:</strong> {phrase.explanation}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <EmptyParchmentNote text="No demanding nineteenth-century terminology highlighted for this chapter." />
                            )}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* BUTTON: READ OFFICIAL EGW CHAPTER */}
                  <div className="mt-10 mb-2 flex justify-center">
                    <a
                      href={currentChapter.egwLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 bg-[#18392b] hover:bg-[#204937] text-white border border-[#d4af37]/35 py-3 px-8 rounded-sm text-sm font-semibold tracking-wider transition-all shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-0.5"
                    >
                      <BookOpen className="w-4 h-4 text-[#d4af37]" />
                      Open Official EGW Chapter
                      <LinkIcon className="w-3.5 h-3.5 text-[#d4af37] opacity-60 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                    </div>
                  )}
            </motion.div>
              </AnimatePresence>

              {/* PRACTICE QUIZ CORNER UNDER THE PARCHMENT */}
              <div className="mt-6">
                <button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="w-full bg-[#161514]/90 backdrop-blur-sm hover:bg-[#1e1c1a] border border-[#2e2a26] rounded-sm p-4 flex items-center justify-between transition-colors shadow-lg group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-serif text-sm font-bold text-[#e3ddce] group-hover:text-[#d4af37] transition-colors">Study Assessment Quiz</h4>
                      <p className="text-[10px] text-[#8a7b66] font-sans tracking-wide uppercase">Practice context questions &bull; testing your knowledge retention</p>
                    </div>
                  </div>
                  <span className="text-[#d4af37] text-xs font-bold font-sans uppercase tracking-widest border border-[#d4af37]/30 px-3 py-1 rounded-sm group-hover:border-[#d4af37] transition-colors">
                    {showQuiz ? 'Collapse Quiz' : 'Try Quiz'}
                  </span>
                </button>

                <AnimatePresence>
                  {showQuiz && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-2"
                    >
                      <QuizCard questions={currentChapter.quiz} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.section>

            {/* COLUMN 3: RIGHT PANEL ("RESEARCH DESK") */}
            <motion.section variants={riseItem} className="lg:col-span-3 space-y-4 order-3">

              <div className="panel-glass p-5 relative">
                <div className="absolute top-2 right-2 opacity-[0.03] text-[#d4af37] pointer-events-none">
                  🔍
                </div>
                <h3 className="font-serif text-sm font-bold tracking-widest text-[#d4af37] uppercase border-b border-[#302c28] pb-3.5 mb-4 flex items-center gap-2">
                  <span>📚</span> Research Desk
                </h3>

                {/* 1. BIBLE FOUNDATION */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-[#8a7b66] uppercase tracking-wider">
                    <BookMarked className="w-3.5 h-3.5 text-[#d4af37]" /> Bible Foundation
                  </div>
                  <div className="space-y-2">
                    {currentChapter.bibleFoundation.map((verse, idx) => {
                      const { reference, text } = splitVerseEntry(verse);
                      return (
                        <a
                          key={idx}
                          href={bibleGatewayUrl(reference)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#1e1a17] border border-[#2e2620] rounded-sm p-3 hover:border-[#d4af37]/50 hover:-translate-y-0.5 transition-all flex items-center justify-between cursor-pointer group"
                          title={`Open ${reference} on Bible Gateway (KJV)`}
                        >
                          <div>
                            <h4 className="font-serif font-bold text-[13px] text-[#e3ddce] group-hover:text-[#d4af37] transition-colors">{reference}</h4>
                            <p className="font-sans text-xs text-[#a39a8c] italic line-clamp-2 mt-0.5">{text || 'Read full passage'}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#5c5448] group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* 2. KEY THEMES PILLS */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold font-sans text-[#8a7b66] uppercase tracking-wider">
                    Key Themes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(currentChapter.themes || ["Context Study", "Gospel Faith", "Devotional Class"]).map((theme, i) => (
                      <span
                        key={i}
                        className="bg-[#242220] border border-[#3b3834] text-[#a39a8c] py-1.5 px-3 rounded text-xs font-sans font-medium hover:border-[#8a7b66]/40 hover:text-[#e3ddce] transition-colors"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. DISCUSSION QUESTIONS */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-sans text-[#8a7b66] uppercase tracking-wider">
                    <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" /> Discussion Questions
                  </div>
                  <ol className="space-y-3">
                    {currentChapter.discussionQuestions.map((q, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="w-4.5 h-4.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 flex items-center justify-center text-[9px] font-bold mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="font-sans text-xs text-[#b5aa9d] leading-relaxed">{q}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* 4. MY NOTES WORKPAD */}
                <div className="space-y-2 border-t border-[#302c28] pt-4">
                  <div className="flex items-center justify-between text-xs font-bold font-sans text-[#8a7b66] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">📝 My Notes</span>
                    <span className="text-[9px] font-mono font-medium text-[#5a5042]">{notes.length}/1000</span>
                  </div>
                  <textarea
                    aria-label="Study notes for current chapter"
                    placeholder="Write your study notes here..."
                    value={notes}
                    onChange={handleNotesChange}
                    className="w-full h-32 bg-[#1c1917] border border-[#302a24] rounded-sm p-3 text-xs leading-relaxed text-[#b5aa9d] placeholder-[#4f4639] focus:outline-none focus:border-[#d4af37]/45 focus:ring-1 focus:ring-[#d4af37]/10 resize-none font-sans scrollbar-thin"
                  />
                  <div className="text-[9px] text-[#8a7b66] italic text-right">Notes are auto-saved locally</div>
                </div>

              </div>

            </motion.section>

          </motion.div>
        )}

        {/* BOOK SHELF LIBRARY VIEW TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'library' && (
            <motion.div
              key="library-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center py-6">
                <h2 className="font-serif text-3xl font-extrabold tracking-wider uppercase mb-2">
                  <span className="shimmer-text">The Gilded Library Book Shelf</span>
                </h2>
                <p className="font-sans text-sm text-[#8a7b66] max-w-lg mx-auto italic">Browse and launch the context guidelines of all classic works, cataloged sequentially.</p>
                <FlourishDivider className="w-44 h-8" />
              </div>

              {/* Archival Progress Chart */}
              <LibraryProgressChart books={books} exploredChapters={exploredChapters} />

              {/* Shelf grid listing */}
              <motion.div
                variants={containerStagger}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {books.map((book) => {
                  const bookCover = getBookCoverStyles(book.id);
                  const exploredCount = book.chapters.filter(c => exploredChapters[c.id]).length;
                  const progressVal = Math.round((exploredCount / book.chapters.length) * 100) || 0;

                  return (
                    <motion.div
                      key={book.id}
                      variants={riseItem}
                      whileHover={{ y: -6 }}
                      onClick={() => {
                        setSelectedBookId(book.id);
                        if (book.chapters.length > 0) {
                          setSelectedChapterId(book.chapters[0].id);
                        }
                        setActiveTab('study');
                      }}
                      className="group cursor-pointer panel-glass hover:border-[#8a7b66] p-5 transition-all relative overflow-hidden flex gap-4 hover:shadow-[0_10px_40px_rgba(212,175,55,0.10)]"
                    >
                      <CornerAccents />

                      {/* Realistic cover design with 3D tilt */}
                      <div className={`${bookCover.bg} tilt-card w-24 h-36 border ${bookCover.accent} rounded-sm shadow-2xl flex-shrink-0 relative overflow-hidden flex flex-col justify-between p-3.5`}>
                        <div className="absolute inset-0 bg-noise opacity-15" />
                        <div className={`absolute inset-0 bg-gradient-to-b ${bookCover.spine} opacity-95`} />
                        <div className="absolute inset-0.5 border border-[#d4af37]/20 pointer-events-none" />

                        {/* Spine sheen that catches light on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700" />

                        <div className="relative z-10 text-center my-auto flex flex-col items-center justify-center h-full">
                          <span className="font-serif text-[8.5px] font-bold block leading-tight uppercase tracking-wider text-center">{book.title}</span>
                          <div className="w-6 h-[1.5px] bg-[#d4af37]/40 mx-auto my-1.5" />
                          <span className="font-sans text-[6px] italic text-[#a39a8c]/80 block">E.G. White</span>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#e3ddce] group-hover:text-[#d4af37] transition-colors leading-tight">{book.title}</h3>
                          <p className="font-sans text-[10px] text-[#8a7b66] italic mt-0.5">by Ellen G. White</p>
                          <p className="font-sans text-xs text-[#a39a8c] mt-2 line-clamp-3 leading-relaxed">{book.description}</p>
                        </div>

                        <div className="pt-3 space-y-1">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-[#8a7b66]">{exploredCount} of {book.chapters.length} explored</span>
                            <span className="text-[#d4af37]">{progressVal}%</span>
                          </div>
                          <div className="w-full bg-[#1e1c1a] h-1.5 rounded-full overflow-hidden border border-[#2b251f]">
                            <motion.div
                              className="bg-gradient-to-r from-[#8a7b66] via-[#d4af37] to-[#8a7b66] h-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${progressVal}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STUDY NOTES LOG TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'notes' && (
            <motion.div
              key="notes-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="text-center py-6">
                <h2 className="font-serif text-3xl font-extrabold tracking-wider uppercase mb-2">
                  <span className="shimmer-text">Central Study Notes Log</span>
                </h2>
                <p className="font-sans text-sm text-[#8a7b66] max-w-lg mx-auto italic">Review and search all of your written study reflections across the entire spirit of prophecy guides.</p>
                <FlourishDivider className="w-44 h-8" />
              </div>

              {/* List of all notes in storage */}
              <div className="space-y-4 max-w-4xl mx-auto">
                {books.map((book) => {
                  const bookNotes = book.chapters.map(ch => {
                    const key = `${book.id}-${ch.id}`;
                    const noteContent = savedNotes[key];
                    return noteContent ? { chapter: ch, content: noteContent } : null;
                  }).filter(Boolean) as { chapter: typeof book.chapters[number]; content: string }[];

                  if (bookNotes.length === 0) return null;

                  return (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#141211]/90 backdrop-blur-sm border border-[#2c2926] rounded p-6 shadow-xl space-y-4"
                    >
                      <h3 className="font-serif text-lg font-bold text-[#d4af37] border-b border-[#302c28] pb-1.5">{book.title} Notes</h3>

                      <div className="space-y-4">
                        {bookNotes.map((item, idx) => (
                          <div key={idx} className="bg-[#1c1917] border border-[#2c2621] p-4 rounded-sm">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-serif font-bold text-sm text-[#e3ddce]">{item.chapter.title}</h4>
                              <span className="text-[10px] bg-[#d4af37]/15 text-[#d4af37] px-2.5 py-0.5 rounded-sm font-sans uppercase tracking-widest font-semibold">{item.chapter.theme}</span>
                            </div>
                            <p className="font-sans text-xs text-[#b5aa9d] leading-relaxed whitespace-pre-wrap italic">&ldquo;{item.content}&rdquo;</p>
                            <div className="flex justify-end gap-3.5 mt-3">
                              <button
                                onClick={() => openChapterOnDesk(book.id, item.chapter.id)}
                                className="text-[10px] text-[#8a7b66] hover:text-[#d4af37] font-semibold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
                              >
                                Go to Study Page
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {Object.keys(savedNotes).filter(k => savedNotes[k]).length === 0 && (
                  <div className="p-12 text-center bg-[#141211] border border-[#2c2926] rounded">
                    <Book className="w-12 h-12 text-[#5c5448] mx-auto mb-3" />
                    <h4 className="font-serif text-lg text-[#e3ddce]">No Study Notes Logged Yet</h4>
                    <p className="font-sans text-xs text-[#8a7b66] mt-1 max-w-sm mx-auto">Open the Study Desk on any chapter, type your personal reflection notes in the right-sidebar panel, and they will populate here dynamically.</p>
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* CULTURAL HISTORY DETAILED ARCHIVE TAB */}
        <AnimatePresence mode="wait">
          {activeTab === 'cultural' && (
            <motion.div
              key="cultural-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <CulturalHistory />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* CONTENT STANDARDS DISCLAIMER */}
      <div className="relative z-30 border-t border-[#1a1817] bg-[#141312] px-6 py-4">
        <p className="max-w-4xl mx-auto text-[11px] leading-relaxed text-[#8a7b66] text-center">
          <strong className="text-[#b5aa9d]">Independent study companion.</strong> This app is not
          affiliated with or endorsed by the Ellen G. White Estate or the Seventh-day Adventist
          Church. All commentary — historical context, argument summaries, applications, and
          quizzes — is companion material, not inspired writing, and has not yet undergone formal
          theological review. Quotations are individually labeled by verification status; always
          read Ellen White&rsquo;s own words at{' '}
          <a href="https://egwwritings.org" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline">egwwritings.org</a>{' '}
          and verify sources before teaching or citing.
        </p>
      </div>

      {/* FIXED FOOTER CONTROL BAR */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-40 border-t border-[#1a1817] bg-[#121110]/90 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 shadow-[0_-8px_30px_rgba(0,0,0,0.45)]"
      >
        <div>
          <p className="text-xs text-[#8a7b66] font-medium tracking-wide">
            Currently studying: <strong className="text-[#e3ddce] font-serif">{currentBook.title} &bull; {currentChapter?.title || 'Select a chapter'}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="bg-[#1c1917] hover:bg-[#201e1c] text-[#e3ddce] border border-[#3b3834] py-2 px-6 rounded-xs text-xs font-semibold tracking-wider transition-all hover:-translate-y-0.5 hover:border-[#d4af37]/40 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
            Copy Summary
          </button>

          <button
            onClick={handleExportNotes}
            className="bg-[#1c1917] hover:bg-[#201e1c] text-[#e3ddce] border border-[#3b3834] py-2 px-6 rounded-xs text-xs font-semibold tracking-wider transition-all hover:-translate-y-0.5 hover:border-[#d4af37]/40 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            Export Notes
          </button>

          <button
            onClick={() => {
              if (activeTab !== 'study') setActiveTab('study');
              if (chapterPageOpen) setChapterPageOpen(false);
              setShowQuiz(true);
              setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }, 120);
              showToast('Chapter quiz opened on Study Desk.');
            }}
            className="bg-[#2a241e] hover:bg-[#342c24] text-[#d4af37] border border-[#d4af37]/35 py-2 px-6 rounded-xs text-xs font-semibold tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Take Chapter Quiz
          </button>
        </div>
      </motion.footer>

    </div>
  );
}

/* ---------- Small presentational helpers (local to this file) ---------- */

function ParchmentCard({
  children,
  delay = 0,
  variant = 'solid',
}: {
  children: ReactNode;
  delay?: number;
  variant?: 'solid' | 'soft';
}) {
  const tone =
    variant === 'soft'
      ? 'bg-[#faf8ef]/50 border-[#ded5be]/60'
      : 'bg-[#faf8ef]/70 border-[#ded5be]/70 shadow-sm';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`${tone} border rounded-sm p-5 md:p-6 flex items-start gap-5`}
    >
      {children}
    </motion.div>
  );
}

function EmptyParchmentNote({ text }: { text: string }) {
  return (
    <div className="p-8 text-center bg-[#faf8ef]/30 border border-[#ded5be]/40 rounded-xs italic text-xs text-[#7a6d59] font-sans">
      {text}
    </div>
  );
}
