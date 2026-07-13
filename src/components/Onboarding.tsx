import { motion } from 'motion/react';
import { BookOpen, ShieldCheck, Compass } from 'lucide-react';

interface OnboardingProps {
  onStart: () => void;
}

export function Onboarding({ onStart }: OnboardingProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-[#0a0908]/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-md w-full border border-[#ded5be]/50 bg-[#f3eedb] text-[#24221f] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-7 sm:p-9"
      >
        <div className="absolute inset-3 border border-[#d4af37]/20 pointer-events-none rounded-sm" />

        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8a7b66] mb-3">
          Welcome
        </p>
        <h2 id="onboarding-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#2b251e] leading-tight mb-5">
          EGW Chapter Context
        </h2>

        <ul className="space-y-4 mb-7">
          <li className="flex gap-3 items-start">
            <BookOpen className="w-5 h-5 text-[#18392b] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-sans text-sm text-[#4a4235] leading-relaxed">
              <strong className="text-[#2b251e]">A context companion</strong> — not the book text itself.
              Open egwwritings.org for Ellen White&rsquo;s words; use this desk for history, argument maps, and study helps.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-[#18392b] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-sans text-sm text-[#4a4235] leading-relaxed">
              <strong className="text-[#2b251e]">Verified scholarship layer</strong> — every quote is labeled
              (verbatim / paraphrase / summary) with a source you can check.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <Compass className="w-5 h-5 text-[#18392b] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="font-sans text-sm text-[#4a4235] leading-relaxed">
              <strong className="text-[#2b251e]">v1 coverage:</strong> The Great Controversy and Steps to Christ,
              complete. Other titles are preview chapters labeled Coming Soon.
            </p>
          </li>
        </ul>

        <button
          type="button"
          onClick={onStart}
          className="w-full min-h-[44px] px-5 py-3 bg-[#18392b] text-[#f2edd9] border border-[#d4af37]/45 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#1f4a38] transition-colors"
        >
          Start guided reading
        </button>
      </motion.div>
    </div>
  );
}
