import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data);
    } catch (err) {
      setUser(null);
      // token invalid -> remove
      localStorage.removeItem('token');
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMe();
    } else {
      setLoadingAuth(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await API.post('/auth/register', { username, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loadingAuth, login, register, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}
