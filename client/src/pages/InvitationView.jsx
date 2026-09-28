import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InvitationExperience from '../components/InvitationExperience';

const InvitationView = () => {
  const { inviteId } = useParams();
  const [loading, setLoading] = useState(true);
  const [targetName, setTargetName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${baseUrl}/api/invitations/${inviteId}`);
        const data = await res.json();
        
        if (data.success) {
          setTargetName(data.invitation.targetName);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching invitation:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [inviteId]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#160714] flex items-center justify-center">
        <div className="text-[#F4C95D] font-serif text-xl animate-pulse">
          Loading... ✨
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#160714] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-3xl text-transparent bg-clip-text bg-gradient-to-br from-[#FFF1F5] to-[#E85B91] mb-4">
          Oops... this invitation doesn't exist ❤️
        </h1>
        <p className="text-white/60">
          The link might be broken or the invitation was removed.
        </p>
      </div>
    );
  }

  return <InvitationExperience inviteId={inviteId} targetName={targetName} />;
};

export default InvitationView;
