// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
        return parsed;
      } catch (e) {
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  });

  const login = async (loginData) => {
    try {
      // If loginData is already a user object (from update profile), just set it
      if (loginData && loginData.id && !loginData.password) {
        setUser(loginData);
        localStorage.setItem('user', JSON.stringify(loginData));
        return;
      }

      // Otherwise, it's a login attempt with email/password
      const response = await authService.login(loginData);
      
      if (response.status && response.token) {
        // Decode the token
        const decoded = jwtDecode(response.token);
        
        // Fetch full user profile to get name
        try {
          const profileResponse = await authService.getProfile(decoded.id);
          const userProfile = profileResponse?.data || {};
          
          // Create user object with all data
          const userData = {
            id: decoded.id,
            email: decoded.email,
            name: userProfile.name || decoded.name || '',
            role: userProfile.role || decoded.role || 'user',
            token: response.token
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return response;
        } catch (profileError) {
          // If profile fetch fails, still set the user with token data
          const userData = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name || '',
            role: decoded.role || 'user',
            token: response.token
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return response;
        }
      } else {
        throw new Error('Login failed - no token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('theme');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};