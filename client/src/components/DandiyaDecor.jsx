import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Complex Marigold Toran with Mango Leaves
export const MarigoldToran = React.memo(({ className }) => (
  <div className={`absolute top-0 w-full flex justify-between px-2 sm:px-12 pointer-events-none ${className}`}>
    {/* Base horizontal string */}
    <div className="absolute top-2 w-full left-0 h-[2px] bg-yellow-600/50" />
    
    {Array.from({ length: 8 }).map((_, i) => (
      <div 
        key={`toran-${i}`}
        className="relative flex flex-col items-center mt-[-10px] transform-origin-top"
        style={{ animation: `sway ${3 + Math.random()}s ease-in-out infinite alternate ${Math.random() * 2}s` }}
      >
        {/* Mango Leaves Base */}
        <svg width="60" height="40" viewBox="0 0 60 40" className="absolute -top-1 opacity-90 drop-shadow-md z-0">
          <path d="M30 0 C40 10, 50 20, 30 40 C10 20, 20 10, 30 0 Z" fill="#2d5a27" />
          <path d="M20 5 C30 15, 35 25, 15 35 C5 25, 10 15, 20 5 Z" fill="#2d5a27" transform="rotate(-30 30 20)" />
          <path d="M40 5 C50 15, 55 25, 45 35 C25 25, 30 15, 40 5 Z" fill="#2d5a27" transform="rotate(30 30 20)" />
        </svg>

        {/* Marigold string dripping down */}
        <div className="relative z-10 flex flex-col gap-[2px] mt-2">
          {Array.from({ length: 3 + (i % 3) }).map((_, j) => (
            <div key={`flower-${j}`} className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 shadow-[0_0_8px_rgba(249,115,22,0.6)]" style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, #fbbf24 10%, #ea580c 70%, #9a3412 100%)'
            }} />
          ))}
          {/* Bottom bell/tassel */}
          <div className="w-4 h-5 mt-1 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-t-full drop-shadow-[0_0_4px_rgba(253,224,71,0.8)]" />
        </div>
      </div>
    ))}
  </div>
));

