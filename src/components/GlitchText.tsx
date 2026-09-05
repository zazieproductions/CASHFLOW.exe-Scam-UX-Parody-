import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄▌▐■□▪▫●○◐◑◒◓';

export default function GlitchText({ text, className = '', intensity = 0, as: Tag = 'span' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (intensity === 0) {
      setDisplayText(text);
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() < intensity * 0.3) {
        const chars = text.split('');
        const numGlitch = Math.floor(Math.random() * intensity * 3) + 1;
        for (let i = 0; i < numGlitch; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        setDisplayText(chars.join(''));
        setTimeout(() => setDisplayText(text), 100);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [text, intensity]);

  return (
    <Tag className={className}>
      {displayText}
      {intensity > 2 && (
        <motion.span
          className="absolute inset-0 text-crimson opacity-20"
          animate={{ x: [0, -2, 2, 0], y: [0, 1, -1, 0] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          {displayText}
        </motion.span>
      )}
    </Tag>
  );
}
