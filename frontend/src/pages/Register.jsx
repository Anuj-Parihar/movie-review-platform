import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || password.length < 6) {
      return setErr('Provide valid username, email and password (min 6).');
    }
    setLoading(true); setErr(null);
    try {
      await register(username.trim(), email.trim(), password);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      {err && <div className="text-red-600 mb-2 text-sm">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password (min 6)"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <button className="w-full py-2.5 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500">
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <p className="text-sm text-gray-600 mt-3">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
