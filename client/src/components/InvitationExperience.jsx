import React, { useState, useRef, useEffect } from 'react';
import FestiveBackground from './FestiveBackground';
import InvitationCard from './InvitationCard';
import Celebration from './Celebration';
import FloatingHearts from './FloatingHearts';
import invitationConfig from '../config/invitationConfig';
import { AnimatePresence, motion } from 'framer-motion';

const InvitationExperience = ({ inviteId, targetName, isLoading }) => {
  const [accepted, setAccepted] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  
  const heartsRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(invitationConfig.song);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
        audio.pause();
        audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    // Initial tiny hearts
    const timer = setTimeout(() => {
      triggerHearts(3);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const triggerHearts = (count, isCelebration = false) => {
    if (heartsRef.current) {
      heartsRef.current.addHearts(count, isCelebration);
    }
  };

  const handleYes = async () => {
    try {
        await audioRef.current.play();
        console.log("Chogada Tara started");
    } catch (error) {
        console.error("Chogada Tara failed:", error);
    }

    setAccepted(true);
    
    // Celebration burst of hearts
    setTimeout(() => {
      triggerHearts(25, true);
    }, 500);
    
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      await fetch(`${baseUrl}/api/invitation-response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inviteId,
          response: 'yes',
          noClickCount: noClickCount,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (err) {
      console.log('Backend offline, but we still celebrate! 🎉');
    }
  };

  const mergedConfig = {
    ...invitationConfig,
    herName: targetName || invitationConfig.herName
  };

  return (
    <FestiveBackground isCelebration={accepted}>
      <FloatingHearts ref={heartsRef} />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#F4C95D] font-serif text-xl animate-pulse"
          >
            Loading... ✨
          </motion.div>
        ) : !accepted ? (
          <InvitationCard 
            key="invitation"
            onYes={handleYes} 
            noClickCount={noClickCount} 
            setNoClickCount={setNoClickCount}
            triggerHearts={(count) => triggerHearts(count, false)}
            config={mergedConfig}
          />
        ) : (
          <Celebration key="celebration" config={mergedConfig} />
        )}
      </AnimatePresence>
    </FestiveBackground>
  );
};

export default InvitationExperience;
