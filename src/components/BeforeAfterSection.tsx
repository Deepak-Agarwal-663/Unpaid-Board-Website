import {motion, useReducedMotion} from 'motion/react';
import {useState} from 'react';
import {WITH_LINES, WITHOUT_LINES} from '../data/siteContent';
import {LineReveal} from './Reveal';

type Mode = 'without' | 'with';

export function BeforeAfterSection() {
  const [mode, setMode] = useState<Mode>('without');
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? {duration: 0}
    : {duration: 0.25, ease: [0.16, 1, 0.3, 1] as const};

  return (
    <section className="border-t border-[#1C2226]/12 bg-[#F6F1E7] py-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <LineReveal>
              <p className="text-[15px] font-medium text-[#3E5A6B]">Your evening</p>
            </LineReveal>
            <LineReveal delay={0.06}>
              <h2 className="font-serif-display text-balance mt-3 text-[clamp(2.75rem,2.02rem+3.1vw,4.5rem)] leading-[1.0] text-[#1C2226]">
                Before and after
              </h2>
            </LineReveal>
          </div>

          <div
            role="group"
            aria-label="Compare evenings without and with MoneyBack Board"
            className="inline-flex w-fit flex-wrap items-center gap-1 rounded-full border border-[#1C2226]/12 bg-[#ECE6D8] p-1.5"
          >
            <button
              type="button"
              onClick={() => setMode('without')}
              aria-pressed={mode === 'without'}
              className={`min-h-[44px] cursor-pointer rounded-full px-5 py-2 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A1E] ${
                mode === 'without'
                  ? 'bg-[#E08A1E] text-[#1C2226]'
                  : 'text-[#1C2226]/75 hover:text-[#1C2226]'
              }`}
            >
              Without MoneyBack Board
            </button>
            <button
              type="button"
              onClick={() => setMode('with')}
              aria-pressed={mode === 'with'}
              className={`min-h-[44px] cursor-pointer rounded-full px-5 py-2 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A1E] ${
                mode === 'with'
                  ? 'bg-[#E08A1E] text-[#1C2226]'
                  : 'text-[#1C2226]/75 hover:text-[#1C2226]'
              }`}
            >
              With MoneyBack Board
            </button>
          </div>
        </div>

        {/* Stacked crossfade grid so one list fades out while the other fades in with zero empty moment */}
        <div className="mt-10 grid grid-cols-1 grid-rows-1 md:mt-14">
          <motion.ul
            aria-hidden={mode !== 'without'}
            initial={false}
            animate={{
              opacity: mode === 'without' ? 1 : 0,
              y: mode === 'without' || prefersReducedMotion ? 0 : 8,
            }}
            transition={transition}
            className={`col-start-1 row-start-1 divide-y divide-[#1C2226]/12 border-t border-b border-[#1C2226]/12 ${
              prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
            } ${
              mode === 'without' ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {WITHOUT_LINES.map((line, index) => (
              <li
                key={`without-${index}`}
                className="py-6 text-[18px] leading-[1.6] text-[#1C2226]/85 md:py-7 md:text-[20px]"
              >
                <p className="max-w-[66ch]">{line}</p>
              </li>
            ))}
          </motion.ul>

          <motion.ul
            aria-hidden={mode !== 'with'}
            initial={false}
            animate={{
              opacity: mode === 'with' ? 1 : 0,
              y: mode === 'with' || prefersReducedMotion ? 0 : 8,
            }}
            transition={transition}
            className={`col-start-1 row-start-1 divide-y divide-[#1C2226]/12 border-t border-b border-[#1C2226]/12 ${
              prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
            } ${
              mode === 'with' ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {WITH_LINES.map((line, index) => (
              <li
                key={`with-${index}`}
                className="py-6 text-[18px] leading-[1.6] text-[#1C2226] md:py-7 md:text-[20px]"
              >
                <p className="max-w-[66ch]">{line}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
