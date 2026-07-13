import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChapterContextType, BookType } from '../types';
import {
  ArrowLeft, BookOpen, Clock, Lightbulb, Link as LinkIcon,
  Map, MessagesSquare, AlertTriangle, BookMarked, GraduationCap,
  ChevronRight, ChevronLeft, Layers, BookText, CheckCircle2, Trophy
} from 'lucide-react';
import { splitVerseEntry, bibleGatewayUrl } from '../utils/bibleLink';
import { resolveHistoricalVerification, resolveScholarlyVerification, egwWritingsUrl } from '../utils/sourceVerification';
import { SourceVerification, SourceVerificationNotice } from './SourceVerification';
import { QuizCard } from './QuizCard';
import { AntiqueBorderFrame, IlluminatedLetter, FlourishDivider } from './Ornaments';
import { buildGuidedSteps } from '../utils/guidedChapterSteps';

interface ChapterDetailProps {
  key?: React.Key;
  book: BookType;
  chapter: ChapterContextType;
  onBack: () => void;
  onSelectChapter?: (chapterId: string) => void;
  onGuidedComplete?: (chapterId: string) => void;
}

type ReadMode = 'all' | 'guided';

export function ChapterDetail({ book, chapter, onBack, onSelectChapter, onGuidedComplete }: ChapterDetailProps) {
  const [readMode, setReadMode] = useState<ReadMode>('guided');
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [guidedComplete, setGuidedComplete] = useState(false);

  useEffect(() => {
    setStep(0);
    setDirection(1);
    setGuidedComplete(false);
  }, [chapter.id]);

  useEffect(() => {
    setStep(0);
    setDirection(1);
    setGuidedComplete(false);
  }, [readMode]);

  const combinedSections = useMemo(
    () =>
      [
        {
          id: 'bigIdea',
          label: 'The Big Idea',
          icon: Lightbulb,
          content: (
            <AntiqueBorderFrame>
              <div className="flex items-center mb-4">
                <Lightbulb className="w-5 h-5 text-[#d4af37] mr-3" />
                <h2 className="font-sans text-sm text-[#d4af37] uppercase tracking-widest font-semibold">The Big Idea</h2>
              </div>
              <p className="font-serif text-2xl md:text-3xl text-[#e3ddce] leading-relaxed font-medium">{chapter.bigIdea}</p>
            </AntiqueBorderFrame>
          ),
        },
        {
          id: 'historicalContext',
          label: 'Historical Context',
          icon: Clock,
          content: (
            <section>
              <div className="flex items-center mb-5 border-b border-[#3b3834] pb-3">
                <Clock className="w-5 h-5 text-[#8a7b66] mr-3" />
                <h2 className="font-sans text-[#8a7b66] text-sm uppercase tracking-widest font-semibold">Historical & Background Context</h2>
              </div>
              <div className="font-sans text-[#b5aa9d] leading-relaxed text-lg text-justify">
                {chapter.historicalContext?.length > 0 ? (
                  <>
                    <IlluminatedLetter letter={chapter.historicalContext.charAt(0)} />
                    <span>{chapter.historicalContext.slice(1)}</span>
                  </>
                ) : (
                  chapter.historicalContext
                )}
              </div>
            </section>
          ),
        },
        chapter.historicalSources.length > 0 && {
          id: 'historicalSources',
          label: 'Historical Sources',
          icon: GraduationCap,
          content: (
            <section className="bg-[#1a1918] border border-[#3b3834] p-6 md:p-8 rounded-sm">
              <h2 className="font-sans text-[#8a7b66] text-sm uppercase tracking-widest mb-4 border-b border-[#3b3834] pb-3 font-semibold flex items-center">
                <GraduationCap className="w-5 h-5 mr-3 text-[#d4af37]" /> Historical Article Quotations
              </h2>
              <SourceVerificationNotice />
              <div className="space-y-6 pt-2">
                {chapter.historicalSources.map((source, idx) => {
                  const v = resolveHistoricalVerification(source);
                  return (
                  <div key={idx} className="bg-[#242220] rounded-sm p-6 border border-[#3b3834] shadow-sm">
                    <h4 className="font-serif text-[#e3ddce] text-xl mb-1">{source.title}</h4>
                    <p className="font-sans text-sm text-[#a39a8c] mb-5 font-semibold tracking-wide uppercase">
                      {source.author} &bull; {source.publication}
                    </p>
                    <blockquote className="border-l-2 border-[#d4af37] pl-5 text-[#b5aa9d] font-serif italic text-lg leading-relaxed">
                      {v.quoteType === 'verbatim' ? <>&ldquo;{source.quote}&rdquo;</> : source.quote}
                    </blockquote>
                    <SourceVerification quoteType={v.quoteType} sourceUrl={v.sourceUrl} verifyNote={v.verifyNote} />
                    {source.relevance && (
                      <p className="font-sans text-[15px] text-[#b5aa9d] bg-[#1a1918] p-4 rounded-sm border border-[#3b3834] mt-5">
                        <span className="font-semibold text-[#8a7b66] block mb-2 uppercase tracking-widest text-xs">Connection to This Chapter:</span>
                        {source.relevance}
                      </p>
                    )}
                  </div>
                  );
                })}
              </div>
            </section>
          ),
        },
        chapter.egwQuotes.length > 0 && {
          id: 'egwQuotes',
          label: 'Ellen White Quotes',
          icon: BookOpen,
          content: (
            <section className="bg-[#141414] border border-[#3b3834] p-6 md:p-8 shadow-sm rounded-sm">
              <div className="flex items-center mb-6 border-b border-[#3b3834] pb-3">
                <BookOpen className="w-5 h-5 text-[#8a7b66] mr-3" />
                <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Direct Statements from Ellen G. White</h2>
              </div>
              <div className="space-y-6 pt-2">
                {chapter.egwQuotes.map((q, idx) => (
                  <div key={idx} className="bg-[#1c1c1c] border border-[#2e2c29] rounded p-6 shadow-inner">
                    <blockquote className="text-[#e3ddce] font-serif text-xl md:text-2xl leading-relaxed mb-5 italic">&ldquo;{q.quote}&rdquo;</blockquote>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-sans text-sm text-[#8a7b66] font-semibold tracking-widest uppercase">&mdash; {q.reference}</p>
                      <a
                        href={q.sourceUrl ?? egwWritingsUrl(q.reference)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] border border-[#d4af37]/30 px-3 py-1.5 rounded-sm hover:border-[#d4af37] transition-colors"
                      >
                        Verify on EGW Writings
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ),
        },
        chapter.scholarlyReferences.length > 0 && {
          id: 'scholarlyReferences',
          label: 'Scholarly References',
          icon: GraduationCap,
          content: (
            <section className="bg-[#1a1918] border border-[#3b3834] p-6 md:p-8 rounded-sm">
              <div className="flex items-center mb-4 border-b border-[#3b3834] pb-3">
                <GraduationCap className="w-5 h-5 text-[#8a7b66] mr-3" />
                <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Scholarly References</h2>
              </div>
              <SourceVerificationNotice />
              <div className="space-y-6">
                {chapter.scholarlyReferences.map((ref, idx) => {
                  const v = resolveScholarlyVerification(ref);
                  return (
                  <div key={idx} className="bg-[#242220] rounded-sm p-6 border border-[#3b3834] shadow-sm">
                    <h4 className="font-serif font-medium text-[#e3ddce] text-xl mb-1">{ref.title} ({ref.year})</h4>
                    <p className="font-sans text-sm text-[#8a7b66] mb-5 font-medium tracking-widest uppercase">{ref.author} &bull; {ref.source}</p>
                    <blockquote className="border-l-2 border-[#d4af37] pl-5 mb-2 text-[#b5aa9d] font-serif italic text-lg leading-relaxed">{v.quoteType === 'verbatim' ? <>&ldquo;{ref.directQuote}&rdquo;</> : ref.directQuote}</blockquote>
                    <SourceVerification quoteType={v.quoteType} sourceUrl={v.sourceUrl} verifyNote={v.verifyNote} />
                    <p className="font-sans text-[15px] text-[#b5aa9d] bg-[#1a1918] p-4 rounded-sm border border-[#3b3834] mt-5">
                      <span className="font-semibold text-[#8a7b66] block mb-2 uppercase tracking-widest text-xs">Relevance to Historical Context:</span>
                      {ref.relevance}
                    </p>
                  </div>
                  );
                })}
              </div>
            </section>
          ),
        },
        {
          id: 'bibleFoundation',
          label: 'Bible Foundation',
          icon: BookMarked,
          content: (
            <section>
              <div className="flex items-center mb-5 border-b border-[#3b3834] pb-3">
                <BookOpen className="w-5 h-5 text-[#8a7b66] mr-3" />
                <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Bible Foundation</h2>
              </div>
              <ul className="space-y-5 pt-2">
                {chapter.bibleFoundation.map((verse, idx) => {
                  const { reference, text } = splitVerseEntry(verse);
                  return (
                    <li key={idx} className="border-b border-[#2e2c29] last:border-0 pb-5 last:pb-0">
                      <a
                        href={bibleGatewayUrl(reference)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col md:flex-row md:items-baseline rounded-sm p-3 -mx-3 hover:bg-[#242220] border border-transparent hover:border-[#3b3834] transition-colors"
                      >
                        <span className="font-sans font-semibold text-[#e3ddce] group-hover:text-[#d4af37] md:w-48 flex-shrink-0 mb-2 md:mb-0 tracking-wide">
                          {reference}
                        </span>
                        <span className="font-serif text-[#b5aa9d] group-hover:text-[#e3ddce] italic text-lg">{text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ),
        },
        {
          id: 'argumentFlow',
          label: 'Argument Flow',
          icon: Map,
          content: (
            <section className="bg-[#242220] border border-[#3b3834] p-6 md:p-8 rounded-sm">
              <div className="flex items-center mb-8 border-b border-[#3b3834] pb-3">
                <Map className="w-5 h-5 text-[#8a7b66] mr-3" />
                <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Argument Flow</h2>
              </div>
              <div className="relative border-l-2 border-[#59544c] ml-3 space-y-10 pb-2 pt-2">
                {chapter.argumentFlow.map((flow, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute w-3 h-3 bg-[#1c1c1c] border-2 border-[#d4af37] rounded-full -left-[27px] top-1.5" />
                    <h3 className="font-serif font-semibold text-[#e3ddce] text-xl mb-2">{flow.title}</h3>
                    <p className="font-sans text-[#b5aa9d] text-lg leading-relaxed">{flow.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ),
        },
        chapter.hardPhrases.length > 0 && {
          id: 'hardPhrases',
          label: 'Hard Phrases',
          icon: BookText,
          content: (
            <section>
              <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest mb-5 border-b border-[#3b3834] pb-3">Hard Phrases Explained</h2>
              <div className="grid gap-6 md:grid-cols-2 pt-2">
                {chapter.hardPhrases.map((item, idx) => (
                  <div key={idx} className="bg-[#242220] border border-[#3b3834] rounded-sm p-6 shadow-sm">
                    <span className="font-serif font-medium text-[#e3ddce] block mb-4 px-3 py-1.5 bg-[#1a1918] border border-[#3b3834] rounded-sm w-fit text-lg">&ldquo;{item.phrase}&rdquo;</span>
                    <p className="font-sans text-[#b5aa9d] leading-relaxed text-lg">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </section>
          ),
        },
        {
          id: 'commonMisunderstanding',
          label: 'Common Misunderstanding',
          icon: AlertTriangle,
          content: (
            <section className="bg-[#1a1918] border border-[#3b3834] p-6 md:p-8 rounded-sm border-l-4 border-l-[#a13a3a] shadow-sm">
              <div className="flex items-center mb-5">
                <AlertTriangle className="w-5 h-5 text-[#a13a3a] mr-3" />
                <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Common Misunderstanding</h2>
              </div>
              <p className="font-sans text-[#e3ddce] leading-relaxed font-medium text-lg">{chapter.commonMisunderstanding}</p>
            </section>
          ),
        },
        {
          id: 'modernApplication',
          label: 'Modern Application',
          icon: Lightbulb,
          content: (
            <section>
              <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest mb-5 border-b border-[#3b3834] pb-3">Modern Application</h2>
              <p className="font-sans text-[#b5aa9d] leading-relaxed bg-[#242220] border border-[#3b3834] p-8 rounded-sm text-lg shadow-sm">{chapter.modernApplication}</p>
            </section>
          ),
        },
        chapter.discussionQuestions.length > 0 && {
          id: 'discussionQuestions',
          label: 'Discussion Questions',
          icon: MessagesSquare,
          content: (
            <section>
              <div className="flex items-center mb-5 border-b border-[#3b3834] pb-3">
                <MessagesSquare className="w-5 h-5 text-[#8a7b66] mr-3" />
                <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Discussion Questions</h2>
              </div>
              <ul className="space-y-4 list-decimal list-inside pt-2">
                {chapter.discussionQuestions.map((q, idx) => (
                  <li key={idx} className="font-sans text-[#e3ddce] leading-relaxed pl-4 bg-[#242220] border border-[#3b3834] rounded-sm p-6 shadow-sm text-lg">
                    <span className="ml-2">{q}</span>
                  </li>
                ))}
              </ul>
            </section>
          ),
        },
        chapter.quiz.length > 0 && {
          id: 'quiz',
          label: 'Knowledge Check',
          icon: GraduationCap,
          content: <QuizCard questions={chapter.quiz} />,
        },
      ].filter(Boolean) as { id: string; label: string; icon: typeof Lightbulb; content: React.ReactNode }[],
    [chapter]
  );

  const guidedSections = useMemo(() => buildGuidedSteps(chapter), [chapter]);
  const sections = readMode === 'guided' ? guidedSections : combinedSections;

  const totalSteps = sections.length;
  const currentSection = sections[step];

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrimaryAction = () => {
    if (step < totalSteps - 1) {
      goNext();
      return;
    }
    setGuidedComplete(true);
    onGuidedComplete?.(chapter.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const chapterIndex = book.chapters.findIndex(c => c.id === chapter.id);
  const nextChapter = chapterIndex >= 0 ? book.chapters[chapterIndex + 1] : undefined;

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[60vh] bg-[#0e0e0d] py-4 md:py-6 px-2 md:px-4 pb-16 rounded-sm border border-[#2e2a26]"
    >
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-[#8a7b66] hover:text-[#d4af37] transition-colors mb-8 font-sans text-sm font-medium group uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to {book.title}
        </button>

        <header className="mb-8 border-b border-[#3b3834] pb-6">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#8a7b66] mb-2">{book.title}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#f0ebe1] mb-4 leading-tight">{chapter.title}</h1>
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <a
              href={chapter.egwLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#e3ddce] hover:text-[#d4af37] font-sans text-sm bg-[#242220] border border-[#3b3834] px-4 py-2 rounded-sm transition-colors"
            >
              <BookMarked className="w-4 h-4 mr-2 text-[#8a7b66]" />
              Read official chapter
              <LinkIcon className="w-3 h-3 ml-2 opacity-30" />
            </a>
            <div className="flex rounded-sm border border-[#3b3834] overflow-hidden">
              <button
                type="button"
                onClick={() => setReadMode('guided')}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                  readMode === 'guided' ? 'bg-[#2b241e] text-[#d4af37]' : 'text-[#8a7b66] hover:text-[#e3ddce]'
                }`}
              >
                Guided Read
              </button>
              <button
                type="button"
                onClick={() => setReadMode('all')}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-colors border-l border-[#3b3834] ${
                  readMode === 'all' ? 'bg-[#2b241e] text-[#d4af37]' : 'text-[#8a7b66] hover:text-[#e3ddce]'
                }`}
              >
                Read All
              </button>
            </div>
          </div>
          {onSelectChapter && book.chapters.length > 1 && (
            <div className="mt-4 lg:hidden">
              <label htmlFor="guided-chapter-select" className="sr-only">Switch chapter</label>
              <select
                id="guided-chapter-select"
                value={chapter.id}
                onChange={(e) => onSelectChapter(e.target.value)}
                className="w-full bg-[#242220] border border-[#3b3834] text-[#e3ddce] text-xs rounded-sm py-2.5 px-3 font-sans focus:outline-none focus:border-[#d4af37]/60"
              >
                {book.chapters.map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.title}</option>
                ))}
              </select>
            </div>
          )}
        </header>

        {readMode === 'all' ? (
          <div className="space-y-12">
            {sections.map(s => (
              <div key={s.id}>{s.content}</div>
            ))}
            <FlourishDivider className="w-48 h-8 opacity-40 mx-auto" />
          </div>
        ) : guidedComplete ? (
          <div className="text-center py-12 px-4 border border-[#3b3834] rounded-sm bg-[#1a1918]">
            <Trophy className="w-12 h-12 text-[#d4af37] mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-serif text-2xl text-[#f0ebe1] mb-2">Guided Read Complete</h2>
            <p className="font-sans text-sm text-[#8a7b66] mb-8 max-w-md mx-auto">
              You finished all {totalSteps} sections of {chapter.title}. Return to the Study Desk for notes and quiz, or continue to the next chapter.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-[#242220] border border-[#3b3834] text-[#e3ddce] hover:border-[#d4af37]/40 px-5 py-2.5 rounded-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Back to Study Desk
              </button>
              {nextChapter && onSelectChapter && (
                <button
                  type="button"
                  onClick={() => onSelectChapter(nextChapter.id)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-[#2b241e] border border-[#d4af37]/40 text-[#d4af37] hover:border-[#d4af37] px-5 py-2.5 rounded-sm font-semibold transition-colors"
                >
                  Next Chapter <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
        {readMode === 'guided' && (
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between text-xs font-sans text-[#8a7b66]">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#d4af37]" />
                Step {step + 1} of {totalSteps}: <strong className="text-[#e3ddce]">{currentSection?.label}</strong>
              </span>
              <span className="font-mono text-[#d4af37]">{Math.round(((step + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1 bg-[#3b3834] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8a7b66] via-[#d4af37] to-[#d4af37]"
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setDirection(i > step ? 1 : -1);
                    setStep(i);
                  }}
                  className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm border transition-colors ${
                    i === step
                      ? 'border-[#d4af37]/50 text-[#d4af37] bg-[#d4af37]/10'
                      : i < step
                        ? 'border-[#35472e]/50 text-[#5b7a4f] bg-[#1c2918]/30'
                        : 'border-[#3b3834] text-[#5c5448] hover:text-[#8a7b66]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSection?.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[40vh]"
              >
                {currentSection?.content}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#3b3834]">
              <button
                onClick={goPrev}
                disabled={step === 0}
                className="flex items-center gap-1 text-xs uppercase tracking-widest text-[#8a7b66] hover:text-[#d4af37] disabled:opacity-30 disabled:pointer-events-none transition-colors py-2 px-3"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={handlePrimaryAction}
                className="flex items-center gap-1 text-xs uppercase tracking-widest bg-[#242220] border border-[#d4af37]/40 text-[#d4af37] hover:border-[#d4af37] transition-colors py-2.5 px-5 rounded-sm font-semibold"
              >
                {step === totalSteps - 1 ? 'Complete' : 'Continue'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
