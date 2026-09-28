import React, { useState } from 'react';
import FestiveBackground from '../components/FestiveBackground';

const CreatorPage = () => {
  const [targetName, setTargetName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetName, senderEmail })
      });
      const data = await res.json();

      if (data.success) {
        const fullUrl = `${window.location.origin}/i/${data.inviteId}`;
        setInviteUrl(fullUrl);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error creating invite:', err);
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert('Link copied to clipboard! ✨');
  };

  return (
    <FestiveBackground isCelebration={false}>
      <div className="relative z-20 w-full max-w-[400px] mx-auto px-4 flex flex-col items-center justify-center">
        <div className="relative w-full glass-card-premium rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center">
          
          <h1 className="font-serif text-[28px] sm:text-3xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#FFF1F5] via-[#F4C95D] to-[#E85B91] drop-shadow-md whitespace-pre-line mb-6">
            Create Your Dandiya Invitation ❤️
          </h1>

          {inviteUrl ? (
            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-[#F4C95D] font-medium text-[16px]">
                Your invitation is ready! ✨
              </p>
              
              <div className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-[13px] text-white break-all">
                {inviteUrl}
              </div>
              
              <button
                onClick={copyToClipboard}
                className="w-full bg-gradient-to-r from-[var(--color-dandiya-pink)] to-[var(--color-dandiya-coral)] border border-white/20 text-white font-semibold py-3 px-6 rounded-full shadow-[0_4px_15px_rgba(232,91,145,0.4)] hover:scale-105 transition-transform"
              >
                Copy Link
              </button>
              
              <button
                onClick={() => setInviteUrl('')}
                className="mt-2 text-white/50 text-sm hover:text-white transition-colors underline"
              >
                Create Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreate} className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-white/80 text-sm pl-2">Her Name</label>
                <input
                  type="text"
                  required
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#F4C95D] transition-colors placeholder-white/30"
                  placeholder="e.g. Samriddhi"
                  maxLength={50}
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-white/80 text-sm pl-2">Your Email <span className="text-xs text-white/40">(for notifications)</span></label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-[#F4C95D] transition-colors placeholder-white/30"
                  placeholder="e.g. person@example.com"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[var(--color-dandiya-pink)] to-[var(--color-dandiya-coral)] border border-white/20 text-white font-semibold py-3 px-6 rounded-full shadow-[0_4px_15px_rgba(232,91,145,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              >
                {loading ? 'Creating...' : 'Create Invitation ❤️'}
              </button>
            </form>
          )}
          
        </div>
      </div>
    </FestiveBackground>
  );
};

export default CreatorPage;
