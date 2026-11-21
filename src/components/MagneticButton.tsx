import {motion, useMotionValue, useReducedMotion, useSpring} from 'motion/react';
import {type ReactNode, useRef} from 'react';

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  href,
  children,
  className = '',
  external = true,
  ariaLabel,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, {stiffness: 260, damping: 20, mass: 0.4});
  const springY = useSpring(rawY, {stiffness: 260, damping: 20, mass: 0.4});

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rawX.set(offsetX * 0.16);
    rawY.set(offsetY * 0.22);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? undefined : {x: springX, y: springY}}
      whileTap={prefersReducedMotion ? undefined : {scale: 0.97}}
      className={`inline-flex items-center justify-center rounded-full bg-[#E08A1E] text-[#1C2226] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#d17e18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E08A1E] ${
        prefersReducedMotion ? '' : 'will-change-[transform,opacity]'
      } ${className}`}
    >
      {children}
    </motion.a>
  );
}
