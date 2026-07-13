import React from 'react';
import {
  BookOpen, Clock, Lightbulb, Map, MessagesSquare, AlertTriangle,
  BookMarked, GraduationCap, BookText,
} from 'lucide-react';
import { ChapterContextType, HistoricalSource, ScholarlyReference } from '../types';
import { splitVerseEntry, bibleGatewayUrl } from './bibleLink';
import { resolveHistoricalVerification, resolveScholarlyVerification, egwWritingsUrl } from './sourceVerification';
import { SourceVerification, SourceVerificationNotice } from '../components/SourceVerification';
import { QuizCard } from '../components/QuizCard';
import { AntiqueBorderFrame, IlluminatedLetter } from '../components/Ornaments';

export type GuidedStep = { id: string; label: string; content: React.ReactNode };

const CONTEXT_CHARS = 850;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function splitTextPages(text: string, maxChars = CONTEXT_CHARS): string[] {
  if (!text || text.length <= maxChars) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [text];
  const pages: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence.trim()}` : sentence.trim();
    if (next.length > maxChars && current) {
      pages.push(current.trim());
      current = sentence.trim();
    } else {
      current = next;
    }
  }
  if (current.trim()) pages.push(current.trim());
  return pages.length ? pages : [text];
}

function shortLabel(text: string, max = 26): string {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function HistoricalSourceBlock({
  source,
  index,
  total,
  showNotice,
}: {
  source: HistoricalSource;
  index: number;
  total: number;
  showNotice: boolean;
}) {
  const v = resolveHistoricalVerification(source);
  return (
    <section className="bg-[#1a1918] border border-[#3b3834] p-6 md:p-8 rounded-sm">
      <h2 className="font-sans text-[#8a7b66] text-sm uppercase tracking-widest mb-4 border-b border-[#3b3834] pb-3 font-semibold flex items-center">
        <GraduationCap className="w-5 h-5 mr-3 text-[#d4af37]" />
        Historical Source {index + 1} of {total}
      </h2>
      {showNotice && <SourceVerificationNotice />}
      <div className="bg-[#242220] rounded-sm p-6 border border-[#3b3834] shadow-sm mt-2">
        <h4 className="font-serif text-[#e3ddce] text-xl mb-1">{source.title}</h4>
        <p className="font-sans text-sm text-[#a39a8c] mb-5 font-semibold tracking-wide uppercase">
          {source.author} &bull; {source.publication}
        </p>
        <blockquote className="border-l-2 border-[#d4af37] pl-5 text-[#b5aa9d] font-serif italic text-lg leading-relaxed">
          &ldquo;{source.quote}&rdquo;
        </blockquote>
        <SourceVerification quoteType={v.quoteType} sourceUrl={v.sourceUrl} verifyNote={v.verifyNote} />
        {source.relevance && (
          <p className="font-sans text-[15px] text-[#b5aa9d] bg-[#1a1918] p-4 rounded-sm border border-[#3b3834] mt-5">
            <span className="font-semibold text-[#8a7b66] block mb-2 uppercase tracking-widest text-xs">Connection to This Chapter:</span>
            {source.relevance}
          </p>
        )}
      </div>
    </section>
  );
}

function ScholarlyRefBlock({
  ref,
  index,
  total,
  showNotice,
}: {
  ref: ScholarlyReference;
  index: number;
  total: number;
  showNotice: boolean;
}) {
  const v = resolveScholarlyVerification(ref);
  return (
    <section className="bg-[#1a1918] border border-[#3b3834] p-6 md:p-8 rounded-sm">
      <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest mb-4 border-b border-[#3b3834] pb-3 flex items-center">
        <GraduationCap className="w-5 h-5 mr-3" />
        Scholarly Reference {index + 1} of {total}
      </h2>
      {showNotice && <SourceVerificationNotice />}
      <div className="bg-[#242220] rounded-sm p-6 border border-[#3b3834] shadow-sm mt-2">
        <h4 className="font-serif font-medium text-[#e3ddce] text-xl mb-1">{ref.title} ({ref.year})</h4>
        <p className="font-sans text-sm text-[#8a7b66] mb-5 font-medium tracking-widest uppercase">{ref.author} &bull; {ref.source}</p>
        <blockquote className="border-l-2 border-[#d4af37] pl-5 mb-2 text-[#b5aa9d] font-serif italic text-lg leading-relaxed">&ldquo;{ref.directQuote}&rdquo;</blockquote>
        <SourceVerification quoteType={v.quoteType} sourceUrl={v.sourceUrl} verifyNote={v.verifyNote} />
        <p className="font-sans text-[15px] text-[#b5aa9d] bg-[#1a1918] p-4 rounded-sm border border-[#3b3834] mt-5">
          <span className="font-semibold text-[#8a7b66] block mb-2 uppercase tracking-widest text-xs">Relevance to Historical Context:</span>
          {ref.relevance}
        </p>
      </div>
    </section>
  );
}

export function buildGuidedSteps(chapter: ChapterContextType): GuidedStep[] {
  const steps: GuidedStep[] = [];

  steps.push({
    id: 'bigIdea',
    label: 'Big Idea',
    content: (
      <AntiqueBorderFrame>
        <div className="flex items-center mb-4">
          <Lightbulb className="w-5 h-5 text-[#d4af37] mr-3" />
          <h2 className="font-sans text-sm text-[#d4af37] uppercase tracking-widest font-semibold">The Big Idea</h2>
        </div>
        <p className="font-serif text-2xl md:text-3xl text-[#e3ddce] leading-relaxed font-medium">{chapter.bigIdea}</p>
      </AntiqueBorderFrame>
    ),
  });

  const contextPages = splitTextPages(chapter.historicalContext);
  contextPages.forEach((page, i) => {
    const isFirst = i === 0;
    steps.push({
      id: `historicalContext-${i}`,
      label: contextPages.length > 1 ? `Context ${i + 1}/${contextPages.length}` : 'Historical Context',
      content: (
        <section>
          <div className="flex items-center mb-5 border-b border-[#3b3834] pb-3">
            <Clock className="w-5 h-5 text-[#8a7b66] mr-3" />
            <h2 className="font-sans text-[#8a7b66] text-sm uppercase tracking-widest font-semibold">
              Historical Context{contextPages.length > 1 ? ` (${i + 1} of ${contextPages.length})` : ''}
            </h2>
          </div>
          <div className="font-sans text-[#b5aa9d] leading-relaxed text-lg text-justify">
            {isFirst && page.length > 0 ? (
              <>
                <IlluminatedLetter letter={page.charAt(0)} />
                <span>{page.slice(1)}</span>
              </>
            ) : (
              page
            )}
          </div>
        </section>
      ),
    });
  });

  chapter.historicalSources.forEach((source, idx) => {
    steps.push({
      id: `historicalSource-${idx}`,
      label: `Source: ${shortLabel(source.author)}`,
      content: (
        <HistoricalSourceBlock
          source={source}
          index={idx}
          total={chapter.historicalSources.length}
          showNotice={idx === 0}
        />
      ),
    });
  });

  chapter.egwQuotes.forEach((q, idx) => {
    steps.push({
      id: `egwQuote-${idx}`,
      label: `EGW Quote ${idx + 1}`,
      content: (
        <section className="bg-[#141414] border border-[#3b3834] p-6 md:p-8 shadow-sm rounded-sm">
          <div className="flex items-center mb-6 border-b border-[#3b3834] pb-3">
            <BookOpen className="w-5 h-5 text-[#8a7b66] mr-3" />
            <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">
              Ellen G. White ({idx + 1} of {chapter.egwQuotes.length})
            </h2>
          </div>
          <div className="bg-[#1c1c1c] border border-[#2e2c29] rounded p-6 shadow-inner">
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
        </section>
      ),
    });
  });

  chapter.scholarlyReferences.forEach((ref, idx) => {
    steps.push({
      id: `scholarlyRef-${idx}`,
      label: `Scholar: ${shortLabel(ref.author)}`,
      content: (
        <ScholarlyRefBlock
          ref={ref}
          index={idx}
          total={chapter.scholarlyReferences.length}
          showNotice={idx === 0}
        />
      ),
    });
  });

  chunk(chapter.bibleFoundation, 3).forEach((verses, i, groups) => {
    steps.push({
      id: `bibleFoundation-${i}`,
      label: groups.length > 1 ? `Bible ${i + 1}/${groups.length}` : 'Bible Foundation',
      content: (
        <section>
          <div className="flex items-center mb-5 border-b border-[#3b3834] pb-3">
            <BookOpen className="w-5 h-5 text-[#8a7b66] mr-3" />
            <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">
              Bible Foundation{groups.length > 1 ? ` (${i + 1} of ${groups.length})` : ''}
            </h2>
          </div>
          <ul className="space-y-5 pt-2">
            {verses.map((verse, idx) => {
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
    });
  });

  chapter.argumentFlow.forEach((flow, idx) => {
    steps.push({
      id: `argumentFlow-${idx}`,
      label: shortLabel(flow.title, 22),
      content: (
        <section className="bg-[#242220] border border-[#3b3834] p-6 md:p-8 rounded-sm">
          <div className="flex items-center mb-6 border-b border-[#3b3834] pb-3">
            <Map className="w-5 h-5 text-[#8a7b66] mr-3" />
            <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">
              Argument {idx + 1} of {chapter.argumentFlow.length}
            </h2>
          </div>
          <div className="relative border-l-2 border-[#59544c] ml-3 pl-8">
            <div className="absolute w-3 h-3 bg-[#1c1c1c] border-2 border-[#d4af37] rounded-full -left-[27px] top-1.5" />
            <h3 className="font-serif font-semibold text-[#e3ddce] text-xl mb-2">{flow.title}</h3>
            <p className="font-sans text-[#b5aa9d] text-lg leading-relaxed">{flow.description}</p>
          </div>
        </section>
      ),
    });
  });

  chunk(chapter.hardPhrases, 2).forEach((phrases, i, groups) => {
    if (!phrases.length) return;
    steps.push({
      id: `hardPhrases-${i}`,
      label: groups.length > 1 ? `Phrases ${i + 1}/${groups.length}` : 'Hard Phrases',
      content: (
        <section>
          <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest mb-5 border-b border-[#3b3834] pb-3">
            Hard Phrases Explained{groups.length > 1 ? ` (${i + 1} of ${groups.length})` : ''}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 pt-2">
            {phrases.map((item, idx) => (
              <div key={idx} className="bg-[#242220] border border-[#3b3834] rounded-sm p-6 shadow-sm">
                <span className="font-serif font-medium text-[#e3ddce] block mb-4 px-3 py-1.5 bg-[#1a1918] border border-[#3b3834] rounded-sm w-fit text-lg">&ldquo;{item.phrase}&rdquo;</span>
                <p className="font-sans text-[#b5aa9d] leading-relaxed text-lg">{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>
      ),
    });
  });

  steps.push({
    id: 'commonMisunderstanding',
    label: 'Misunderstanding',
    content: (
      <section className="bg-[#1a1918] border border-[#3b3834] p-6 md:p-8 rounded-sm border-l-4 border-l-[#a13a3a] shadow-sm">
        <div className="flex items-center mb-5">
          <AlertTriangle className="w-5 h-5 text-[#a13a3a] mr-3" />
          <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">Common Misunderstanding</h2>
        </div>
        <p className="font-sans text-[#e3ddce] leading-relaxed font-medium text-lg">{chapter.commonMisunderstanding}</p>
      </section>
    ),
  });

  steps.push({
    id: 'modernApplication',
    label: 'Application',
    content: (
      <section>
        <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest mb-5 border-b border-[#3b3834] pb-3">Modern Application</h2>
        <p className="font-sans text-[#b5aa9d] leading-relaxed bg-[#242220] border border-[#3b3834] p-8 rounded-sm text-lg shadow-sm">{chapter.modernApplication}</p>
      </section>
    ),
  });

  chunk(chapter.discussionQuestions, 2).forEach((questions, i, groups) => {
    steps.push({
      id: `discussionQuestions-${i}`,
      label: groups.length > 1 ? `Discuss ${i + 1}/${groups.length}` : 'Discussion',
      content: (
        <section>
          <div className="flex items-center mb-5 border-b border-[#3b3834] pb-3">
            <MessagesSquare className="w-5 h-5 text-[#8a7b66] mr-3" />
            <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">
              Discussion Questions{groups.length > 1 ? ` (${i + 1} of ${groups.length})` : ''}
            </h2>
          </div>
          <ul className="space-y-4 list-decimal list-inside pt-2">
            {questions.map((q, idx) => (
              <li key={idx} className="font-sans text-[#e3ddce] leading-relaxed pl-4 bg-[#242220] border border-[#3b3834] rounded-sm p-6 shadow-sm text-lg">
                <span className="ml-2">{q}</span>
              </li>
            ))}
          </ul>
        </section>
      ),
    });
  });

  if (chapter.quiz.length > 0) {
    steps.push({
      id: 'quiz',
      label: 'Knowledge Check',
      content: <QuizCard questions={chapter.quiz} />,
    });
  }

  return steps;
}
