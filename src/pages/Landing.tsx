import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Zap, Shield, TrendingUp, ChevronDown, Sparkles, Lock, Globe, Users } from 'lucide-react';
import BalanceCounter from '../components/BalanceCounter';
import TransactionFeed from '../components/TransactionFeed';
import Testimonials from '../components/Testimonials';
import MatrixRain from '../components/MatrixRain';

const stats = [
  { icon: Users, label: 'Active Users', value: '2,847,391', color: 'text-neon' },
  { icon: DollarSign, label: 'Total Generated', value: '$847,291,043', color: 'text-gold' },
  { icon: Globe, label: 'Countries', value: '194', color: 'text-cyan' },
  { icon: Zap, label: 'Uptime', value: '99.97%', color: 'text-purple' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [onlineCount, setOnlineCount] = useState(14832);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 20 - 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowDisclaimer(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-void relative scanline">
      <MatrixRain intensity={0.5} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-neon/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center spin-slow">
            <DollarSign size={18} className="text-neon" />
          </div>
          <span className="font-[var(--font-display)] font-bold text-neon text-lg tracking-wider">CASHFLOW<span className="text-gold">.exe</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-neon/60">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            {onlineCount.toLocaleString()} online now
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="neon-btn px-4 py-2 rounded-lg text-sm"
          >
            START NOW
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 px-4 sm:px-8 pt-16 sm:pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-semibold mb-6 uppercase tracking-wider">
              <Sparkles size={14} />
              <span>v4.2.0 — NEW ALGORITHM UNLOCKED</span>
              <Sparkles size={14} />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-[var(--font-display)] leading-[0.95] mb-6">
              <span className="text-text">FREE</span>{' '}
              <span className="text-neon neon-text">MONEY</span>
              <br />
              <span className="text-gold gold-text">GENERATOR</span>
            </h1>

            <p className="text-text-dim text-lg sm:text-xl max-w-2xl mx-auto mb-4">
              Our proprietary quantum blockchain AI algorithm generates unlimited passive income directly to your account. No skills needed. No limits.
            </p>
            <p className="text-neon/40 text-sm mb-10 font-[var(--font-mono)]">
              [ 100% AUTOMATED • ZERO RISK • INSTANT WITHDRAWAL ]
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <div className="neon-border rounded-2xl p-6 sm:p-10 bg-abyss/80 backdrop-blur-sm max-w-3xl mx-auto">
              <BalanceCounter />
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="neon-btn px-8 py-4 rounded-xl text-lg tracking-widest"
                >
                  💰 CLAIM YOUR MONEY 💰
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-dim">
                <span className="flex items-center gap-1"><Shield size={12} className="text-neon" /> SSL Secured</span>
                <span className="flex items-center gap-1"><Lock size={12} className="text-neon" /> 256-bit Encryption</span>
                <span className="flex items-center gap-1"><Zap size={12} className="text-neon" /> Instant</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neon/30"
          >
            <ChevronDown size={32} className="mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-4 sm:px-8 py-12 border-y border-neon/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl bg-surface/30 border border-neon/5"
            >
              <stat.icon size={24} className={`${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-black font-[var(--font-display)] ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-text-dim uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Feed */}
      <section className="relative z-10 px-4 sm:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black font-[var(--font-display)] text-neon mb-2">
              LIVE EARNINGS FEED
            </h2>
            <p className="text-text-dim">Watch real users generate income in real-time</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-neon/60">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              LIVE
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <TransactionFeed />
            </div>
            <div className="space-y-4">
              <div className="neon-border rounded-xl p-5 bg-abyss/50">
                <h3 className="text-gold font-[var(--font-display)] font-bold mb-3 flex items-center gap-2">
                  <TrendingUp size={18} /> TODAY'S PERFORMANCE
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Revenue Generated', value: '$12,847,291', pct: 92 },
                    { label: 'Success Rate', value: '99.7%', pct: 99.7 },
                    { label: 'Server Capacity', value: '67%', pct: 67 },
                    { label: 'Quantum Sync', value: 'ACTIVE', pct: 100 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-dim">{item.label}</span>
                        <span className="text-neon font-[var(--font-mono)]">{item.value}</span>
                      </div>
                      <div className="h-1.5 bg-deep rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-neon rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gold-border rounded-xl p-5 bg-abyss/50">
                <h3 className="text-gold font-[var(--font-display)] font-bold mb-2">🏆 TOP EARNER TODAY</h3>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🤑</div>
                  <div>
                    <div className="font-bold">CryptoKing_2024</div>
                    <div className="text-gold font-[var(--font-mono)] text-lg font-bold">$247,891.33</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-4 sm:px-8 py-16 border-t border-neon/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black font-[var(--font-display)] text-center text-gold mb-10">
            ⭐ SUCCESS STORIES ⭐
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-4 sm:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black font-[var(--font-display)] text-neon neon-text mb-6">
              START GENERATING NOW
            </h2>
            <p className="text-text-dim text-lg mb-8">
              Join millions of satisfied users. Your money is waiting.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="neon-btn px-12 py-5 rounded-2xl text-xl tracking-widest"
            >
              🚀 ACTIVATE GENERATOR 🚀
            </button>
            <p className="text-text-dim/40 text-xs mt-4 font-[var(--font-mono)]">
              No credit card required • Instant access • Unlimited generation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      {showDisclaimer && (
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-4 sm:px-8 py-8 border-t border-crimson/20 bg-crimson/5"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-crimson/80 text-xs font-bold uppercase tracking-wider mb-2">⚠️ DISCLAIMER ⚠️</p>
            <p className="text-crimson/50 text-xs leading-relaxed">
              This website is a <strong>fictional parody</strong> created for <strong>entertainment purposes only</strong>. 
              It does NOT generate, provide, or distribute real money. No actual financial transactions occur. 
              All numbers, statistics, testimonials, and "earnings" displayed are entirely fake and simulated. 
              This is a work of interactive fiction / ARG (Alternate Reality Game). 
              Do not enter real financial information anywhere on this site. 
              If you encounter a website that claims to generate free money, it is a scam. 
              Stay safe online. 🛡️
            </p>
          </div>
        </motion.footer>
      )}
    </div>
  );
}
