import {motion, useReducedMotion} from 'motion/react';
import {type ReactNode, useEffect, useRef, useState} from 'react';
import {FilmGrain} from './FilmGrain';

interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function LineReveal({children, delay = 0, className = ''}: LineRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="will-change-[transform,opacity]"
        initial={{y: '100%', opacity: 0}}
        whileInView={{y: '0%', opacity: 1}}
        viewport={{once: true, amount: 0.2}}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ImageWipeRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ImageWipeReveal({children, delay = 0.08, className = ''}: ImageWipeRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`will-change-[transform,opacity,clip-path] ${className}`}
      initial={{clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.6}}
      whileInView={{clipPath: 'inset(0% 0% 0% 0%)', opacity: 1}}
      viewport={{once: true, amount: 0.15}}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  onLoadComplete?: () => void;
}

export function ResilientImage({
  src,
  alt,
  fallbackLabel,
  className = '',
  onLoadComplete,
}: ResilientImageProps) {
  const prefersReducedMotion = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const onLoadCompleteRef = useRef(onLoadComplete);
  onLoadCompleteRef.current = onLoadComplete;
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
      onLoadCompleteRef.current?.();
    }
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1C2226] via-[#273138] to-[#E08A1E]/85 ${className}`}
      >
        <FilmGrain />
        <span
          className="font-serif-display relative z-10 select-none text-[96px] leading-none text-transparent"
          style={{WebkitTextStroke: '1.5px rgba(246, 241, 231, 0.72)'}}
        >
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-[#EAE3D5]">
      {!loaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-[#EAE3D5] ${
            prefersReducedMotion ? '' : 'animate-pulse'
          }`}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => {
          setLoaded(true);
          onLoadComplete?.();
        }}
        onError={() => {
          setFailed(true);
          onLoadComplete?.();
        }}
        className={`${className} transition-opacity duration-300 ${
          loaded || prefersReducedMotion ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
