import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Welcome back.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication error.');
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
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email Address</label>
            <input 
              type="email" 
              {...register('email', { required: 'Email address field required' })}
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm focus:outline-none focus:border-amber-600 dark:text-white"
            />
            {errors.email && <p className="text-xs text-red-600 mt-1 uppercase tracking-wider">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Password</label>
            <input 
              type="password" 
              {...register('password', { required: 'Password field required' })}
              className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm focus:outline-none focus:border-amber-600 dark:text-white"
            />
            {errors.password && <p className="text-xs text-red-600 mt-1 uppercase tracking-wider">{errors.password.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 p-3 text-xs uppercase tracking-widest font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Authorizing...' : 'Access Archive'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs tracking-widest uppercase text-neutral-400">
          No account? <Link to="/register" className="text-neutral-900 dark:text-white font-bold underline">Create identity</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;