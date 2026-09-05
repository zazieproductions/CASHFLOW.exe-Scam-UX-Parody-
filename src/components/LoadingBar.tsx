import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingBarProps {
  label: string;
  duration?: number;
  onComplete?: () => void;
  cursed?: boolean;
  color?: string;
}

export default function LoadingBar({ label, duration = 3, onComplete, cursed = false, color }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [displayLabel, setDisplayLabel] = useState(label);

  useEffect(() => {
    const startTime = Date.now();
    const totalMs = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let pct = Math.min((elapsed / totalMs) * 100, 100);

      if (cursed && pct > 70 && pct < 95) {
        pct = pct - Math.random() * 10;
      }

      setProgress(pct);

      if (cursed && Math.random() < 0.05) {
        const glitchLabels = ['ERR0R', 'H̷E̷L̷P̷', 'WATCHING', '???', label];
        setDisplayLabel(glitchLabels[Math.floor(Math.random() * glitchLabels.length)]);
        setTimeout(() => setDisplayLabel(label), 200);
      }

      if (elapsed >= totalMs) {
        setProgress(100);
        clearInterval(interval);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete, cursed, label]);

  const barColor = color || (cursed ? 'bg-crimson' : 'bg-neon');
  const glowColor = cursed ? 'shadow-[0_0_10px_rgba(255,23,68,0.5)]' : 'shadow-[0_0_10px_rgba(57,255,20,0.5)]';

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className={`text-xs font-[var(--font-mono)] uppercase tracking-wider ${cursed ? 'text-crimson' : 'text-neon/70'}`}>
          {displayLabel}
        </span>
        <span className={`text-xs font-[var(--font-mono)] ${cursed ? 'text-crimson' : 'text-neon/70'}`}>
          {progress.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 bg-deep rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor} ${glowColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}
