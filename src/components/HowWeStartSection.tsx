import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {useRef} from 'react';
import {SITE, START_STEPS} from '../data/siteContent';
import {LineReveal} from './Reveal';

export function HowWeStartSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const {scrollYProgress} = useScroll({
    target: listRef,
    offset: ['start 0.72', 'end 0.55'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-we-start"
      className="border-t border-[#1C2226]/12 bg-[#F6F1E7] py-16 lg:py-[120px]"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <LineReveal>
            <p className="text-[15px] font-medium text-[#3E5A6B]">How it works</p>
          </LineReveal>
          <LineReveal delay={0.06}>
            <h2 className="font-serif-display text-balance mt-3 text-[clamp(2.75rem,2.02rem+3.1vw,4.5rem)] leading-[1.0] text-[#1C2226]">
              How we start
            </h2>
          </LineReveal>
        </div>

        <div ref={listRef} className="relative pl-8 sm:pl-10 lg:col-span-7">
          {/* Background vertical hairline */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-0 w-[2px] bg-[#1C2226]/12"
          />

          {/* Scroll-filled Saffron Marigold vertical line */}
          <motion.div
            aria-hidden="true"
            style={
              prefersReducedMotion
                ? {scaleY: 1, originY: 0}
                : {scaleY: lineScaleY, originY: 0}
            }
            className={`absolute top-2 bottom-2 left-0 w-[2px] bg-[#E08A1E] ${
              prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
            }`}
          />

          <ol className="space-y-12 md:space-y-16">
            {START_STEPS.map((step, idx) => (
              <li key={step.number} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[37px] h-3 w-3 rounded-full border-2 border-[#E08A1E] bg-[#F6F1E7] sm:-left-[45px]"
                />
                <span className="tabular-nums text-[15px] font-medium text-[#3E5A6B]">
                  {step.number}
                </span>
                <h3 className="font-serif-display mt-2 text-[clamp(1.875rem,1.6rem+1.1vw,2.5rem)] leading-[1.0] text-[#1C2226]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[60ch] text-[18px] leading-[1.6] text-[#1C2226]/85">
                  {step.description}
                </p>

                {idx === START_STEPS.length - 1 && (
                  <p className="mt-5 inline-block border-t border-[#1C2226]/12 pt-4 text-[18px] font-semibold text-[#1C2226]">
                    {SITE.price}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
