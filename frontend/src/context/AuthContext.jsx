import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user session already exists in LocalStorage
    const storedUser = localStorage.getItem('blogsphere_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user auth state', e);
        localStorage.removeItem('blogsphere_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('blogsphere_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogsphere_user');
  };

  const updateUserProfileState = (updatedProfile) => {
    setUser((prev) => {
      if (!prev) return null;
      const newUser = {
        ...prev,
        name: updatedProfile.name,
        profileImage: updatedProfile.profileImage,
      };
      localStorage.setItem('blogsphere_user', JSON.stringify(newUser));
      return newUser;
    });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUserProfileState,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
