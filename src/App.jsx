// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { AppRoutes } from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="bg-white dark:bg-[#111111] min-h-screen text-neutral-900 dark:text-neutral-100 antialiased transition-colors duration-300">
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#111', color: '#fff', borderRadius: '0px', fontSize: '12px', letterSpacing: '0.1em' } }} />
            <Navbar />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#111111]">
                <div className="w-6 h-6 border-t border-neutral-950 dark:border-white rounded-full animate-spin"></div>
              </div>
            }>
              <AppRoutes />
            </Suspense>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;