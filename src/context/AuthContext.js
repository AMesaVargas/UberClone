import React, { useState, useEffect, useContext, createContext } from 'react';
import { logoutFirebase } from '../storage/FirestoreService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = userData => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      const result = await logoutFirebase();
      if (result.success) {
        setUser(null);
      } else {
        console.error('No se pudo cerrar sesión en Firebase:', result.error);
      }
    } catch (error) {
      console.error('Error en el proceso de logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
