import {SITE} from '../data/siteContent';
import {FilmGrain} from './FilmGrain';
import {MagneticButton} from './MagneticButton';
import {LineReveal} from './Reveal';

export function FinalInvitation() {
  return (
    <section
      data-theme="ink"
      className="relative overflow-hidden bg-[#1C2226] py-16 text-[#F6F1E7] lg:py-[140px]"
    >
      <FilmGrain />
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 md:px-10">
        <LineReveal>
          <h2 className="font-serif-display text-balance max-w-[16ch] text-[clamp(2.75rem,1.875rem+3.75vw,5.25rem)] leading-[1.0] tracking-[-0.015em]">
            Let&apos;s give your evenings{' '}
            <em className="italic text-[#E08A1E]">back</em>
          </h2>
        </LineReveal>

        <LineReveal delay={0.08}>
          <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.6] text-[#F6F1E7]/80">
            Every unpaid order, tracked on one board before you close for the night.
          </p>
        </LineReveal>

        <div className="mt-9 flex flex-col items-start gap-5">
          <MagneticButton
            href={SITE.bookingUrl}
            className="px-8 py-4 text-[16px]"
          >
            Book a 20-minute call
          </MagneticButton>

          <a
            href={`mailto:${SITE.email}`}
            className="text-[16px] font-medium text-[#F6F1E7]/85 underline decoration-[#F6F1E7]/35 underline-offset-4 transition-colors hover:text-[#F6F1E7] hover:decoration-[#F6F1E7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A1E]"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
