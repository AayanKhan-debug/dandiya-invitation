import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '../hooks/useWindowSize';
import invitationConfig from '../config/invitationConfig';
import { CelebrationTopDecor, CelebrationDivider } from './DandiyaDecor';

const Celebration = ({ config }) => {
  const { width, height } = useWindowSize();
  const { yesMessage, celebrationBottomLine1, celebrationBottomLine2 } = config || invitationConfig;
  const [showConfetti, setShowConfetti] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setShowConfetti(true), 400);
    const t2 = setTimeout(() => setRecycleConfetti(false), 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, type: 'spring', bounce: 0.4 }}
      className="relative z-30 w-full max-w-[420px] mx-auto px-4 flex flex-col items-center justify-center min-h-[400px]"
    >
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={recycleConfetti}
          numberOfPieces={300}
          gravity={0.15}
          initialVelocityY={20}
          colors={['#F4C95D', '#F26A73', '#E85B91', '#ffffff', '#9333ea']}
          className="!fixed inset-0 z-0 pointer-events-none"
        />
      )}

      <motion.div 
        className="relative glass-card-premium rounded-[2rem] p-6 sm:p-8 w-full flex flex-col items-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[var(--color-dandiya-pink)] rounded-full blur-[60px] opacity-20 pointer-events-none" />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 flex flex-col items-center w-full"
        >
          <CelebrationTopDecor />
          
          <h1 className="font-serif text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF1F5] to-[#F4C95D] drop-shadow-md font-bold mb-2">
            YAYYYYY! 🥹❤️
          </h1>
          
          <CelebrationDivider />
          
          <div className="space-y-2 text-center w-full mb-5">
            <p className="text-[var(--color-dandiya-gold)] text-[16px] font-medium tracking-widest uppercase">
              It's official!
            </p>
            <p className="text-xl sm:text-2xl font-serif text-white font-semibold leading-tight whitespace-pre-line">
              {yesMessage}
            </p>
            <p className="text-white/80 text-[14px] pt-1">
              Navratri just got a whole lot more fun. ✨
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="w-full glass-status rounded-2xl p-4 mb-5 relative z-10"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 uppercase tracking-widest text-[11px] font-bold">Partner Status</span>
              <span className="font-bold text-green-300 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.3)] text-xs">CONFIRMED ❤️</span>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="flex items-center justify-between">
              <span className="text-white/70 uppercase tracking-widest text-[11px] font-bold">Mission Dandiya</span>
              <span className="font-bold text-[var(--color-dandiya-gold)] bg-[#F4C95D]/10 border border-[#F4C95D]/20 px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(244,201,93,0.3)] text-xs">ACCEPTED ✅</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 text-center w-full space-y-3"
        >
          <p className="text-[13px] text-pink-100/90 italic leading-snug px-4">
            {celebrationBottomLine1}
          </p>
          <p className="text-[15px] text-[var(--color-dandiya-cream)] font-semibold tracking-wide">
            {celebrationBottomLine2}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Celebration;
