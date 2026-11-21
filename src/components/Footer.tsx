import {SITE} from '../data/siteContent';
import {FilmGrain} from './FilmGrain';

export function Footer() {
  return (
    <footer
      data-theme="ink"
      className="relative overflow-hidden border-t border-[#F6F1E7]/12 bg-[#14181B] pt-12 pb-24 text-[#F6F1E7] md:py-14"
    >
      <FilmGrain />
      <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="#"
            aria-label={SITE.businessName}
            className="inline-flex items-center rounded-xl bg-[#F6F1E7] px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A1E]"
          >
            <img
              src="/logo.png"
              alt={SITE.businessName}
              referrerPolicy="no-referrer"
              className="h-7 w-auto object-contain"
            />
          </a>
          <span className="text-[15px] text-[#F6F1E7]/75">{SITE.city}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[15px] text-[#F6F1E7]/85">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#F6F1E7]/35 underline-offset-4 transition-colors hover:text-[#F6F1E7] hover:decoration-[#F6F1E7]"
          >
            Book a 20-minute call
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="underline decoration-[#F6F1E7]/35 underline-offset-4 transition-colors hover:text-[#F6F1E7] hover:decoration-[#F6F1E7]"
          >
            {SITE.email}
          </a>
        </div>

        <p className="text-[14px] text-[#F6F1E7]/65">
          &copy; {SITE.year} {SITE.businessName}
        </p>
      </div>
    </footer>
  );
}
