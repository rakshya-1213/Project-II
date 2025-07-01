import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setCurrentUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('userData');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, you would validate credentials with your backend here
    // For now, we're just storing in localStorage and setting the current user
    
    const userToStore = {
      ...userData,
      role: userData.role || 'member' // Default to member if no role specified
    };
    
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userToStore));
    localStorage.setItem('userName', userToStore.name || userToStore.username);
    
    // Update state
    setCurrentUser(userToStore);
    
    return userToStore;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userData');
    setCurrentUser(null);
  };

  // Check if user is admin
  const isAdmin = currentUser?.role === 'admin';

  const value = {
    user: currentUser,
    isAdmin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;