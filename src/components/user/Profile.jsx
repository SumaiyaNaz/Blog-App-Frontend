// src/components/user/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';
import LoadingSpinner from '../common/LoadingSpinner';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = user?.id || user?._id;
        if (userId) {
          const response = await authService.getProfile(userId);
          if (response && response.data) {
            setProfile(response.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111111] px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full border border-neutral-200 dark:border-neutral-800 p-8 bg-neutral-50 dark:bg-[#151515]">
        <h2 className="font-serif text-3xl uppercase tracking-tight mb-6 text-neutral-900 dark:text-white">Identity Dossier</h2>
        <div className="space-y-4 text-sm tracking-wider uppercase text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-6">
          <p><span className="text-neutral-400 block text-xs tracking-widest mb-1">Name Context:</span> <strong className="text-neutral-900 dark:text-white">{profile?.name || user?.name || 'Not provided'}</strong></p>
          <p><span className="text-neutral-400 block text-xs tracking-widest mb-1">Communication Endpoint:</span> <strong className="text-neutral-900 dark:text-white">{profile?.email || user?.email}</strong></p>
          <p><span className="text-neutral-400 block text-xs tracking-widest mb-1">Authorization Clearance:</span> <strong className="text-amber-600 dark:text-amber-400">{profile?.role || user?.role || 'user'}</strong></p>
        </div>
        <button onClick={() => navigate('/update-profile')} className="w-full text-center border border-neutral-900 dark:border-white py-3 text-xs uppercase tracking-widest font-bold text-neutral-900 dark:text-white">
          Modify Identity Context
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;