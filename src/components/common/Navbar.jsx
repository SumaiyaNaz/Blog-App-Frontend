import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111111] sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-widest uppercase font-bold text-neutral-900 dark:text-neutral-100">
          CHRONICLE
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
          <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400">Home</Link>
          <Link to="/about" className="hover:text-amber-600 dark:hover:text-amber-400">About</Link>
          {user ? (
            <>
              <Link to="/my-blogs" className="hover:text-amber-600 dark:hover:text-amber-400">My Workspace</Link>
              <Link to="/create-blog" className="hover:text-amber-600 dark:hover:text-amber-400">Write</Link>
              <Link to="/profile" className="hover:text-amber-600 dark:hover:text-amber-400">Profile</Link>
              <button onClick={handleLogout} className="hover:text-red-600 border border-neutral-900 dark:border-neutral-100 px-3 py-1">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-amber-600 dark:hover:text-amber-400">Login</Link>
              <Link to="/register" className="bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 px-4 py-2 hover:opacity-90">Register</Link>
            </>
          )}
          <button onClick={toggleTheme} className="text-xl">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-xl">
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111111] px-6 py-6 space-y-4 flex flex-col text-sm uppercase tracking-widest">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          {user ? (
            <>
              <Link to="/my-blogs" onClick={() => setIsOpen(false)}>My Workspace</Link>
              <Link to="/create-blog" onClick={() => setIsOpen(false)}>Write</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-left text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;