import React from 'react';

interface SignalBarsProps {
  count?: number;
  heightLevel?: number; // 1 to 5 index for donation level, or animated
  className?: string;
  isAnimated?: boolean;
}

export const SignalBars: React.FC<SignalBarsProps> = ({
  count = 9,
  heightLevel = 3,
  className = '',
  isAnimated = false
}) => {
  // Generate bar heights based on count and level
  const bars = Array.from({ length: count }, (_, i) => {
    // Math logic for rising curve or animated pattern
    const factor = (i + 1) / count;
    const basePct = Math.min(100, Math.max(15, factor * 85 * (heightLevel / 3)));
    return basePct;
  });

  return (
    <div className={`flex items-end gap-1.5 h-12 ${className}`}>
      {bars.map((heightPct, idx) => {
        const animDelay = `${(idx * 0.1).toFixed(1)}s`;
        return (
          <div
            key={idx}
            style={{
              height: `${heightPct}%`,
              animationDelay: animDelay
            }}
            className={`w-1.5 bg-[#E39B2C] rounded-[1px] transition-all duration-300 ${
              isAnimated ? 'animate-pulse' : ''
            }`}
          />
        );
      })}
    </div>
  );
};
