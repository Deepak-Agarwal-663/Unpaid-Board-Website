import {SITE} from '../data/siteContent';
import {MagneticButton} from './MagneticButton';
import {LineReveal, ResilientImage} from './Reveal';

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-[#1C2226]/12 bg-[#F6F1E7] py-16 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[900px] px-5 md:px-10">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#1C2226]/12 bg-[#EAE3D5]">
            <ResilientImage
              src="/me.jpg"
              alt={SITE.founderName}
              fallbackLabel="DA"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <p className="text-[15px] font-medium text-[#3E5A6B]">
            {SITE.founderName} · {SITE.city}
          </p>
        </div>

        <LineReveal delay={0.05}>
          <h2 className="font-serif-display text-balance mt-7 text-[clamp(2.75rem,2.02rem+3.1vw,4.5rem)] leading-[1.0] text-[#1C2226]">
            A note from {SITE.founderName}
          </h2>
        </LineReveal>

        <div className="mt-8 space-y-5 text-[20px] leading-[1.65] text-[#1C2226]/90 md:text-[22px]">
          <p className="max-w-[60ch]">
            I run {SITE.businessName} here in {SITE.city}, working directly with store
            owners who want every unpaid order tracked in one place instead of scattered
            across notebooks and messages.
          </p>
          <p className="max-w-[60ch]">
            I set up one short form that flags big unpaid orders the same day, and one
            board that shows the money still owed, then keep it working for your team.
          </p>
        </div>

        <p className="font-signature mt-8 text-[42px] leading-none text-[#1C2226]">
          {SITE.founderFirstName}
        </p>

        <div className="mt-8">
          <MagneticButton
            href={SITE.bookingUrl}
            className="px-7 py-3.5 text-[16px]"
          >
            Book a 20-minute call with {SITE.founderFirstName}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
