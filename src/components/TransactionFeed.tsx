import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Skull, Eye, Triangle } from 'lucide-react';

const normalNames = [
  'James K.', 'Sarah M.', 'Mike T.', 'Emily R.', 'David L.', 'Jessica W.',
  'Chris P.', 'Amanda B.', 'Ryan H.', 'Nicole D.', 'Brandon S.', 'Ashley G.',
];

const cursedNames = [
  'U̷n̷k̷n̷o̷w̷n̷', '▓▓▓▓▓', 'THEM', 'Y̶O̶U̶', 'nobody',
  '01001000', 'the watcher', 'ǝɯɐu ɹnoʎ', 'Subject #4471',
  '⌀ NULL ⌀', 'it remembers', 'the door is open',
];

const normalActions = [
  'earned', 'received', 'claimed', 'withdrew', 'deposited',
];

const cursedActions = [
  'extracted', 'surrendered', 'was taken from', 'lost', 'offered',
  'fed to the machine', 'was consumed by', 'dissolved into',
];

interface Transaction {
  id: number;
  name: string;
  action: string;
  amount: string;
  time: string;
  cursed: boolean;
}

export default function TransactionFeed({ cursedLevel = 0 }: { cursedLevel?: number }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const addTransaction = () => {
      const isCursed = cursedLevel > 2 && Math.random() < cursedLevel * 0.15;
      const names = isCursed ? cursedNames : normalNames;
      const actions = isCursed ? cursedActions : normalActions;
      const amount = isCursed
        ? (Math.random() * 99999).toFixed(2)
        : (Math.random() * 500 + 10).toFixed(2);

      setIdCounter(prev => {
        const newId = prev + 1;
        setTransactions(prevTx => [{
          id: newId,
          name: names[Math.floor(Math.random() * names.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          amount,
          time: 'just now',
          cursed: isCursed,
        }, ...prevTx].slice(0, 8));
        return newId;
      });
    };

    addTransaction();
    const interval = setInterval(addTransaction, cursedLevel > 3 ? 800 : 2500);
    return () => clearInterval(interval);
  }, [cursedLevel]);

  return (
    <div className="space-y-2 max-h-[400px] overflow-hidden">
      <AnimatePresence initial={false}>
        {transactions.map(tx => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -50, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            exit={{ opacity: 0, x: 50, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-3 rounded-lg ${
              tx.cursed
                ? 'bg-crimson/10 border border-crimson/30'
                : 'bg-surface/50 border border-neon/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tx.cursed ? 'bg-crimson/20' : 'bg-neon/20'
              }`}>
                {tx.cursed ? (
                  cursedLevel > 4 ? <Eye size={16} className="text-crimson" /> :
                  <Skull size={16} className="text-crimson" />
                ) : (
                  Math.random() > 0.5
                    ? <ArrowDownLeft size={16} className="text-neon" />
                    : <ArrowUpRight size={16} className="text-gold" />
                )}
              </div>
              <div>
                <div className={`font-semibold text-sm ${tx.cursed ? 'text-crimson' : 'text-text'}`}>
                  {tx.name}
                </div>
                <div className="text-xs text-text-dim">{tx.action}</div>
              </div>
            </div>
            <div className={`font-bold font-[var(--font-mono)] ${
              tx.cursed ? 'text-crimson' : 'text-neon'
            }`}>
              ${tx.amount}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
