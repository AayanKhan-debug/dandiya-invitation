import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FestiveBackground from '../components/FestiveBackground';

const StatusPage = () => {
  const { manageToken } = useParams();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${baseUrl}/api/status/${manageToken}`);
        const data = await res.json();
        
        if (data.success) {
          setStatus(data.status);
        } else {
          setError(data.message || 'Status not found');
        }
      } catch (err) {
        console.error('Error fetching status:', err);
        setError('Failed to load status');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
  }, [manageToken]);

  return (
    <FestiveBackground isCelebration={status?.response === 'yes'}>
      <div className="relative z-20 w-full max-w-[400px] mx-auto px-4 flex flex-col items-center justify-center h-full">
        <div className="relative w-full glass-card-premium rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center">
          
          <h1 className="font-serif text-[28px] sm:text-3xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#FFF1F5] via-[#F4C95D] to-[#E85B91] drop-shadow-md mb-6">
            Invitation Status ✨
          </h1>

          {loading ? (
            <p className="text-white/60">Loading...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : status.response === 'pending' ? (
            <div className="flex flex-col gap-4">
              <p className="text-xl text-[#F4C95D]">Waiting for her answer... 👀</p>
              <p className="text-white/70 text-sm">
                Check back here later or wait for a notification!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-3xl font-bold text-[#E85B91]">🎉 SHE SAID YES!</p>
              <p className="text-xl text-white">
                {status.targetName} accepted your Dandiya invitation ❤️
              </p>
              <div className="bg-black/30 rounded-xl p-4 mt-4 text-sm text-white/80 space-y-2">
                <p>NO clicks: {status.noClickCount}</p>
                <p>Accepted: {new Date(status.respondedAt).toLocaleString()}</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </FestiveBackground>
  );
};

export default StatusPage;
