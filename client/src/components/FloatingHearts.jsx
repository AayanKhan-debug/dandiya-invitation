import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingHearts = forwardRef((props, ref) => {
  const [hearts, setHearts] = useState([]);

  useImperativeHandle(ref, () => ({
    addHearts: (count = 3, isCelebration = false) => {
      const newHearts = Array.from({ length: count }).map(() => ({
        id: Date.now() + Math.random(),
        x: isCelebration ? (Math.random() * 100 - 50) : (Math.random() * 40 - 20),
        scale: Math.random() * 0.5 + 0.8,
        rotation: Math.random() * 60 - 30,
        duration: isCelebration ? Math.random() * 2 + 3 : 2.5,
      }));
      setHearts((prev) => [...prev, ...newHearts]);

      setTimeout(() => {
        setHearts((prev) => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
      }, 6000);
    }
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex items-end justify-center overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: 50, x: `${heart.x}vw`, scale: heart.scale * 0.5, rotate: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -800, 
              x: `${heart.x + (Math.random() * 30 - 15)}vw`,
              scale: heart.scale,
              rotate: heart.rotation
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: "easeOut" }}
            className="absolute -bottom-10 text-3xl sm:text-4xl drop-shadow-[0_0_8px_rgba(232,91,145,0.6)]"
            style={{ color: 'var(--color-dandiya-pink)' }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

export default FloatingHearts;
