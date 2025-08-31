import React, { createContext, useContext, useEffect, useReducer } from 'react';
import API from '../api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const initial = { user: null, loading: true, error: null };

function reducer(state, action) {
  switch(action.type) {
    case 'SET_USER': return { ...state, user: action.payload, loading: false };
    case 'CLEAR_USER': return { ...state, user: null, loading: false };
    case 'LOADING': return { ...state, loading: true };
    case 'ERROR': return { ...state, error: action.payload, loading: false };
    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  async function fetchMe() {
    dispatch({ type: 'LOADING' });
    try {
      const { data } = await API.get('/auth/me');
      dispatch({ type: 'SET_USER', payload: data });
    } catch (err) {
      localStorage.removeItem('token');
      dispatch({ type: 'CLEAR_USER' });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchMe();
    else dispatch({ type: 'CLEAR_USER' });
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    dispatch({ type: 'SET_USER', payload: data.user });
    return data;
  };

  const register = async (username, email, password) => {
    const { data } = await API.post('/auth/register', { username, email, password });
    localStorage.setItem('token', data.token);
    dispatch({ type: 'SET_USER', payload: data.user });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'CLEAR_USER' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}
