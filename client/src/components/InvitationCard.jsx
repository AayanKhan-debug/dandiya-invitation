import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import invitationConfig from '../config/invitationConfig';
import { CardDancers } from './DandiyaDecor';

const ActionButtons = ({ yesScale, noScale, onYes, onNo }) => {
  return (
    <div className="flex w-full items-center justify-center gap-4 sm:gap-6 pt-2">
      <motion.button
        className="relative flex items-center justify-center bg-gradient-to-r from-[var(--color-dandiya-pink)] to-[var(--color-dandiya-coral)] border border-white/20 text-white font-semibold py-3 px-10 rounded-full shadow-[0_4px_15px_rgba(232,91,145,0.4)] cursor-pointer outline-none select-none z-20"
        style={{ scale: yesScale }}
        animate={{ 
          boxShadow: ["0 0 10px rgba(232,91,145,0.4)", "0 0 20px rgba(232,91,145,0.7)", "0 0 10px rgba(232,91,145,0.4)"]
        }}
        transition={{ boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
        whileHover={{ scale: yesScale * 1.05 }}
        whileTap={{ scale: yesScale * 0.95 }}
        onClick={onYes}
      >
        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
        <span className="relative z-10 text-xl tracking-wide font-medium">YES ❤️</span>
      </motion.button>

      <motion.button
        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 font-medium py-3 px-8 rounded-full backdrop-blur-sm cursor-pointer outline-none select-none z-10 shadow-sm"
        style={{ scale: noScale }}
        whileHover={{ scale: noScale > 0.5 ? noScale + 0.05 : noScale }}
        whileTap={{ scale: noScale > 0.5 ? noScale - 0.05 : noScale }}
        onClick={onNo}
      >
        <span className="text-lg">NO 🙈</span>
      </motion.button>
    </div>
  );
};

const InvitationCard = ({ onYes, noClickCount, setNoClickCount, triggerHearts, config }) => {
  const [isShaking, setIsShaking] = useState(false);
  const { herName, question, subtext, funnySubtext, bottomLine, noMessages } = config || invitationConfig;

  // Max mobile safe scale is 1.8
  const yesScale = Math.min(1 + (noClickCount * 0.15), 1.8);
  const noScale = Math.max(1 - (noClickCount * 0.1), 0.5);

  const currentMessage = noClickCount === 0 
    ? funnySubtext 
    : noMessages[Math.min(noClickCount - 1, noMessages.length - 1)];

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
    triggerHearts(3);
    
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
  };

  const displayName = herName ? herName : "you";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 w-full max-w-[400px] mx-auto px-4 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="relative w-full glass-card-premium rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center"
      >
        {/* Top badge */}
        <div className="relative z-10 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-5 shadow-inner">
          <span className="text-xs font-medium text-[var(--color-dandiya-cream)]">✨ One tiny question for you... 👀</span>
        </div>

        {/* Name */}
        <h2 className="relative z-10 font-sans text-[17px] sm:text-lg font-medium text-[var(--color-dandiya-cream)] mb-1 w-full">
          Hey {displayName}... 👀❤️
        </h2>
        
        <p className="relative z-10 text-[13px] text-white/70 font-medium tracking-wide mb-5">
          I have a tiny question for you...
        </p>

        {/* Main Question */}
        <div className="relative z-10 w-full mb-2">
          <h1 className="font-serif text-[32px] sm:text-4xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#FFF1F5] via-[#F4C95D] to-[#E85B91] drop-shadow-md whitespace-pre-line">
            {question}
          </h1>
        </div>

        {/* Decorative Dancers */}
        <CardDancers />

        {/* Subtext */}
        <div className="relative z-10 w-full mb-5">
          <p className="text-[var(--color-dandiya-gold)] font-medium text-[15px] leading-snug mb-3 drop-shadow-sm">
            {subtext}
          </p>
          <div className="h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--color-dandiya-cream)]/90 text-[14px] whitespace-pre-line leading-relaxed"
              >
                {currentMessage}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons */}
        <div className="relative z-10 w-full mb-4 min-h-[60px] flex items-center justify-center">
          <ActionButtons yesScale={yesScale} noScale={noScale} onYes={onYes} onNo={handleNoClick} />
        </div>
        
        {/* Footer line */}
        <div className="relative z-10 w-full pt-4 border-t border-white/10 mt-2">
          <p className="text-[12px] text-white/50 italic font-light">
            {bottomLine}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvitationCard;
