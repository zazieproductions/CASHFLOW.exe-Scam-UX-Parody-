import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Cpu, Activity, AlertTriangle, ChevronRight, Wifi, Database, Hexagon, RotateCw } from 'lucide-react';
import BalanceCounter from '../components/BalanceCounter';
import TransactionFeed from '../components/TransactionFeed';
import LoadingBar from '../components/LoadingBar';
import GlitchText from '../components/GlitchText';
import MatrixRain from '../components/MatrixRain';

const initSteps = [
  'Connecting to quantum mesh network...',
  'Synchronizing blockchain nodes...',
  'Calibrating AI revenue engine...',
  'Bypassing financial firewalls...',
  'Injecting money algorithms...',
  'Establishing secure tunnel...',
  'Generator online. Welcome.',
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'loading' | 'dashboard'>('loading');
  const [loadStep, setLoadStep] = useState(0);
  const [cursedLevel, setCursedLevel] = useState(0);
  const [generatorActive, setGeneratorActive] = useState(false);
  const [generatorSpeed, setGeneratorSpeed] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (phase !== 'loading') return;
    const timer = setInterval(() => {
      setLoadStep(prev => {
        if (prev >= initSteps.length - 1) {
          clearInterval(timer);
          setTimeout(() => setPhase('dashboard'), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [phase]);

  const handleBoost = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount > 5 && cursedLevel < 1) setCursedLevel(1);
      if (newCount > 15 && cursedLevel < 2) setCursedLevel(2);
      if (newCount > 30 && cursedLevel < 3) {
        setCursedLevel(3);
        setShowWarning(true);
        setWarningText('WARNING: Unusual activity detected. The system is watching.');
      }
      if (newCount > 50 && cursedLevel < 4) {
        setCursedLevel(4);
        setWarningText('Y̷O̷U̷ ̷W̷E̷R̷E̷ ̷W̷A̷R̷N̷E̷D̷');
      }
      return newCount;
    });
    setGeneratorSpeed(prev => Math.min(prev + 0.2, 10));
  }, [cursedLevel]);

  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <MatrixRain intensity={0.3} />
        <div className="relative z-10 max-w-lg w-full px-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-4 spin-slow">
              <Cpu size={32} className="text-neon" />
            </div>
            <h2 className="text-2xl font-[var(--font-display)] font-bold text-neon">INITIALIZING</h2>
          </div>
          <div className="space-y-3">
            {initSteps.slice(0, loadStep + 1).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= loadStep ? 1 : 0.3, x: 0 }}
                className="flex items-center gap-3"
              >
                <span className={`w-2 h-2 rounded-full ${i < loadStep ? 'bg-neon' : i === loadStep ? 'bg-gold animate-pulse' : 'bg-text-dim'}`} />
                <span className={`text-sm font-[var(--font-mono)] ${i <= loadStep ? 'text-neon/80' : 'text-text-dim'}`}>
                  {step}
                </span>
                {i === loadStep && <RotateCw size={12} className="text-gold animate-spin" />}
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <LoadingBar label="System Boot" duration={initSteps.length * 1.2} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-void relative ${cursedLevel > 3 ? 'scanline' : ''}`}>
      <MatrixRain intensity={Math.min(cursedLevel * 0.4, 2)} />

      {/* Warning overlay */}
      <AnimatePresence>
        {showWarning && cursedLevel >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm"
            onClick={() => setShowWarning(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-center p-8 max-w-md"
            >
              <AlertTriangle size={64} className="text-crimson mx-auto mb-4 animate-pulse" />
              <GlitchText
                text={warningText}
                className="text-crimson text-xl font-[var(--font-display)] font-bold block mb-4"
                intensity={cursedLevel > 3 ? 3 : 1}
                as="div"
              />
              <p className="text-text-dim text-sm mb-6">
                {cursedLevel > 3
                  ? 'The tasks await. You cannot go back.'
                  : 'Click anywhere to dismiss... if you dare continue.'}
              </p>
              {cursedLevel >= 3 && (
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('/tasks'); }}
                  className="px-6 py-3 rounded-lg bg-crimson/20 border border-crimson text-crimson font-bold hover:bg-crimson/30 transition-all"
                >
                  ENTER THE TASKS →
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Nav */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-neon/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center">
            <DollarSign size={18} className="text-neon" />
          </div>
          <GlitchText
            text="CASHFLOW.exe"
            className="font-[var(--font-display)] font-bold text-neon text-lg tracking-wider"
            intensity={cursedLevel}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <Wifi size={12} className={cursedLevel > 3 ? 'text-crimson' : 'text-neon'} />
            <span className={`font-[var(--font-mono)] ${cursedLevel > 3 ? 'text-crimson/60' : 'text-neon/60'}`}>
              {cursedLevel > 3 ? 'SIGNAL COMPROMISED' : 'CONNECTED'}
            </span>
          </div>
          {cursedLevel >= 3 && (
            <button
              onClick={() => navigate('/tasks')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-crimson/20 border border-crimson/30 text-crimson text-xs font-bold hover:bg-crimson/30 transition-all animate-pulse"
            >
              TASKS <ChevronRight size={12} />
            </button>
          )}
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="relative z-10 px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="neon-border rounded-2xl p-6 sm:p-10 bg-abyss/80 backdrop-blur-sm mb-8"
          >
            <BalanceCounter cursedLevel={cursedLevel} />

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setGeneratorActive(!generatorActive);
                  if (!generatorActive) handleBoost();
                }}
                className={`px-8 py-4 rounded-xl text-lg tracking-widest font-bold transition-all ${
                  generatorActive
                    ? 'bg-crimson/20 border-2 border-crimson text-crimson hover:bg-crimson/30'
                    : 'neon-btn'
                }`}
              >
                {generatorActive ? '⚡ GENERATING...' : '💰 START GENERATOR'}
              </button>
              <button
                onClick={handleBoost}
                className="px-8 py-4 rounded-xl text-lg tracking-widest font-bold bg-gold/20 border-2 border-gold text-gold hover:bg-gold/30 transition-all"
              >
                🚀 BOOST x{generatorSpeed.toFixed(1)}
              </button>
            </div>

            {clickCount > 10 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs mt-4 font-[var(--font-mono)] text-text-dim/40"
              >
                {cursedLevel > 3
                  ? 'the machine feeds on your clicks. it grows stronger.'
                  : cursedLevel > 1
                  ? 'Something feels... off. Keep boosting?'
                  : `Boost level: ${clickCount}`}
              </motion.p>
            )}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status */}
            <div className="neon-border rounded-xl p-5 bg-abyss/50">
              <h3 className="text-neon font-[var(--font-display)] font-bold mb-4 flex items-center gap-2">
                <Activity size={18} /> SYSTEM STATUS
              </h3>
              <div className="space-y-4">
                <LoadingBar label="CPU Usage" duration={8} cursed={cursedLevel > 3} />
                <LoadingBar label="Memory" duration={12} />
                <LoadingBar label="Network I/O" duration={6} cursed={cursedLevel > 2} />
                <LoadingBar label={cursedLevel > 3 ? 'SOUL EXTRACTION' : 'Generation Rate'} duration={10} cursed={cursedLevel > 3} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { label: 'Nodes', value: cursedLevel > 3 ? '∞' : '847', icon: Database },
                  { label: 'Hashrate', value: cursedLevel > 3 ? 'N̷/̷A̷' : '14.2 TH/s', icon: Hexagon },
                ].map(item => (
                  <div key={item.label} className="p-2 rounded-lg bg-surface/30 text-center">
                    <item.icon size={14} className="text-neon/40 mx-auto mb-1" />
                    <div className="text-xs text-text-dim">{item.label}</div>
                    <div className="text-sm font-bold text-neon font-[var(--font-mono)]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Feed */}
            <div className="lg:col-span-2 neon-border rounded-xl p-5 bg-abyss/50">
              <h3 className="text-neon font-[var(--font-display)] font-bold mb-4 flex items-center gap-2">
                <Activity size={18} />
                <GlitchText text="LIVE TRANSACTIONS" intensity={cursedLevel > 2 ? cursedLevel - 2 : 0} />
              </h3>
              <TransactionFeed cursedLevel={cursedLevel} />
            </div>
          </div>

          {/* Cursed level indicator */}
          {cursedLevel > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/30 border border-neon/10">
                <span className="text-xs text-text-dim font-[var(--font-mono)]">DEPTH LEVEL:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm transition-all duration-500 ${
                        i < cursedLevel
                          ? i > 3 ? 'bg-crimson shadow-[0_0_5px_rgba(255,23,68,0.5)]'
                            : i > 1 ? 'bg-gold shadow-[0_0_5px_rgba(255,215,0,0.5)]'
                            : 'bg-neon shadow-[0_0_5px_rgba(57,255,20,0.5)]'
                          : 'bg-deep'
                      }`}
                    />
                  ))}
                </div>
                {cursedLevel >= 3 && (
                  <button
                    onClick={() => navigate('/tasks')}
                    className="text-xs text-crimson font-bold ml-2 hover:underline"
                  >
                    [TASKS UNLOCKED]
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <footer className="relative z-10 px-4 sm:px-8 py-6 border-t border-crimson/10 mt-8">
        <p className="text-center text-crimson/30 text-[10px] font-[var(--font-mono)]">
          ⚠️ PARODY / ENTERTAINMENT ONLY — No real money is generated, earned, or distributed. This is an interactive fiction experience (ARG). All displayed values are fake.
        </p>
      </footer>
    </div>
  );
}
