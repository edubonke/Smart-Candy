import { useLayoutEffect, useRef, useState } from 'react';

interface SmartCandyLogoProps {
  variant?: 'light-bg' | 'dark-bg';
  className?: string;
}

/**
 * Faithful vector wordmark honoring Smart Candy's signature identity:
 * - Graceful dark-slate/white "Smart" script
 * - Multi-spectrum sweeping crescent "C" (amber -> berry crimson -> cyan -> navy)
 * - Deep Smart Candy Navy (#012C6D) "andy" lettering
 */
export function SmartCandyLogo({ variant = 'light-bg', className = 'h-10 w-auto' }: SmartCandyLogoProps) {
  const smartFill = variant === 'dark-bg' ? '#FFFFFF' : '#3E434D';
  const andyFill = variant === 'dark-bg' ? '#FFFFFF' : '#012C6D';
  const smartText = useRef<SVGTextElement>(null);
  const [candyOffset, setCandyOffset] = useState(26);

  useLayoutEffect(() => {
    const measure = () => {
      const bounds = smartText.current?.getBBox();
      if (bounds && bounds.width > 0) {
        // The first coloured dot begins at x=94.6; keep an 8-unit clear gap.
        setCandyOffset(Math.max(0, bounds.x + bounds.width + 8 - 94.6));
      }
    };
    measure();
    void document.fonts?.ready.then(measure);
  }, []);

  return (
    <svg
      viewBox="0 0 248 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Smart Candy"
    >
      <defs>
        <linearGradient id="sc-rainbow-c" x1="100" y1="8" x2="132" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="34%" stopColor="#E10B49" />
          <stop offset="70%" stopColor="#00AEEF" />
          <stop offset="100%" stopColor="#012C6D" />
        </linearGradient>
      </defs>

      {/* "Smart" — flowing calligraphic display */}
      <text
        ref={smartText}
        x="2"
        y="42"
        fill={smartFill}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="34"
        letterSpacing="-0.8"
      >
        Smart
      </text>

      {/* Offset the complete Candy wordmark so the crescent clears the italic t. */}
      <g transform={`translate(${candyOffset} 0)`}>
      <path
        d="M137 13.5C129.8 8.4 119.5 8 110.8 13.2C100.8 19.2 96.5 31.2 101.2 41.8C105.6 51.8 117.5 55.8 128.2 52.2C132.4 50.8 135.8 48.6 138.4 45.8"
        stroke="url(#sc-rainbow-c)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="123" cy="7.2" r="1.6" fill="#F5A623" />
      <circle cx="108.5" cy="9.5" r="1.3" fill="#E10B49" />
      <circle cx="96" cy="21" r="1.4" fill="#00AEEF" />

      {/* "andy" — Smart Candy Royal Navy nestled cleanly inside the C */}
      <text
        x="129"
        y="42"
        fill={andyFill}
        fontFamily="Outfit, 'Plus Jakarta Sans', sans-serif"
        fontWeight="700"
        fontSize="33"
        letterSpacing="-0.8"
      >
        andy
      </text>
      </g>
    </svg>
  );
}
