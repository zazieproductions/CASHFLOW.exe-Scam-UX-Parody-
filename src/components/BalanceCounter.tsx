import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BalanceCounterProps {
  cursedLevel?: number;
}

export default function BalanceCounter({ cursedLevel = 0 }: BalanceCounterProps) {
  const [balance, setBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState('0.00');
  const [pops, setPops] = useState<{ id: number; amount: string; x: number }[]>([]);
  const popId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = cursedLevel > 3
        ? Math.random() * 66666
        : cursedLevel > 1
        ? Math.random() * 999
        : Math.random() * 50 + 5;

      setBalance(prev => {
        const newBal = prev + increment;
        return newBal;
      });

      if (Math.random() > 0.4) {
        popId.current++;
        setPops(prev => [...prev.slice(-5), {
          id: popId.current,
          amount: `+$${increment.toFixed(2)}`,
          x: Math.random() * 80 + 10
        }]);
      }
    }, cursedLevel > 3 ? 50 : 200);

    return () => clearInterval(interval);
  }, [cursedLevel]);

  useEffect(() => {
    const animInterval = setInterval(() => {
      setDisplayBalance(prev => {
        const current = parseFloat(prev.replace(/,/g, ''));
        const diff = balance - current;
        const step = diff * 0.1;
        const newVal = current + step;
        return newVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      });
    }, 30);
    return () => clearInterval(animInterval);
  }, [balance]);

  const glitchStyle = cursedLevel > 4 ? 'corrupt-anim' : '';

  return (
    <div className="relative">
      <div className={`text-center ${glitchStyle}`}>
        <div className="text-sm uppercase tracking-[0.3em] text-neon/60 mb-2 font-[var(--font-display)]">
          {cursedLevel > 5 ? '⌭ ACCUMULATED DEBT ⌭' : cursedLevel > 3 ? '◬ TOTAL EXTRACTED ◬' : 'Your Balance'}
        </div>
        <div className="relative">
          <motion.div
            className="text-5xl sm:text-7xl md:text-8xl font-black font-[var(--font-display)] text-neon neon-text tabular-nums"
            animate={cursedLevel > 2 ? { scale: [1, 1.02, 1], rotate: [0, 0.5, -0.5, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ${displayBalance}
          </motion.div>
          {cursedLevel > 4 && (
            <div className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl font-black font-[var(--font-display)] text-crimson opacity-30 glitch-effect">
              ${displayBalance}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {pops.map(pop => (
          <motion.div
            key={pop.id}
            className="absolute text-gold font-bold text-lg pointer-events-none"
            style={{ left: `${pop.x}%` }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {pop.amount}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
