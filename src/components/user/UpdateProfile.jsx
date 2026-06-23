// src/components/user/UpdateProfile.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const UpdateProfile = () => {
  const { user, login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({ 
    defaultValues: { 
      name: user?.name || '', 
      email: user?.email || '' 
    } 
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userId = user?.id || user?._id;
      
      // Remove empty password field if not provided
      if (!data.password) {
        delete data.password;
      }
      
      // Update profile in backend
      const response = await authService.updateProfile(userId, data);
      
      // Update user in localStorage and context
      const updatedUser = { 
        ...user, 
        name: data.name, 
        email: data.email,
        // If backend returns updated data, use that
        ...(response?.data || {})
      };
      
      // Save to localStorage directly
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update context using login function with user object
      // This will store the updated user without making a login request
      await login(updatedUser);
      
      toast.success('Identity profile shifted successfully.');
      navigate('/profile');
    } catch (err) {
      toast.error('Failure mutating identity configuration context.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111111] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full border border-neutral-200 dark:border-neutral-800 p-8 bg-neutral-50 dark:bg-[#151515]"
      >
        <h2 className="font-serif text-2xl uppercase mb-6 text-neutral-900 dark:text-white">Modify Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1">Name</label>
            <input 
              type="text" 
              {...register('name', { required: 'Name is required' })} 
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-sm focus:outline-none focus:border-amber-600 dark:text-white" 
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1">Email</label>
            <input 
              type="email" 
              {...register('email', { required: 'Email is required' })} 
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-sm focus:outline-none focus:border-amber-600 dark:text-white" 
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-1">New Password (Optional)</label>
            <input 
              type="password" 
              {...register('password')} 
              className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 p-2 text-sm focus:outline-none focus:border-amber-600 dark:text-white" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 py-3 text-xs uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Commit Structural Shift'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;