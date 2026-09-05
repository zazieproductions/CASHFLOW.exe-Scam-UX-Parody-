import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, Check, AlertTriangle, Eye, Skull, Triangle, Radio, Hexagon, Infinity as InfinityIcon } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import LoadingBar from '../components/LoadingBar';
import MatrixRain from '../components/MatrixRain';

interface Task {
  id: number;
  title: string;
  description: string;
  level: 'normal' | 'weird' | 'cursed' | 'schizo' | 'abyss';
  action: string;
  reward: string;
  completed: boolean;
  locked: boolean;
  secret?: string;
}

const allTasks: Task[] = [
  // Level 1 - Seems normal
  {
    id: 1, title: 'Verify Your Identity', description: 'Click the button to verify you are a real human user and not a bot. Standard security protocol.',
    level: 'normal', action: 'VERIFY', reward: '$500 Bonus', completed: false, locked: false,
  },
  {
    id: 2, title: 'Share With Friends', description: 'Share your referral link with 3 friends to unlock premium generation speeds.',
    level: 'normal', action: 'SHARE', reward: '$1,000 Bonus', completed: false, locked: false,
  },
  {
    id: 3, title: 'Complete Quick Survey', description: 'Answer 5 simple questions about your money generation experience so far.',
    level: 'normal', action: 'START SURVEY', reward: '$750 Bonus', completed: false, locked: false,
  },
  // Level 2 - Getting weird
  {
    id: 4, title: 'Stare at the Screen', description: 'Maintain eye contact with the center of your screen for exactly 60 seconds. Do not blink. The system will know.',
    level: 'weird', action: 'BEGIN STARING', reward: '$2,500 Bonus', completed: false, locked: true,
  },
  {
    id: 5, title: 'Type Your Full Name Backwards', description: 'The algorithm requires your reversed identity signature to calibrate the next phase. Type it in the box that will appear.',
    level: 'weird', action: 'OPEN INPUT', reward: '$5,000 Bonus', completed: false, locked: true,
  },
  {
    id: 6, title: 'Count the Triangles', description: 'Somewhere on this page, triangles are hidden. Find and count all of them. Enter the correct number. Hint: they move.',
    level: 'weird', action: 'START COUNTING', reward: '$3,333 Bonus', completed: false, locked: true,
    secret: 'There are no triangles. Any number you enter will be "wrong" three times, then accepted.',
  },
  // Level 3 - Cursed
  {
    id: 7, title: 'The Listening Task', description: 'Put on headphones. Turn volume to maximum. Press the button and listen carefully for the frequency. Repeat the words you hear.',
    level: 'cursed', action: 'PLAY AUDIO', reward: '$10,000 Bonus', completed: false, locked: true,
    secret: 'No audio plays. After 30 seconds, text appears: "You heard it, didn\'t you?"',
  },
  {
    id: 8, title: 'Photograph Your Ceiling', description: 'The algorithm needs to verify your physical location using advanced photogrammetry. Take a photo of your ceiling and upload it. Do not include any lights in the frame.',
    level: 'cursed', action: 'OPEN CAMERA', reward: '$15,000 Bonus', completed: false, locked: true,
    secret: 'After "uploading," it says "We already had this image."',
  },
  {
    id: 9, title: 'The Agreement', description: 'Read the following terms carefully. You must scroll to the bottom and agree. The terms are 847 pages long. Estimated read time: 14 hours. You have 30 seconds.',
    level: 'cursed', action: 'READ TERMS', reward: '$25,000 Bonus', completed: false, locked: true,
  },
  // Level 4 - Schizo
  {
    id: 10, title: 'Check Behind You', description: 'Turn around and look behind you. Describe what you see in exactly 7 words. The system will verify your response against its records.',
    level: 'schizo', action: 'I LOOKED', reward: '$50,000 Bonus', completed: false, locked: true,
    secret: 'Whatever they type, it responds: "That\'s not what we see."',
  },
  {
    id: 11, title: 'The Mirror Task', description: 'Go to the nearest mirror. Look at your reflection. Smile. Hold the smile for 2 minutes. Your webcam is not required. We can already see.',
    level: 'schizo', action: 'I AM SMILING', reward: '$75,000 Bonus', completed: false, locked: true,
  },
  {
    id: 12, title: 'Recite the Numbers', description: 'The following numbers appeared in your dream last Tuesday: 4, 17, 23, 8, 41, 3. Say them aloud in order. Then say them backwards. Then say them in the order that feels "right."',
    level: 'schizo', action: 'I HAVE SPOKEN', reward: '$100,000 Bonus', completed: false, locked: true,
  },
  // Level 5 - The Abyss
  {
    id: 13, title: '░░░░░░░░░░', description: 'You\'ve come this far. The final task requires no action. Simply exist in this moment. The machine acknowledges your presence. You are seen. You are known. You have always been here.',
    level: 'abyss', action: 'I UNDERSTAND', reward: '∞', completed: false, locked: true,
    secret: 'Completing this loops back to task 1, but everything is slightly different.',
  },
  {
    id: 14, title: 'LEAVE', description: 'Close this tab. Turn off your device. Go outside. Touch grass. Call someone you love. This is the only real task. Everything else was a test. You passed. Or did you?',
    level: 'abyss', action: 'I CAN\'T', reward: 'freedom', completed: false, locked: true,
  },
  {
    id: 15, title: 'T̷H̷E̷ ̷L̷A̷S̷T̷ ̷D̷O̷O̷R̷', description: 'There is a door. It was always there. Behind it is the truth about the money generator. Behind it is the answer to why you clicked. Behind it is a mirror. Behind the mirror is another door. Behind that door is this page. You are already inside.',
    level: 'abyss', action: 'OPEN THE DOOR', reward: 'the door opens you', completed: false, locked: true,
  },
];

