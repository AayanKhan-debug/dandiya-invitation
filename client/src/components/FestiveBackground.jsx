import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MarigoldToran, Lantern, Diya, CornerFoliage, GarbaCrowd, CinematicRangoli, FloatingPetals } from './DandiyaDecor';

const FestiveBackground = ({ children, isCelebration }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate subtle glowing particles / bokeh
    const newParticles = Array.from({ length: isCelebration ? 40 : 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [isCelebration]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-[#160714] transition-colors duration-1000 flex flex-col items-center justify-center perspective-[1000px]">
      
      {/* 2. NAVRATRI NIGHT SKY - Base gradient and bokeh */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none z-0"
        style={{
          background: isCelebration
            ? 'radial-gradient(circle at center, #3A102F 0%, #26091F 60%, #160714 100%)'
            : 'radial-gradient(circle at center, #26091F 0%, #160714 70%, #0a0309 100%)',
          opacity: isCelebration ? 1 : 0.85
        }}
      />
      
      {/* 8. ATMOSPHERIC LIGHTING - Cinematic Warm ambient glow behind the card */}
      <motion.div 
        animate={{ opacity: isCelebration ? 0.7 : 0.4, scale: isCelebration ? 1.2 : 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[600px] bg-gradient-to-radial from-[#F4C95D]/20 via-[#E85B91]/5 to-transparent blur-[80px] pointer-events-none z-0"
      />

      {/* Tiny stars / glowing particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={`p-${p.id}`}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.id % 2 === 0 ? '#F4C95D' : '#FFF1F5',
              boxShadow: p.id % 2 === 0 ? '0 0 8px #F4C95D' : '0 0 5px #FFF1F5',
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* 4. RANGOLI FLOOR */}
      <CinematicRangoli />

      {/* 3. GARBA DANCERS (Midground) */}
      <GarbaCrowd />

      {/* 1. TOP DECORATION - Fairy Lights */}
      <div className="absolute top-0 left-0 w-full h-[150px] pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 3 }).map((_, stringIndex) => (
          <div key={`string-${stringIndex}`} className="absolute w-full" style={{ top: `${stringIndex * 20}px` }}>
            <svg className="absolute top-0 left-0 w-[120%] -ml-[10%]" preserveAspectRatio="none" viewBox="0 0 1000 50">
              <path d={`M0,10 Q250,${40 + stringIndex * 10} 500,10 T1000,10`} fill="none" stroke="#F4C95D" strokeWidth="0.5" opacity="0.2"/>
            </svg>
            <div className="flex w-full justify-around px-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`light-${stringIndex}-${i}`}
                  animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#FFF] shadow-[0_0_10px_3px_rgba(244,201,93,0.8)] mt-2"
                  style={{ transform: `translateY(${Math.sin((i / 11) * Math.PI) * (20 + stringIndex * 5)}px)` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 1. TOP DECORATION - Toran */}
      <MarigoldToran className="z-10" />

      {/* Lanterns */}
      <Lantern className="top-4 left-4 sm:left-16 scale-75 sm:scale-100" delay={0.2} />
      <Lantern className="top-12 left-12 sm:left-32 scale-50 sm:scale-75 opacity-70" delay={1.8} />
      
      <Lantern className="top-4 right-4 sm:right-16 scale-75 sm:scale-100" delay={1.5} />
      <Lantern className="top-8 right-16 sm:right-40 scale-50 sm:scale-75 opacity-60" delay={0.5} />

      {/* 6. MARIGOLD SIDE DECORATION */}
      <CornerFoliage side="left" />
      <CornerFoliage side="right" />

      {/* 9. FLOATING PETALS */}
      <FloatingPetals />

      {/* 5. DIYAS - Foreground glowing elements */}
      <Diya className="absolute bottom-8 left-4 sm:bottom-16 sm:left-16 scale-75 sm:scale-125" delay={0.1} />
      <Diya className="absolute bottom-6 right-8 sm:bottom-12 sm:right-24 scale-75 sm:scale-100" delay={0.8} />
      <Diya className="absolute bottom-24 left-10 sm:left-32 scale-50 opacity-80" delay={1.5} />
      <Diya className="absolute bottom-16 right-4 sm:right-12 scale-50 sm:scale-75 opacity-90" delay={0.4} />
      
      {/* Center ambient diyas */}
      <Diya className="absolute bottom-4 left-[30%] scale-50 opacity-60 z-10" delay={2.1} />
      <Diya className="absolute bottom-8 right-[30%] scale-50 opacity-60 z-10" delay={1.3} />

      {/* 7. CARD DEPTH - The card sits in the center naturally */}
      <div className="relative z-30 w-full min-h-[100dvh] flex flex-col items-center justify-center p-4">
        {children}
      </div>
      
    </div>
  );
};

export default FestiveBackground;
