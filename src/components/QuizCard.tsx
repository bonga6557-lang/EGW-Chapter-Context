import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, BrainCircuit, ChevronRight, ChevronLeft, Trophy } from 'lucide-react';
import { CornerAccents } from './Ornaments';
import { scoreQuiz } from '../utils/quizScore';
import { track } from '../utils/analytics';

interface QuizCardProps {
  questions: QuizQuestion[];
}

export function QuizCard({ questions }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [trackedComplete, setTrackedComplete] = useState(false);

  const current = questions[currentIndex];
  const isAnswered = selectedOptionId !== null;
  const selectedOption = current?.options.find(o => o.id === selectedOptionId);
  const isComplete = currentIndex === questions.length - 1 && isAnswered;
  const score = scoreQuiz(questions, answers);

  useEffect(() => {
    if (isComplete && !trackedComplete) {
      setTrackedComplete(true);
      track('quiz_taken', `${score}-of-${questions.length}`);
    }
  }, [isComplete, trackedComplete, score, questions.length]);

  const handleSelect = (id: string) => {
    if (!isAnswered && current) {
      setSelectedOptionId(id);
      setAnswers(prev => ({ ...prev, [current.id]: id }));
    }
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
      setSelectedOptionId(answers[questions[currentIndex + 1].id] ?? null);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
      setSelectedOptionId(answers[questions[currentIndex - 1].id] ?? null);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOptionId(null);
    setDirection(1);
  };

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center border border-[#3b3834] rounded-sm bg-[#1a1918]">
        <BrainCircuit className="w-8 h-8 text-[#5c5448] mx-auto mb-3" aria-hidden="true" />
        <p className="font-sans text-sm text-[#8a7b66]">No quiz questions for this chapter yet.</p>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#3b3834] pb-3">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-5 h-5 text-[#d4af37]" />
          <h2 className="font-sans font-semibold text-[#8a7b66] text-sm uppercase tracking-widest">
            Knowledge Check
          </h2>
        </div>
        <span className="font-mono text-xs text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-sm border border-[#d4af37]/25">
          {String(currentIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
        </span>
      </div>

      <div className="flex gap-1">
        {questions.map((q, i) => {
          const pick = answers[q.id];
          const done = !!pick;
          const correct = done && q.options.find(o => o.id === pick)?.isCorrect;
          return (
            <div
              key={q.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i === currentIndex
                  ? 'bg-[#d4af37]'
                  : done
                    ? correct
                      ? 'bg-[#5b7a4f]'
                      : 'bg-[#a85757]'
                    : 'bg-[#3b3834]'
              }`}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {isComplete ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1a1918]/95 backdrop-blur-sm border border-[#d4af37]/35 shadow-xl rounded-sm p-8 md:p-10 relative overflow-hidden text-center"
          >
            <CornerAccents />
            <Trophy className="w-14 h-14 text-[#d4af37] mx-auto mb-4" />
            <h3 className="font-serif text-3xl text-[#e3ddce] mb-2">Assessment Complete</h3>
            <p className="font-sans text-[#b5aa9d] mb-6">
              You answered <strong className="text-[#d4af37]">{score}</strong> of{' '}
              <strong className="text-[#e3ddce]">{questions.length}</strong> correctly.
            </p>
            <button
              onClick={resetAll}
              className="text-[#e3ddce] bg-[#242220] border border-[#d4af37]/40 hover:border-[#d4af37] hover:text-[#d4af37] font-semibold tracking-widest uppercase text-xs transition-colors py-3 px-8 rounded-sm"
            >
              Retake Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1a1918]/95 backdrop-blur-sm border border-[#3b3834] shadow-lg rounded-sm p-6 md:p-8 relative overflow-hidden"
          >
            <CornerAccents />
            <div className="absolute top-4 right-4 font-mono text-[10px] text-[#5c5448] uppercase tracking-widest">
              Card {currentIndex + 1}
            </div>

            <p className="font-serif text-xl md:text-2xl text-[#e3ddce] mb-8 font-medium leading-relaxed pr-8">
              {current.question}
            </p>

            <div className="space-y-3">
              {current.options.map((option, optIdx) => {
                const isSelected = selectedOptionId === option.id;
                let btnClass =
                  'w-full text-left p-4 md:p-5 rounded-sm border transition-all font-sans focus:outline-none focus:ring-1 focus:ring-[#8a7b66] ';

                if (!isAnswered) {
                  btnClass +=
                    'bg-[#242220] border-[#3b3834] text-[#b5aa9d] hover:border-[#d4af37]/50 hover:bg-[#1c1c1c] cursor-pointer shadow-sm text-base md:text-lg';
                } else if (option.isCorrect) {
                  btnClass += 'bg-[#1c2918] border-[#35472e] text-[#c0d6ba] shadow-md text-base md:text-lg';
                } else if (isSelected) {
                  btnClass += 'bg-[#331818] border-[#5e3131] text-[#d6b4b4] text-base md:text-lg';
                } else {
                  btnClass += 'bg-[#242220] border-[#3b3834] text-[#736c63] opacity-50 text-base md:text-lg';
                }

                return (
                  <motion.button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleSelect(option.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: optIdx * 0.05 }}
                    whileHover={!isAnswered ? { x: 4 } : undefined}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{option.text}</span>
                      {isAnswered && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-[#5b7a4f] flex-shrink-0" />
                      )}
                      {isAnswered && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-[#a85757] flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {isAnswered && selectedOption && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden mt-6"
                >
                  <div
                    className={`p-5 rounded-sm border ${
                      selectedOption.isCorrect
                        ? 'bg-[#1c2918] border-[#35472e]'
                        : 'bg-[#331818] border-[#5e3131]'
                    }`}
                  >
                    <h4
                      className={`font-semibold tracking-wide uppercase text-xs mb-2 ${
                        selectedOption.isCorrect ? 'text-[#c0d6ba]' : 'text-[#d6b4b4]'
                      }`}
                    >
                      {selectedOption.isCorrect ? 'Correct' : 'Incorrect'}
                    </h4>
                    <p
                      className={`font-serif text-base italic ${
                        selectedOption.isCorrect ? 'text-[#85a378]' : 'text-[#b87676]'
                      }`}
                    >
                      {selectedOption.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!isComplete && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-xs uppercase tracking-widest text-[#8a7b66] hover:text-[#d4af37] disabled:opacity-30 disabled:pointer-events-none transition-colors py-2 px-3"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={goNext}
            disabled={!isAnswered}
            className="flex items-center gap-1 text-xs uppercase tracking-widest bg-[#242220] border border-[#d4af37]/40 text-[#d4af37] hover:border-[#d4af37] disabled:opacity-30 disabled:pointer-events-none transition-colors py-2.5 px-5 rounded-sm font-semibold"
          >
            {currentIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
