import {type MotionValue, motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {useRef} from 'react';
import {FilmGrain} from './FilmGrain';

const PROBLEM_WORDS =
  'When the shop closes and orders are still waiting on payment, the notes stay buried in your messages and nobody has one clear list of what is owed.'.split(
    ' '
  );

interface ProblemWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ProblemWord({word, index, total, progress}: ProblemWordProps) {
  const start = index / total;
  const end = Math.min((index + 1.4) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);

  return (
    <motion.span
      style={{opacity}}
      className="mr-[0.26em] inline-block will-change-[transform,opacity]"
    >
      {word}
    </motion.span>
  );
}

export function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start 0.78', 'end 0.45'],
  });

  return (
    <section
      ref={containerRef}
      data-theme="ink"
      className="relative overflow-hidden bg-[#1C2226] py-16 text-[#F6F1E7] lg:py-[140px]"
    >
      <FilmGrain />
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-10">
        <p className="font-serif-display max-w-[26ch] text-[clamp(2.25rem,1.45rem+3.4vw,4.25rem)] leading-[1.04] tracking-[-0.01em]">
          {prefersReducedMotion
            ? PROBLEM_WORDS.join(' ')
            : PROBLEM_WORDS.map((word, idx) => (
                <ProblemWord
                  key={`${word}-${idx}`}
                  word={word}
                  index={idx}
                  total={PROBLEM_WORDS.length}
                  progress={scrollYProgress}
                />
              ))}
        </p>
      </div>
    </section>
  );
}
