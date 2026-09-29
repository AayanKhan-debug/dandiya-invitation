import React, { useEffect, useState, useMemo } from 'react';
import { MarigoldToran, Lantern, Diya, CornerFoliage, GarbaCrowd, CinematicRangoli, FloatingPetals } from './DandiyaDecor';

// Memoize to prevent unnecessary re-renders of the entire background
const FestiveBackground = React.memo(({ children, isCelebration }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particles = useMemo(() => {
    // Reduce particle count significantly on mobile
    const count = isMobile ? (isCelebration ? 15 : 10) : (isCelebration ? 40 : 25);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
  }, [isCelebration, isMobile]);

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
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[600px] bg-gradient-to-radial from-[#F4C95D]/20 via-[#E85B91]/5 to-transparent blur-[80px] pointer-events-none z-0"
        style={{
          animation: 'ambient-glow 6s infinite alternate ease-in-out',
          opacity: isCelebration ? 0.7 : 0.4,
          transform: isCelebration ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)'
        }}
      />

      {/* Tiny stars / glowing particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={`p-${p.id}`}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.id % 2 === 0 ? '#F4C95D' : '#FFF1F5',
              boxShadow: p.id % 2 === 0 ? '0 0 8px #F4C95D' : '0 0 5px #FFF1F5',
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `particle-rise ${p.duration}s infinite linear ${p.delay}s`,
              opacity: 0, // Starts at 0 until animation kicks in
            }}
          />
        ))}
      </div>

      {/* 4. RANGOLI FLOOR */}
      <CinematicRangoli />

      {/* 3. GARBA DANCERS (Midground) */}
      <GarbaCrowd isMobile={isMobile} />

      {/* 1. TOP DECORATION - Fairy Lights */}
      <div className="absolute top-0 left-0 w-full h-[150px] pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: isMobile ? 2 : 3 }).map((_, stringIndex) => (
          <div key={`string-${stringIndex}`} className="absolute w-full" style={{ top: `${stringIndex * 20}px` }}>
            <svg className="absolute top-0 left-0 w-[120%] -ml-[10%]" preserveAspectRatio="none" viewBox="0 0 1000 50">
              <path d={`M0,10 Q250,${40 + stringIndex * 10} 500,10 T1000,10`} fill="none" stroke="#F4C95D" strokeWidth="0.5" opacity="0.2"/>
            </svg>
            <div className="flex w-full justify-around px-4">
              {Array.from({ length: isMobile ? 8 : 12 }).map((_, i) => (
                <div
                  key={`light-${stringIndex}-${i}`}
                  className="w-1.5 h-1.5 rounded-full bg-[#FFF] shadow-[0_0_10px_3px_rgba(244,201,93,0.8)] mt-2"
                  style={{ 
                    transform: `translateY(${Math.sin((i / (isMobile ? 7 : 11)) * Math.PI) * (20 + stringIndex * 5)}px)`,
                    animation: `light-pulse ${1 + Math.random() * 2}s infinite ${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 1. TOP DECORATION - Toran */}
      <MarigoldToran className="z-10" />

      {/* Lanterns - Reduce on mobile */}
      <Lantern className="top-4 left-4 sm:left-16 scale-75 sm:scale-100" delay={0.2} />
      {!isMobile && <Lantern className="top-12 left-12 sm:left-32 scale-50 sm:scale-75 opacity-70" delay={1.8} />}
      <Lantern className="top-4 right-4 sm:right-16 scale-75 sm:scale-100" delay={1.5} />
      {!isMobile && <Lantern className="top-8 right-16 sm:right-40 scale-50 sm:scale-75 opacity-60" delay={0.5} />}

      {/* 6. MARIGOLD SIDE DECORATION */}
      <CornerFoliage side="left" />
      <CornerFoliage side="right" />

      {/* 9. FLOATING PETALS */}
      {isCelebration && <FloatingPetals isMobile={isMobile} />}

      {/* 5. DIYAS - Foreground glowing elements */}
      <Diya className="absolute bottom-8 left-4 sm:bottom-16 sm:left-16 scale-75 sm:scale-125" delay={0.1} />
      <Diya className="absolute bottom-6 right-8 sm:bottom-12 sm:right-24 scale-75 sm:scale-100" delay={0.8} />
      
      {/* Center ambient diyas */}
      <Diya className="absolute bottom-4 left-[30%] scale-50 opacity-60 z-10" delay={2.1} />
      <Diya className="absolute bottom-8 right-[30%] scale-50 opacity-60 z-10" delay={1.3} />

      {/* 7. CARD DEPTH - The card sits in the center naturally */}
      <div className="relative z-30 w-full min-h-[100dvh] flex flex-col items-center justify-center p-4">
        {children}
      </div>
      
    </div>
  );
});

export default FestiveBackground;