// Warm Lanterns with detailed geometry
export const Lantern = React.memo(({ className, delay = 0 }) => (
  <div 
    className={`absolute origin-top pointer-events-none z-10 ${className}`}
    style={{ animation: `sway 4.5s ease-in-out infinite alternate ${delay}s` }}
  >
    <div className="relative flex flex-col items-center">
      <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-yellow-600/40 to-[#F4C95D]" />
      <svg width="50" height="65" viewBox="0 0 50 65" className="drop-shadow-[0_0_15px_rgba(244,201,93,0.8)]">
        {/* Glow */}
        <circle cx="25" cy="35" r="15" fill="#F4C95D" opacity="0.6" className="animate-[flicker_3s_infinite]" filter="blur(8px)" />
        
        {/* Lantern Body */}
        <path d="M15 5 L35 5 L42 20 L42 50 L35 60 L15 60 L8 50 L8 20 Z" fill="rgba(64,19,61,0.6)" stroke="#F4C95D" strokeWidth="1.5" />
        <path d="M25 5 V60 M15 5 V60 M35 5 V60" stroke="#F4C95D" strokeWidth="1" opacity="0.5" />
        <path d="M8 20 L42 20 M8 50 L42 50" stroke="#F4C95D" strokeWidth="1" opacity="0.5" />
        <path d="M18 0 L32 0 L35 5 L15 5 Z" fill="#E85B91" stroke="#F4C95D" strokeWidth="1" />
        <path d="M18 65 L32 65 L35 60 L15 60 Z" fill="#E85B91" stroke="#F4C95D" strokeWidth="1" />
        
        {/* Light Source */}
        <circle cx="25" cy="35" r="5" fill="#FFF" opacity="0.9" className="animate-[flicker_2s_infinite]" />
      </svg>
      {/* Tassels */}
      <div className="flex gap-1.5 mt-1">
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#E85B91] to-transparent" />
        <div className="w-[1.5px] h-10 bg-gradient-to-b from-[#F4C95D] to-transparent" />
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#E85B91] to-transparent" />
      </div>
    </div>
  </div>
));

// Advanced glowing Diya
export const Diya = React.memo(({ className, delay = 0 }) => (
  <div className={`relative flex flex-col items-center pointer-events-none z-20 ${className}`}>
    {/* Ambient Floor Glow */}
    <div 
      className="absolute top-4 w-12 h-6 bg-orange-500/40 blur-[10px] rounded-full"
      style={{ animation: `light-pulse 1.5s infinite alternate ${delay}s` }}
    />
    
    <svg width="45" height="25" viewBox="0 0 45 25" className="relative z-10 drop-shadow-[0_8px_6px_rgba(0,0,0,0.6)]">
      {/* Base */}
      <path d="M2 12 C2 18 12 24 22.5 24 C33 24 43 18 43 12 C43 6 33 2 22.5 2 C12 2 2 6 2 12 Z" fill="#7a3415" stroke="#4a1a05" strokeWidth="1"/>
      <path d="M6 12 C6 15 13 18 22.5 18 C32 18 39 15 39 12 C39 9 32 6 22.5 6 C13 6 6 9 6 12 Z" fill="#521f0a" />
      
      {/* Detailed Flame */}
      <g
        style={{ transformOrigin: '22.5px 12px', animation: `sway ${0.2 + (Math.random()*0.1)}s infinite alternate ${delay}s` }}
      >
        <path d="M22.5 12 C22.5 12 18 4 22.5 -2 C27 4 22.5 12 22.5 12 Z" fill="#ff4500" filter="blur(1px)"/>
        <path d="M22.5 12 C22.5 12 20 6 22.5 2 C25 6 22.5 12 22.5 12 Z" fill="#ffb700" />
        <path d="M22.5 12 C22.5 12 21 8 22.5 5 C24 8 22.5 12 22.5 12 Z" fill="#ffffff" />
      </g>
    </svg>
  </div>
));

// Complex 6-10 Garba Dancers Crowd (Midground)
export const GarbaCrowd = React.memo(({ isMobile }) => {
  // Generate a random crowd layout once
  const crowd = useMemo(() => {
    const count = isMobile ? 5 : 8;
    return Array.from({ length: count }).map((_, i) => {
      const isGirl = Math.random() > 0.5;
      const scale = 0.6 + Math.random() * 0.4;
      const xPos = -45 + (i * (isMobile ? 18 : 12)) + (Math.random() * 5); // Spread across bottom
      const zIndex = Math.floor(scale * 10);
      const colorType = Math.random();
      let color = "#3A102F"; // default dark silhouette
      if (colorType > 0.7) color = "#521842"; // purple tint
      else if (colorType > 0.4) color = "#26091F"; // darker
      
      return { id: i, isGirl, scale, xPos, zIndex, color, delay: Math.random() * 2, durX: 4 + Math.random() * 2, durY: 1 + Math.random() };
    });
  }, [isMobile]);

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[300px] flex justify-center items-end opacity-[0.85] pointer-events-none z-10 overflow-hidden">
      {crowd.map((dancer) => (
        <div
          key={dancer.id}
          className="absolute bottom-4 drop-shadow-[0_0_15px_rgba(244,201,93,0.15)]"
          style={{ 
            left: `${50 + dancer.xPos}%`, 
            transform: `scale(${dancer.scale})`, 
            zIndex: dancer.zIndex,
            animation: `crowd-sway-x ${dancer.durX}s ease-in-out infinite alternate ${dancer.delay}s`
          }}
        >
          <div style={{ animation: `crowd-sway-y ${dancer.durY}s ease-in-out infinite alternate ${dancer.delay}s` }}>
          {dancer.isGirl ? (
            <svg width="100" height="150" viewBox="0 0 100 150">
              <defs>
                <linearGradient id={`gradG-${dancer.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={dancer.color} />
                  <stop offset="100%" stopColor="#160714" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="20" r="12" fill={`url(#gradG-${dancer.id})`} />
              <path d="M50 35 C40 35, 35 50, 30 70 L20 140 C40 150, 60 150, 80 140 L70 70 C65 50, 60 35, 50 35 Z" fill={`url(#gradG-${dancer.id})`} />
              {/* Highlight edge */}
              <path d="M30 70 L20 140" stroke="rgba(244,201,93,0.2)" strokeWidth="2" fill="none" />
              {/* Arms & Sticks */}
              <motion.g animate={{ rotate: [-5, 10, -5], transformOrigin: "50px 45px" }} transition={{ duration: 1.5, repeat: Infinity, delay: dancer.delay }}>
                <path d="M45 45 L25 55 M55 45 L75 40" stroke={`url(#gradG-${dancer.id})`} strokeWidth="6" strokeLinecap="round" />
                <line x1="15" y1="65" x2="35" y2="45" stroke="#F4C95D" strokeWidth="3" opacity="0.8" />
                <line x1="65" y1="30" x2="85" y2="50" stroke="#F4C95D" strokeWidth="3" opacity="0.8" />
              </motion.g>
            </svg>
          ) : (
            <svg width="100" height="150" viewBox="0 0 100 150">
               <defs>
                <linearGradient id={`gradB-${dancer.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={dancer.color} />
                  <stop offset="100%" stopColor="#160714" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="20" r="12" fill={`url(#gradB-${dancer.id})`} />
              <path d="M35 35 L65 35 L70 75 L30 75 Z" fill={`url(#gradB-${dancer.id})`} />
              <path d="M30 75 L30 140 M70 75 L70 140" stroke={`url(#gradB-${dancer.id})`} strokeWidth="18" strokeLinecap="round" />
              {/* Arms & Sticks */}
              <motion.g animate={{ rotate: [5, -10, 5], transformOrigin: "50px 45px" }} transition={{ duration: 1.4, repeat: Infinity, delay: dancer.delay }}>
                <path d="M40 45 L20 30 M60 45 L80 60" stroke={`url(#gradB-${dancer.id})`} strokeWidth="8" strokeLinecap="round" />
                <line x1="10" y1="20" x2="30" y2="40" stroke="#F4C95D" strokeWidth="3" opacity="0.8" />
                <line x1="70" y1="70" x2="90" y2="50" stroke="#F4C95D" strokeWidth="3" opacity="0.8" />
              </motion.g>
            </svg>
          )}
          </div>
        </div>
      ))}
    </div>
  );
});

// Cinematic glowing floor Rangoli
export const CinematicRangoli = React.memo(() => (
  <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0">
    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(244,201,93,0.15)] to-transparent blur-[50px] rounded-full" />
    <svg 
      viewBox="0 0 400 200" 
      className="w-full h-full opacity-30 drop-shadow-[0_0_15px_rgba(244,201,93,0.4)]"
      style={{ animation: 'rotate-rangoli 200s linear infinite' }}
    >
      <circle cx="200" cy="100" r="90" fill="none" stroke="#F4C95D" strokeWidth="2" strokeDasharray="5,5" />
      <circle cx="200" cy="100" r="70" fill="none" stroke="#E85B91" strokeWidth="4" />
      <circle cx="200" cy="100" r="50" fill="none" stroke="#F4C95D" strokeWidth="1" />
      {/* 8 Petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 200 100)`}>
          <path d="M200 30 Q220 60 200 100 Q180 60 200 30" fill="none" stroke="#F26A73" strokeWidth="2" />
          <circle cx="200" cy="15" r="4" fill="#F4C95D" />
        </g>
      ))}
    </svg>
  </div>
));

// Decorative Corner Foliage
export const CornerFoliage = React.memo(({ side = "left" }) => (
  <div className={`absolute bottom-0 ${side === "left" ? "left-0" : "right-0"} w-32 sm:w-64 h-64 pointer-events-none z-20 overflow-hidden opacity-80`}>
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: side === "right" ? "scaleX(-1)" : "none" }}>
      <path d="M-10 110 Q40 100 60 40 Q40 80 -10 90" fill="#2d5a27" />
      <path d="M-10 110 Q50 90 80 10 Q30 70 -10 100" fill="#1b3b17" />
      {/* Marigold accents */}
      <circle cx="40" cy="70" r="10" fill="url(#mg-grad)" />
      <circle cx="60" cy="30" r="8" fill="url(#mg-grad)" />
      <circle cx="20" cy="40" r="12" fill="url(#mg-grad)" />
      <defs>
        <radialGradient id="mg-grad">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </radialGradient>
      </defs>
    </svg>
  </div>
));

// Floating Petals
export const FloatingPetals = React.memo(({ isMobile }) => {
  const petals = useMemo(() => {
    const count = isMobile ? 10 : 20;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      color: ['#F26A73', '#E85B91', '#F4C95D', '#ea580c'][Math.floor(Math.random() * 4)],
      scale: 0.3 + Math.random() * 0.4
    }));
  }, [isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{ 
            left: `${p.x}vw`, 
            width: 20, 
            height: 20,
            animation: `petal-fall ${p.duration}s linear infinite ${p.delay}s`
          }}
        >
          <svg viewBox="0 0 10 10" style={{ transform: `scale(${p.scale})` }}>
            <path d="M5 0 C8 3, 10 7, 5 10 C0 7, 2 3, 5 0 Z" fill={p.color} opacity="0.7" />
          </svg>
        </div>
      ))}
    </div>
  );
});

