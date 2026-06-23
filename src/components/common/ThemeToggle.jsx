import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle structural light parameters"
      className="p-2 border border-neutral-200 dark:border-neutral-800 rounded-none bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 text-neutral-900 dark:text-neutral-100"
    >
      {theme === 'dark' ? (
        <FiSun className="w-4 h-4 text-amber-500" />
      ) : (
        <FiMoon className="w-4 h-4 text-neutral-950" />
      )}
    </button>
  );
};

export default ThemeToggle;