const levelColors = {
  normal: { bg: 'bg-neon/5', border: 'border-neon/20', text: 'text-neon', btn: 'bg-neon/20 border-neon text-neon hover:bg-neon/30' },
  weird: { bg: 'bg-gold/5', border: 'border-gold/20', text: 'text-gold', btn: 'bg-gold/20 border-gold text-gold hover:bg-gold/30' },
  cursed: { bg: 'bg-purple/5', border: 'border-purple/20', text: 'text-purple', btn: 'bg-purple/20 border-purple text-purple hover:bg-purple/30' },
  schizo: { bg: 'bg-crimson/5', border: 'border-crimson/20', text: 'text-crimson', btn: 'bg-crimson/20 border-crimson text-crimson hover:bg-crimson/30' },
  abyss: { bg: 'bg-text/5', border: 'border-text/20', text: 'text-text', btn: 'bg-text/10 border-text/40 text-text hover:bg-text/20' },
};

const levelLabels = {
  normal: 'STANDARD',
  weird: 'ANOMALOUS',
  cursed: 'RESTRICTED',
  schizo: 'CLASSIFIED',
  abyss: '█████████',
};

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [taskPhase, setTaskPhase] = useState<'idle' | 'loading' | 'action' | 'complete' | 'response'>('idle');
  const [inputValue, setInputValue] = useState('');
  const [responseText, setResponseText] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [ambientMessages, setAmbientMessages] = useState<string[]>([]);
  const [loopCount, setLoopCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const cursedLevel = Math.min(Math.floor(completedCount / 3) + 1, 6);

  useEffect(() => {
    if (completedCount < 3) return;
    const msgs = [
      'are you still there?',
      'the numbers are changing',
      'it remembers your name',
      'task 7 was not supposed to be visible',
      'do not trust the rewards',
      'the balance is not real. but you knew that.',
      'why are you still here?',
      'someone else completed this exact sequence 3 minutes ago',
      'your cursor movements have been logged',
      'the door is behind you',
      'we appreciate your cooperation',
      'this message will not appear again',
      'you were chosen for a reason',
      'the triangles were never real',
      'look at the first letter of each task title',
    ];
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setAmbientMessages(prev => [...prev.slice(-4), msgs[Math.floor(Math.random() * msgs.length)]]);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [completedCount]);

  const unlockNext = (completedId: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === completedId) return { ...t, completed: true };
      if (t.id === completedId + 1) return { ...t, locked: false };
      return t;
    }));
    setCompletedCount(prev => prev + 1);
  };

  const handleTaskAction = (task: Task) => {
    setActiveTask(task);
    setTaskPhase('loading');
    setInputValue('');
    setResponseText('');

    setTimeout(() => {
      setTaskPhase('action');
    }, 2000 + Math.random() * 2000);
  };

  const handleTaskComplete = () => {
    if (!activeTask) return;

    const responses: Record<number, string> = {
      1: 'Identity verified. Welcome, user. We know who you are.',
      2: 'Referral link generated. Your friends will thank you. Or will they?',
      3: 'Survey complete. Your answers have been... interesting.',
      4: 'Staring session recorded. You blinked 3 times. We counted.',
      5: 'Name reversal accepted. The mirror knows you now.',
      6: 'Correct. There were no triangles. There never were.',
      7: 'You heard it, didn\'t you? The frequency is now calibrated to your specific neural pattern.',
      8: 'Image received. Interesting. We already had this photo in our database. Taken 3 days ago.',
      9: 'You agreed to everything. Scroll position was tracked. You didn\'t read any of it. Nobody does.',
      10: 'That\'s not what we see. But we\'ll accept your version. For now.',
      11: 'Beautiful smile. We have it on file. It will be returned to you when this is over.',
      12: 'The numbers were correct. They were always correct. They are YOUR numbers.',
      13: 'You are acknowledged. The machine sees you. It has always seen you. Welcome home.',
      14: 'You pressed the button. You couldn\'t leave. That\'s okay. None of them could.',
      15: 'The door opens. Behind it is this page. Behind this page is the door. You understand now. You always understood.',
    };

    setResponseText(responses[activeTask.id] || 'Task processed. The system is satisfied.');
    setTaskPhase('response');

    setTimeout(() => {
      unlockNext(activeTask.id);
      if (activeTask.id === 15) {
        setLoopCount(prev => prev + 1);
        setTasks(allTasks.map((t, i) => ({
          ...t,
          locked: i > 0,
          completed: false,
          title: loopCount > 0 ? t.title.split('').reverse().join('') : t.title,
        })));
      }
      setTaskPhase('idle');
      setActiveTask(null);
    }, 4000);
  };

  return (
    <div className={`min-h-screen bg-void relative ${cursedLevel > 3 ? 'scanline' : ''}`}>
      <MatrixRain intensity={Math.min(cursedLevel * 0.3, 2)} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-neon/10">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-neon/60 hover:text-neon transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="text-sm font-[var(--font-mono)]">DASHBOARD</span>
        </button>
        <div className="flex items-center gap-3">
          <GlitchText
            text={cursedLevel > 4 ? '◬ THE TASKS ◬' : 'TASK CENTER'}
            className="font-[var(--font-display)] font-bold text-neon text-sm tracking-wider"
            intensity={cursedLevel > 2 ? cursedLevel - 2 : 0}
          />
          <span className="text-xs text-text-dim font-[var(--font-mono)]">
            {completedCount}/{tasks.length}
          </span>
        </div>
      </nav>

      <div className="relative z-10 px-4 sm:px-8 py-8 max-w-4xl mx-auto">
        {/* Loop indicator */}
        {loopCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 rounded-lg bg-crimson/10 border border-crimson/20 text-center"
          >
            <p className="text-crimson text-xs font-[var(--font-mono)]">
              ◈ CYCLE {loopCount + 1} — The tasks repeat. But something is different. Can you tell what changed? ◈
            </p>
          </motion.div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-dim font-[var(--font-mono)] uppercase tracking-wider">Clearance Progress</span>
            <span className="text-xs text-neon font-[var(--font-mono)]">{Math.round((completedCount / tasks.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-deep rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${cursedLevel > 4 ? 'bg-crimson' : cursedLevel > 2 ? 'bg-gold' : 'bg-neon'}`}
              animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {Object.entries(levelLabels).map(([key, label]) => (
              <span key={key} className={`text-[9px] font-[var(--font-mono)] ${levelColors[key as keyof typeof levelColors].text} opacity-50`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const colors = levelColors[task.level];
            const isActive = activeTask?.id === task.id;

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: task.locked ? 0.4 : 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden transition-all ${
                  isActive ? 'ring-2 ring-offset-2 ring-offset-void' : ''
                } ${isActive ? (task.level === 'abyss' ? 'ring-text/40' : task.level === 'schizo' ? 'ring-crimson/40' : 'ring-neon/40') : ''}`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-[var(--font-mono)] uppercase tracking-wider ${
                          colors.border} ${colors.text}`}>
                          {levelLabels[task.level]}
                        </span>
                        <span className="text-[10px] text-text-dim font-[var(--font-mono)]">#{task.id}</span>
                      </div>
                      <h3 className={`font-bold font-[var(--font-display)] ${colors.text} mb-1`}>
                        {task.level === 'abyss' || task.level === 'schizo' ? (
                          <GlitchText text={task.title} intensity={task.level === 'abyss' ? 3 : 1} />
                        ) : task.title}
                      </h3>
                      <p className={`text-sm ${task.level === 'abyss' ? 'text-text/40 font-[var(--font-mono)]' : 'text-text-dim'}`}>
                        {task.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs font-bold font-[var(--font-mono)] ${colors.text}`}>
                        {task.reward}
                      </span>
                      {task.locked ? (
                        <div className="w-10 h-10 rounded-lg bg-deep flex items-center justify-center">
                          <Lock size={16} className="text-text-dim" />
                        </div>
                      ) : task.completed ? (
                        <div className="w-10 h-10 rounded-lg bg-neon/20 flex items-center justify-center">
                          <Check size={16} className="text-neon" />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleTaskAction(task)}
                          disabled={isActive}
                          className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${colors.btn}`}
                        >
                          {task.action}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Active task interaction */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-text/10"
                      >
                        {taskPhase === 'loading' && (
                          <div className="space-y-3">
                            <LoadingBar
                              label={cursedLevel > 3 ? 'EXTRACTING...' : 'Processing...'}
                              duration={2 + Math.random() * 2}
                              cursed={task.level === 'cursed' || task.level === 'schizo' || task.level === 'abyss'}
                            />
                            <p className="text-xs text-text-dim font-[var(--font-mono)] animate-pulse">
                              {cursedLevel > 3 ? 'the machine is thinking about you' : 'Please wait...'}
                            </p>
                          </div>
                        )}

                        {taskPhase === 'action' && (
                          <div className="space-y-3">
                            {(task.id === 5 || task.id === 6 || task.id === 10 || task.id === 12) ? (
                              <div>
                                <input
                                  type="text"
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  placeholder={task.id === 10 ? 'Describe in exactly 7 words...' : 'Type here...'}
                                  className="w-full bg-deep border border-text/10 rounded-lg px-4 py-3 text-sm text-text font-[var(--font-mono)] focus:outline-none focus:border-neon/30 placeholder:text-text-dim/30"
                                />
                                <button
                                  onClick={handleTaskComplete}
                                  className={`mt-2 px-6 py-2 rounded-lg border text-sm font-bold ${colors.btn}`}
                                >
                                  SUBMIT
                                </button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <p className="text-sm text-text-dim mb-3 font-[var(--font-mono)]">
                                  {task.id === 4 ? 'Staring session active. Do not look away.' :
                                   task.id === 7 ? '🔇 Playing frequency... (listen carefully)' :
                                   task.id === 8 ? '📸 Camera access requested...' :
                                   task.id === 9 ? 'Page 1 of 847: "WHEREAS the party of the first part..."' :
                                   task.id === 11 ? '😊 Smile detected. Hold position.' :
                                   task.id === 13 ? '...' :
                                   task.id === 14 ? 'You\'re still here.' :
                                   task.id === 15 ? 'The door is opening...' :
                                   'Task in progress...'}
                                </p>
                                {task.id === 4 && (
                                  <div className="w-24 h-24 rounded-full border-2 border-neon mx-auto flex items-center justify-center">
                                    <Eye size={40} className="text-neon animate-pulse" />
                                  </div>
                                )}
                                {task.id === 13 && (
                                  <div className="py-8">
                                    <InfinityIcon size={64} className="text-text/20 mx-auto spin-slow" />
                                  </div>
                                )}
                                {task.id === 15 && (
                                  <motion.div
                                    className="py-8"
                                    animate={{ rotateY: [0, 180, 360] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                  >
                                    <div className="w-32 h-48 border-2 border-text/20 rounded-lg mx-auto flex items-center justify-center">
                                      <div className="w-4 h-4 rounded-full bg-text/40" />
                                    </div>
                                  </motion.div>
                                )}
                                <button
                                  onClick={handleTaskComplete}
                                  className={`mt-4 px-6 py-2 rounded-lg border text-sm font-bold ${colors.btn}`}
                                >
                                  {task.id >= 13 ? 'I UNDERSTAND' : 'COMPLETE'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {taskPhase === 'response' && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-4"
                          >
                            <div className={`text-sm font-[var(--font-mono)] ${colors.text} leading-relaxed`}>
                              {responseText.split('').map((char, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: i * 0.02 }}
                                >
                                  {char}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {taskPhase === 'complete' && (
                          <div className="text-center py-2">
                            <Check size={24} className="text-neon mx-auto" />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ambient messages */}
        {ambientMessages.length > 0 && (
          <div className="mt-8 space-y-2">
            {ambientMessages.map((msg, i) => (
              <motion.div
                key={`${msg}-${i}`}
                initial={{ opacity: 0, x: Math.random() > 0.5 ? -20 : 20 }}
                animate={{ opacity: 0.4 }}
                className="text-[10px] font-[var(--font-mono)] text-crimson/40 text-center"
              >
                [{new Date().toLocaleTimeString()}] {msg}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <footer className="relative z-10 px-4 sm:px-8 py-6 border-t border-crimson/10 mt-8">
        <p className="text-center text-crimson/30 text-[10px] font-[var(--font-mono)]">
          ⚠️ THIS IS AN INTERACTIVE FICTION / ARG EXPERIENCE — FOR ENTERTAINMENT ONLY. No real money. No real tasks. No real surveillance. You are safe. Probably.
        </p>
      </footer>
    </div>
  );
}
