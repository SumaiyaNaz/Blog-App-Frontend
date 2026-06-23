import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Role is removed - default will be 'user' from backend
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        // role is not sent - backend will use default 'user'
      };
      
      await authService.register(userData);
      toast.success('Identity validated. Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Identity processing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-white dark:bg-[#111111] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151515]"
      >
        <h2 className="font-serif text-3xl font-bold tracking-tight text-center uppercase mb-8 text-neutral-900 dark:text-white">
          Create Identity
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Full Name</label>
            <input 
              type="text" 
              {...register('name', { required: 'Name parameter required' })}
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm focus:outline-none focus:border-amber-600 dark:text-white"
            />
            {errors.name && <p className="text-xs text-red-600 mt-1 uppercase tracking-wider">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Email Address</label>
            <input 
              type="email" 
              {...register('email', { required: 'Email field structured verification required' })}
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm focus:outline-none focus:border-amber-600 dark:text-white"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1 uppercase tracking-wider">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Password</label>
            <input 
              type="password" 
              {...register('password', { 
                required: 'Password parameter required', 
                minLength: { value: 6, message: 'Minimum 6 characters' } 
              })}
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm focus:outline-none focus:border-amber-600 dark:text-white"
            />
            {errors.password && <p className="text-xs text-red-600 mt-1 uppercase tracking-wider">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 p-3 text-xs uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Register Identity'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs tracking-widest uppercase text-neutral-400">
          Have an identity? <Link to="/login" className="text-neutral-900 dark:text-white font-bold underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;