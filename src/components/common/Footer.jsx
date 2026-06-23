import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111111] mt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start justify-between gap-8">
        
        <div className="max-w-sm">
          <h3 className="font-serif text-xl tracking-widest uppercase font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            CHRONICLE
          </h3>
          <p className="text-xs uppercase tracking-wider text-neutral-400 font-sans leading-relaxed">
            A quiet sanctuary for long-form critical analysis, architecture, and raw digital artifact presentation.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6 text-xs uppercase tracking-widest font-medium">
          <div className="flex flex-col space-y-3">
            <span className="text-neutral-400 font-bold">Index</span>
            <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400">Home Feed</Link>
            <Link to="/about" className="hover:text-amber-600 dark:hover:text-amber-400">Manifesto</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="text-neutral-400 font-bold">Syndicate</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400">X / Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400">GitHub Workspace</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center text-[10px] uppercase tracking-widest text-neutral-400">
        <span>© {currentYear} CHRONICLE INC.</span>
        <span>All structural layout contexts preserved.</span>
      </div>
    </footer>
  );
};

export default Footer;