// Centerpiece Dancers for card (unchanged structurally, just ensuring exports)
export const CardDancers = () => (
  <div className="relative w-full h-24 flex justify-center items-center my-2 pointer-events-none">
    {/* Crossed sticks behind */}
    <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <line x1="20" y1="60" x2="60" y2="20" stroke="#E85B91" strokeWidth="4" strokeLinecap="round" />
        <line x1="20" y1="20" x2="60" y2="60" stroke="#F4C95D" strokeWidth="4" strokeLinecap="round" />
        <circle cx="28" cy="52" r="2" fill="#fff" />
        <circle cx="52" cy="28" r="2" fill="#fff" />
        <circle cx="28" cy="28" r="2" fill="#fff" />
        <circle cx="52" cy="52" r="2" fill="#fff" />
      </svg>
    </motion.div>
    
    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="relative z-10 flex gap-4">
      {/* Girl */}
      <svg width="35" height="50" viewBox="0 0 35 50" fill="url(#grad1)" className="drop-shadow-lg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F5" />
            <stop offset="100%" stopColor="#E85B91" />
          </linearGradient>
        </defs>
        <circle cx="17.5" cy="8" r="6" />
        <path d="M17.5 15 L12 50 L23 50 Z" />
        <path d="M17.5 15 C10 25 5 50 5 50 L30 50 C30 50 25 25 17.5 15 Z" opacity="0.8" />
        <path d="M17.5 16 L5 25 L10 32 M17.5 16 L30 25 L25 32" stroke="url(#grad1)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      {/* Boy */}
      <svg width="35" height="50" viewBox="0 0 35 50" fill="url(#grad2)" className="drop-shadow-lg">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F5" />
            <stop offset="100%" stopColor="#F4C95D" />
          </linearGradient>
        </defs>
        <circle cx="17.5" cy="8" r="6" />
        <path d="M17.5 15 L25 28 L30 20 M17.5 15 L10 28 L5 20" stroke="url(#grad2)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M17.5 15 L17.5 30 L12 50 L17.5 50 L17.5 35 L23 50 L28 50 Z" />
        <path d="M13 30 L22 30 L25 40 L10 40 Z" opacity="0.6" />
      </svg>
    </motion.div>
  </div>
);

// Celebration Top Decor
export const CelebrationTopDecor = () => (
  <div className="flex flex-col items-center justify-center gap-2 mb-4 w-full">
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <line x1="10" y1="30" x2="30" y2="10" stroke="#F4C95D" strokeWidth="3" strokeLinecap="round" />
        <line x1="10" y1="10" x2="30" y2="30" stroke="#E85B91" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 shadow-[0_0_5px_rgba(249,115,22,0.4)]" style={{ backgroundImage: 'radial-gradient(circle at center, #ea580c 20%, transparent 60%)' }} />
      <svg width="40" height="40" viewBox="0 0 40 40">
        <line x1="10" y1="30" x2="30" y2="10" stroke="#E85B91" strokeWidth="3" strokeLinecap="round" />
        <line x1="10" y1="10" x2="30" y2="30" stroke="#F4C95D" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#F4C95D] to-transparent opacity-60" />
  </div>
);

// Celebration Divider
export const CelebrationDivider = () => (
  <div className="flex items-center justify-center gap-4 my-4 opacity-80">
    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#F4C95D]" />
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#F4C95D">
      <path d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z" />
    </svg>
    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#F4C95D]" />
  </div>
);
