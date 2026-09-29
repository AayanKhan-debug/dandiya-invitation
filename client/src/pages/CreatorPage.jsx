import React, { useState } from 'react';
import FestiveBackground from '../components/FestiveBackground';
import { Link } from 'react-router-dom';

const CreatorPage = () => {
  const [targetName, setTargetName] = useState('');
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');
  const [manageToken, setManageToken] = useState('');
  const [error, setError] = useState('');
  const [pushStatus, setPushStatus] = useState('idle'); // idle, requesting, subscribed, denied, unsupported, error

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetName })
      });
      const data = await res.json();

      if (data.success) {
        const fullUrl = `${window.location.origin}/i/${data.inviteId}`;
        setInviteUrl(fullUrl);
        setManageToken(data.manageToken);
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

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const handleEnablePush = async () => {
    try {
      setPushStatus('requesting');
      if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
        setPushStatus('unsupported');
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');
      
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setPushStatus('denied');
        return;
      }

      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY?.trim();
      if (!vapidPublicKey) {
         throw new Error('VITE_VAPID_PUBLIC_KEY is missing from environment variables');
      }
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/invitations/${manageToken}/push-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      });
      
      const data = await res.json();
      if(data.success) {
         setPushStatus('subscribed');
      } else {
         console.error('API Error:', data.message);
         setError(`API Error: ${data.message}`);
         setPushStatus('error');
      }
    } catch (err) {
      console.error('Push error:', err);
      setError(`Push setup failed: ${err.message}`);
      setPushStatus('error');
    }
  };

  return (
    <FestiveBackground isCelebration={false}>
      <div className="relative z-20 w-full max-w-[400px] mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-10">
        <div className="relative w-full glass-card-premium rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center">
          
          <h1 className="font-serif text-[28px] sm:text-3xl font-bold leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-[#FFF1F5] via-[#F4C95D] to-[#E85B91] drop-shadow-md whitespace-pre-line mb-6">
            Create Your Dandiya Invitation ❤️
          </h1>

          {inviteUrl ? (
            <div className="w-full flex flex-col items-center gap-6">
              <div className="flex flex-col gap-3 w-full">
                <p className="text-[#F4C95D] font-medium text-[16px]">
                  Your Dandiya invitation is ready ❤️
                </p>
                <div className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-[13px] text-white break-all">
                  {inviteUrl}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-full hover:bg-white/20 transition-colors"
                >
                  Copy Invitation Link
                </button>
              </div>

              <div className="w-full h-px bg-white/20"></div>

              <div className="flex flex-col gap-3 w-full items-center">
                <p className="text-white/90 text-sm">Want to know when she says YES?</p>
                
                {pushStatus === 'idle' && (
                  <button
                    onClick={handleEnablePush}
                    className="w-full bg-gradient-to-r from-[var(--color-dandiya-pink)] to-[var(--color-dandiya-coral)] border border-white/20 text-white font-semibold py-3 px-6 rounded-full shadow-[0_4px_15px_rgba(232,91,145,0.4)] hover:scale-105 transition-transform"
                  >
                    🔔 Enable Notifications
                  </button>
                )}

                {pushStatus === 'requesting' && (
                  <button disabled className="w-full bg-white/20 text-white py-3 px-6 rounded-full opacity-70">
                    Requesting permission...
                  </button>
                )}

                {pushStatus === 'subscribed' && (
                  <div className="w-full bg-green-500/20 border border-green-500/40 text-green-200 py-3 px-6 rounded-xl text-sm">
                    ✅ Notifications enabled! We'll alert you when she says YES!
                  </div>
                )}

                {pushStatus === 'denied' && (
                  <div className="w-full bg-red-500/20 border border-red-500/40 text-red-200 py-3 px-6 rounded-xl text-sm">
                    Notifications are blocked. You can still check your private status page anytime.
                  </div>
                )}

                {pushStatus === 'unsupported' && (
                  <div className="w-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 py-3 px-6 rounded-xl text-sm">
                    Browser notifications aren't supported here. Use the status link instead.
                  </div>
                )}

                {pushStatus === 'error' && (
                  <div className="w-full bg-red-500/20 border border-red-500/40 text-red-200 py-3 px-6 rounded-xl text-sm">
                    {error || 'Failed to enable notifications. Please use the status link instead.'}
                  </div>
                )}

                <div className="mt-2 flex flex-col items-center gap-2 text-sm">
                  <p className="text-white/50 text-[12px]">You can also check your private status page anytime.</p>
                  <Link to={`/status/${manageToken}`} className="text-[#F4C95D] hover:text-white transition-colors underline">
                    View Status Page
                  </Link>
                </div>
              </div>

              <button
                onClick={() => {
                  setInviteUrl('');
                  setManageToken('');
                  setPushStatus('idle');
                }}
                className="mt-2 text-white/40 text-xs hover:text-white transition-colors"
              >
                Create Another Invitation
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
