import {Plus} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {useState} from 'react';
import {FAQ_ITEMS} from '../data/siteContent';
import {LineReveal} from './Reveal';

export function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="border-t border-[#1C2226]/12 bg-[#F6F1E7] py-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <LineReveal>
              <p className="text-[15px] font-medium text-[#3E5A6B]">Questions</p>
            </LineReveal>
            <LineReveal delay={0.06}>
              <h2 className="font-serif-display text-balance mt-3 text-[clamp(2.75rem,2.02rem+3.1vw,4.5rem)] leading-[1.0] text-[#1C2226]">
                Plain answers
              </h2>
            </LineReveal>
          </div>

          <div className="border-t border-[#1C2226]/12 lg:col-span-8">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `faq-answer-${idx}`;
              const buttonId = `faq-question-${idx}`;

              return (
                <div
                  key={item.question}
                  className="border-b border-[#1C2226]/12"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(idx)}
                      className="flex min-h-[68px] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A1E]"
                    >
                      <span className="font-serif-display text-[clamp(1.5rem,1.4rem+0.4vw,1.75rem)] leading-[1.1] text-[#1C2226]">
                        {item.question}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        animate={{rotate: isOpen ? 45 : 0}}
                        transition={
                          prefersReducedMotion
                            ? {duration: 0}
                            : {duration: 0.2, ease: [0.16, 1, 0.3, 1]}
                        }
                        className={`flex h-8 w-8 shrink-0 items-center justify-center text-[#1C2226] ${
                          prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
                        }`}
                      >
                        <Plus className="h-5 w-5" strokeWidth={1.6} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          prefersReducedMotion
                            ? false
                            : {opacity: 0, y: -6, clipPath: 'inset(0% 0% 100% 0%)'}
                        }
                        animate={{opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)'}}
                        exit={
                          prefersReducedMotion
                            ? undefined
                            : {opacity: 0, y: -4, clipPath: 'inset(0% 0% 100% 0%)'}
                        }
                        transition={
                          prefersReducedMotion
                            ? {duration: 0}
                            : {duration: 0.25, ease: [0.16, 1, 0.3, 1]}
                        }
                        className={`pb-6 pr-10 ${
                          prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
                        }`}
                      >
                        <p className="max-w-[64ch] text-[18px] leading-[1.6] text-[#1C2226]/85">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
