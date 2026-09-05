import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const normalTestimonials = [
  { name: 'Jake R.', text: 'I made $50,000 in just 3 days! This is INSANE! 🤑', avatar: '😎', stars: 5 },
  { name: 'Maria S.', text: 'Quit my job after the first week. Best decision ever!!!', avatar: '💃', stars: 5 },
  { name: 'Tom W.', text: 'My wife thought I was crazy until she saw the balance 💰', avatar: '🤠', stars: 5 },
  { name: 'Lisa K.', text: 'From broke to buying a Lambo in 2 weeks flat!!!', avatar: '👩', stars: 5 },
  { name: 'Dave M.', text: 'The algorithm is REAL. I can\'t believe this is legal.', avatar: '🧔', stars: 5 },
];

const cursedTestimonials = [
  { name: '████████', text: 'I can\'t stop. The numbers keep going up. I haven\'t slept in 6 days. The green light won\'t let me close my eyes.', avatar: '😶', stars: 5 },
  { name: 'former user', text: 'please do not continue past level 4. i am writing this from a library computer. they took everything.', avatar: '💀', stars: 1 },
  { name: 'SATISFIED', text: 'THE MACHINE IS GENEROUS. THE MACHINE PROVIDES. I HAVE GIVEN MY NAME AND RECEIVED NUMBERS IN RETURN. FAIR TRADE.', avatar: '🔴', stars: 5 },
  { name: 'nobody', text: 'it knows your real name. it knew before you typed it. check behind you.', avatar: '👁️', stars: 3 },
  { name: 'test_user_0', text: 'If you\'re reading this, you\'re already part of the pattern. The tasks aren\'t random. Look at the first letter of each one.', avatar: '⚠️', stars: 4 },
  { name: 'Anna? Anna.', text: 'I completed all the tasks. I am happy now. I am so happy. I have never been this happy. Please believe me. I am happy.', avatar: '😊', stars: 5 },
];

export default function Testimonials({ cursedLevel = 0 }: { cursedLevel?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = cursedLevel > 2
    ? [...normalTestimonials, ...cursedTestimonials]
    : normalTestimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visible = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {visible.map((t, i) => {
        const isCursed = cursedTestimonials.includes(t);
        return (
          <motion.div
            key={`${currentIndex}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-xl ${
              isCursed
                ? 'bg-crimson/5 border border-crimson/20'
                : 'bg-surface/50 border border-neon/10'
            }`}
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.stars }).map((_, si) => (
                <Star key={si} size={14} className={isCursed ? 'text-crimson fill-crimson' : 'text-gold fill-gold'} />
              ))}
            </div>
            <Quote size={16} className="text-text-dim mb-2" />
            <p className={`text-sm mb-4 ${isCursed ? 'text-crimson/80 font-[var(--font-mono)]' : 'text-text/80'}`}>
              {t.text}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{t.avatar}</span>
              <span className={`text-xs font-semibold ${isCursed ? 'text-crimson/60' : 'text-text-dim'}`}>
                {t.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
