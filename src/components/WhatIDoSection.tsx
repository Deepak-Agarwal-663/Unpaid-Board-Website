import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {useEffect, useRef, useState} from 'react';
import {WORK_ITEMS, type WorkItem} from '../data/siteContent';
import {ImageWipeReveal, LineReveal, ResilientImage} from './Reveal';

function WorkCardSkeleton({animate}: {animate: boolean}) {
  const pulse = animate ? 'animate-pulse' : '';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none col-start-1 row-start-1 flex h-full flex-col overflow-hidden rounded-[28px] bg-[#FBF8F2]"
    >
      <div className={`h-[240px] w-full shrink-0 bg-[#EAE3D5] sm:h-[280px] lg:h-[340px] ${pulse}`} />
      <div className="flex flex-1 flex-col justify-between gap-5 p-6 md:p-8">
        <div>
          <div className={`h-4 w-8 rounded bg-[#3E5A6B]/20 ${pulse}`} />
          <div className={`mt-3 h-9 w-3/4 rounded-md bg-[#1C2226]/12 ${pulse}`} />
        </div>
        <div className="space-y-3 border-t border-[#1C2226]/12 pt-4">
          <div className={`h-4 w-full rounded bg-[#1C2226]/10 ${pulse}`} />
          <div className={`h-4 w-5/6 rounded bg-[#1C2226]/10 ${pulse}`} />
          <div className={`h-4 w-11/12 rounded bg-[#1C2226]/10 ${pulse}`} />
        </div>
      </div>
    </div>
  );
}

function WorkCard({
  item,
  isReady,
  prefersReducedMotion,
  className = '',
}: {
  item: WorkItem;
  isReady: boolean;
  prefersReducedMotion: boolean;
  className?: string;
}) {
  const [imageReady, setImageReady] = useState(prefersReducedMotion);
  const showCard = prefersReducedMotion || (isReady && imageReady);

  return (
    <article
      className={`grid grid-cols-1 grid-rows-1 overflow-hidden rounded-[28px] border border-[#1C2226]/12 bg-[#FBF8F2] ${
        prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
      } ${className}`}
    >
      <motion.div
        initial={false}
        animate={{opacity: showCard ? 1 : 0}}
        transition={
          prefersReducedMotion
            ? {duration: 0}
            : {duration: 0.3, ease: [0.16, 1, 0.3, 1]}
        }
        className="col-start-1 row-start-1 flex flex-col"
      >
        <ImageWipeReveal className="h-[240px] w-full shrink-0 overflow-hidden sm:h-[280px] lg:h-[340px]">
          <ResilientImage
            src={item.image}
            alt={item.imageAlt}
            fallbackLabel={item.number}
            onLoadComplete={() => setImageReady(true)}
            className="h-full w-full object-cover"
          />
        </ImageWipeReveal>

        <div className="flex flex-1 flex-col justify-between gap-5 p-6 md:p-8">
          <div>
            <span className="tabular-nums text-[15px] font-medium text-[#3E5A6B]">
              {item.number}
            </span>
            <h3 className="font-serif-display mt-2 text-[clamp(1.875rem,1.6rem+1.1vw,2.5rem)] leading-[1.0] text-[#1C2226]">
              {item.title}
            </h3>
          </div>

          <div className="space-y-3 border-t border-[#1C2226]/12 pt-4 text-[17px] leading-[1.55] text-[#1C2226]/85 md:text-[18px]">
            <p className="max-w-[62ch]">
              <span className="font-semibold text-[#1C2226]">Today: </span>
              {item.today}
            </p>
            <p className="max-w-[62ch]">
              <span className="font-semibold text-[#1C2226]">With MoneyBack Board: </span>
              {item.withBoard}
            </p>
          </div>
        </div>
      </motion.div>

      {!prefersReducedMotion && (
        <motion.div
          initial={false}
          animate={{opacity: showCard ? 0 : 1}}
          transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
          className="pointer-events-none col-start-1 row-start-1"
        >
          <WorkCardSkeleton animate={!showCard} />
        </motion.div>
      )}
    </article>
  );
}

export function WhatIDoSection() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [isReady, setIsReady] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsReady(true);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      const paddingRight = window.innerWidth >= 1024 ? 40 : 20;
      const shift = Math.max(0, trackWidth - viewportWidth + paddingRight);
      setMaxShift(shift);
    };

    measure();
    window.addEventListener('resize', measure, {passive: true});
    return () => window.removeEventListener('resize', measure);
  }, [prefersReducedMotion, isReady]);

  const {scrollYProgress} = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -maxShift]);

  return (
    <section id="what-i-do" className="bg-[#F6F1E7] py-16 lg:py-0">
      {/* Mobile / Reduced Motion layout */}
      <div className={prefersReducedMotion ? 'block lg:py-[120px]' : 'block lg:hidden'}>
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <LineReveal>
            <p className="text-[15px] font-medium text-[#3E5A6B]">What I do</p>
          </LineReveal>
          <LineReveal delay={0.06}>
            <h2 className="font-serif-display text-balance mt-3 text-[clamp(2.75rem,2.02rem+3.1vw,4.5rem)] leading-[1.0] text-[#1C2226]">
              One short form, one board, built for your store
            </h2>
          </LineReveal>
        </div>

        {prefersReducedMotion ? (
          <div className="mx-auto mt-10 flex max-w-[1320px] flex-col gap-8 px-5 md:px-10">
            {WORK_ITEMS.map((item) => (
              <WorkCard
                key={item.number}
                item={item}
                isReady={isReady}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        ) : (
          <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {WORK_ITEMS.map((item) => (
              <WorkCard
                key={item.number}
                item={item}
                isReady={isReady}
                prefersReducedMotion={prefersReducedMotion}
                className="w-[86vw] shrink-0 snap-center"
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop pinned horizontal scroll layout (when reduced motion is off) */}
      {!prefersReducedMotion && (
        <div ref={wrapperRef} className="hidden lg:block lg:h-[260vh]">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-[120px]">
            <div ref={viewportRef} className="mx-auto w-full max-w-[1320px] px-10">
              <div className="mb-10">
                <LineReveal>
                  <p className="text-[15px] font-medium text-[#3E5A6B]">What I do</p>
                </LineReveal>
                <LineReveal delay={0.06}>
                  <h2 className="font-serif-display text-balance mt-2 text-[clamp(2.75rem,2.02rem+3.1vw,4.5rem)] leading-[1.0] text-[#1C2226]">
                    One short form, one board, built for your store
                  </h2>
                </LineReveal>
              </div>

              <motion.div
                ref={trackRef}
                style={{x}}
                className="flex items-stretch gap-8 will-change-[transform,opacity]"
              >
                {WORK_ITEMS.map((item) => (
                  <WorkCard
                    key={item.number}
                    item={item}
                    isReady={isReady}
                    prefersReducedMotion={prefersReducedMotion}
                    className="w-[68vw] max-w-[900px] shrink-0"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
