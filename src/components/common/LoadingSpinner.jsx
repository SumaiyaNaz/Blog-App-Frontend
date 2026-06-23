import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullPage = false }) => {
  const spinnerContainer = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-t border-neutral-900 dark:border-white rounded-full"
      />
      <span className="text-[10px] uppercase tracking-widest text-neutral-400 animate-pulse">
        Polling Archive...
      </span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#111111] transition-colors duration-300">
        {spinnerContainer}
      </div>
    );
  }

  return <div className="py-12 flex justify-center w-full">{spinnerContainer}</div>;
};

export default LoadingSpinner;