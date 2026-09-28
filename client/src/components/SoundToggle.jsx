import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);
  // Ideally, you would have a beautiful instrumental track in public/audio/
  // For this template, we just manage the state. 
  // An audio element would go here: const audioRef = useRef(new Audio('/audio/dandiya-loop.mp3'));

  const toggleSound = () => {
    setIsMuted(!isMuted);
    // if (!isMuted) audioRef.current.pause();
    // else audioRef.current.play().catch(e => console.log('Autoplay prevented'));
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 text-white/80 transition-colors backdrop-blur-md cursor-pointer outline-none"
      aria-label="Toggle sound"
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};

export default SoundToggle;
