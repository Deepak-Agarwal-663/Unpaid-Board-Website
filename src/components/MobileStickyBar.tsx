import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {useEffect, useState} from 'react';
import {SITE} from '../data/siteContent';

interface MobileStickyBarProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export function MobileStickyBar({heroRef}: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {threshold: 0.05}
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? false : {y: '100%', opacity: 0}}
          animate={{y: '0%', opacity: 1}}
          exit={prefersReducedMotion ? undefined : {y: '100%', opacity: 0}}
          transition={
            prefersReducedMotion
              ? {duration: 0}
              : {duration: 0.22, ease: [0.16, 1, 0.3, 1]}
          }
          className={`fixed right-0 bottom-0 left-0 z-30 border-t border-[#1C2226]/12 bg-[#F6F1E7] px-5 py-2.5 md:hidden ${
            prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
          }`}
        >
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#E08A1E] px-5 py-2.5 text-[15px] font-medium text-[#1C2226] whitespace-nowrap transition-colors hover:bg-[#d17e18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A1E]"
          >
            Book a 20-minute call
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
