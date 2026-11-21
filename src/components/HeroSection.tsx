import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {useRef} from 'react';
import {SITE} from '../data/siteContent';
import {MagneticButton} from './MagneticButton';
import {ImageWipeReveal, LineReveal, ResilientImage} from './Reveal';

interface HeroSectionProps {
  heroRef?: React.RefObject<HTMLElement | null>;
}

export function HeroSection({heroRef}: HeroSectionProps) {
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = heroRef ?? internalRef;
  const prefersReducedMotion = useReducedMotion();

  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const archY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F6F1E7] pt-24 pb-16 md:pt-32 lg:pt-36 lg:pb-[120px]"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-12">
        {/* Arch Portrait: sits above words on phone, right column on laptop */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <motion.div
            style={prefersReducedMotion ? undefined : {y: archY}}
            className={`relative mx-auto max-w-[420px] lg:max-w-none ${
              prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
            }`}
          >
            <ImageWipeReveal delay={0.05}>
              <div className="overflow-hidden rounded-t-full rounded-b-none border border-[#1C2226]/12 bg-[#EAE3D5] aspect-[4/5]">
                <ResilientImage
                  src="/me.jpg"
                  alt={`${SITE.founderName}, founder of ${SITE.businessName}`}
                  fallbackLabel="DA"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </ImageWipeReveal>

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[270px] lg:-left-6 lg:bottom-6 rounded-[20px] border border-[#1C2226]/12 bg-[#F6F1E7] px-5 py-3.5">
              <p className="text-[14px] font-medium leading-[1.4] text-[#1C2226]">
                {SITE.founderName}, founder of {SITE.businessName}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copy & Booking: sits below arch on phone, left column on laptop */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          <LineReveal>
            <p className="mb-5 text-[15px] font-medium text-[#1C2226]/80 md:text-[16px]">
              For{' '}
              <span
                className="border-b border-dashed border-[#1C2226]/45 pb-0.5 text-[#3E5A6B]"
                title="Placeholder for your target store type"
              >
                {SITE.whoIHelpPlaceholder}
              </span>{' '}
              in {SITE.city}
            </p>
          </LineReveal>

          <LineReveal delay={0.08}>
            <h1 className="font-serif-display text-balance text-[clamp(2.75rem,1.825rem+3.95vw,5.375rem)] leading-[1.0] tracking-[-0.015em] text-[#1C2226]">
              {SITE.promiseBeforeAccent}{' '}
              <em className="italic text-[#E08A1E]">{SITE.promiseAccentWord}</em>{' '}
              {SITE.promiseAfterAccent}
            </h1>
          </LineReveal>

          <LineReveal delay={0.14}>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-[#1C2226]/85 md:mt-7">
              {SITE.whatISetUpLead}
            </p>
          </LineReveal>

          <LineReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-5 md:mt-10">
              <MagneticButton
                href={SITE.bookingUrl}
                className="px-7 py-3.5 text-[16px]"
              >
                Book a 20-minute call
              </MagneticButton>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[16px] font-medium text-[#1C2226] underline decoration-[#1C2226]/35 underline-offset-4 transition-colors hover:decoration-[#1C2226] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A1E]"
              >
                Email me
              </a>
            </div>
          </LineReveal>
        </div>
      </div>
    </section>
  );
}
