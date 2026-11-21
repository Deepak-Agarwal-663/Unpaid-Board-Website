import {useEffect, useState} from 'react';
import {SITE} from '../data/siteContent';
import {MagneticButton} from './MagneticButton';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onInk, setOnInk] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const updateNavState = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const probeY = 38;
      const inkSections = document.querySelectorAll<HTMLElement>('[data-theme="ink"]');
      let overInk = false;

      inkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          overInk = true;
        }
      });

      setOnInk(overInk);
    };

    const handleScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateNavState);
    };

    updateNavState();
    window.addEventListener('scroll', handleScrollOrResize, {passive: true});
    window.addEventListener('resize', handleScrollOrResize, {passive: true});

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  const headerThemeClass = onInk
    ? 'bg-[#1C2226] text-[#F6F1E7] border-b border-[#F6F1E7]/12'
    : scrolled
      ? 'bg-[#F6F1E7] text-[#1C2226] border-b border-[#1C2226]/12'
      : 'bg-transparent text-[#1C2226] border-b border-transparent';

  const linkHoverClass = onInk
    ? 'hover:text-[#F6F1E7] text-[#F6F1E7]/80 decoration-[#F6F1E7]/60'
    : 'hover:text-[#1C2226] text-[#1C2226]/80 decoration-[#1C2226]/50';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${headerThemeClass}`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-3.5 md:gap-8 md:px-10 md:py-4">
        <a
          href="#"
          aria-label={SITE.businessName}
          className={`inline-flex items-center shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E08A1E] ${
            onInk ? 'rounded-xl bg-[#F6F1E7] px-2.5 py-1' : ''
          }`}
        >
          <img
            src="/logo.png"
            alt={SITE.businessName}
            referrerPolicy="no-referrer"
            className="h-7 w-auto object-contain md:h-8"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-[15px] font-medium"
        >
          <a
            href="#what-i-do"
            className={`whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:underline ${linkHoverClass}`}
          >
            What I do
          </a>
          <a
            href="#how-we-start"
            className={`whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:underline ${linkHoverClass}`}
          >
            How it works
          </a>
          <a
            href="#about"
            className={`whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:underline ${linkHoverClass}`}
          >
            About
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <MagneticButton
            href={SITE.bookingUrl}
            className="px-4 py-2 text-[14px] md:px-5 md:py-2.5"
          >
            Book a call
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
