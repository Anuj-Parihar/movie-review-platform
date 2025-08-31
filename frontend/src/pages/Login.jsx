import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const from = location.state?.from || '/';

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!email || !password) return setErr('Fill both fields.');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {err && <div className="text-red-600 mb-2 text-sm">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
          {loading ? 'Signing in…' : 'Login'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-3">
        No account? <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
