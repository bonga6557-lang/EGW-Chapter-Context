import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { QuoteAccuracy, QUOTE_TYPE_LABELS } from '../utils/sourceVerification';

const BADGE_STYLES: Record<QuoteAccuracy, string> = {
  verbatim: 'bg-[#1c2918] text-[#85a378] border-[#35472e]',
  paraphrase: 'bg-[#2b241e] text-[#d4af37] border-[#d4af37]/35',
  summary: 'bg-[#2a2218] text-[#c9a227] border-[#8a7b66]/40',
  unverified: 'bg-[#242220] text-[#a39a8c] border-[#3b3834]',
};

interface SourceVerificationProps {
  quoteType: QuoteAccuracy;
  sourceUrl?: string;
  verifyNote: string;
  variant?: 'dark' | 'parchment';
}

export function SourceVerification({ quoteType, sourceUrl, verifyNote, variant = 'dark' }: SourceVerificationProps) {
  const isParchment = variant === 'parchment';

  return (
    <div
      className={`mt-4 rounded-sm border p-3 space-y-2 ${
        isParchment ? 'bg-[#f0ebda]/70 border-[#ded5be]' : 'bg-[#1a1918] border-[#3b3834]'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${BADGE_STYLES[quoteType]}`}
        >
          <ShieldCheck className="w-3 h-3" />
          {QUOTE_TYPE_LABELS[quoteType]}
        </span>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border transition-colors ${
              isParchment
                ? 'bg-[#18392b] text-[#f2edd9] border-[#18392b]/80 hover:border-[#d4af37]'
                : 'bg-[#242220] text-[#d4af37] border-[#d4af37]/30 hover:border-[#d4af37]'
            }`}
          >
            Verify at source
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
      <p className={`text-xs leading-relaxed ${isParchment ? 'text-[#6e5d48]' : 'text-[#8a7b66]'}`}>
        {verifyNote}
      </p>
    </div>
  );
}

export function SourceVerificationNotice({ variant = 'dark' }: { variant?: 'dark' | 'parchment' }) {
  const isParchment = variant === 'parchment';
  return (
    <p
      className={`text-xs leading-relaxed mb-4 ${
        isParchment ? 'text-[#7a6d59] bg-[#f0ebda]/50 border border-[#ded5be] p-3 rounded-sm' : 'text-[#8a7b66] bg-[#1a1918] border border-[#3b3834] p-3 rounded-sm'
      }`}
    >
      Entries are labeled <strong className={isParchment ? 'text-[#4a4235]' : 'text-[#b5aa9d]'}>Verbatim</strong>,{' '}
      <strong className={isParchment ? 'text-[#4a4235]' : 'text-[#b5aa9d]'}>Paraphrase</strong>,{' '}
      <strong className={isParchment ? 'text-[#4a4235]' : 'text-[#b5aa9d]'}>Summary</strong>, or{' '}
      <strong className={isParchment ? 'text-[#4a4235]' : 'text-[#b5aa9d]'}>Not audited</strong>. Only Verbatim entries appear in quotation marks; anything else is companion commentary. Use{' '}
      <strong className={isParchment ? 'text-[#4a4235]' : 'text-[#d4af37]'}>Verify at source</strong> to read the original before teaching or citing.
    </p>
  );
}
