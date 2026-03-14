import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../api';

const Login = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await loginApi({ email, password });

      const userRole = data.result.role;

      // Verification: ensure the user role matches what they picked (optional but good for dashboard context)
      // Actually, we should just redirect based on what the server says their role is.

      localStorage.setItem('profile', JSON.stringify(data));

      if (userRole === 'vet') {
        navigate('/dashboard'); // Vet dashboard
      } else if (userRole === 'shelter') {
        navigate('/shelter/dashboard');
      } else if (userRole === 'seller') {
        navigate('/store/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized role for dashboard access.');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back!</h2>
        <p className="text-gray-500 text-sm">Enter your credentials to access your dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail size={16} className="text-[#00e5ff]" />
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@clinic.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Lock size={16} className="text-[#00e5ff]" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer appearance-none w-4 h-4 border border-gray-300 rounded focus:ring-[#00e5ff] checked:bg-[#00e5ff] checked:border-[#00e5ff] transition-all"
              />
              <svg
                className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Remember Me</span>
          </label>
          <button type="button" className="text-xs font-semibold text-[#00e5ff] hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#00e5ff] hover:bg-[#00cce6] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#00e5ff]/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Verifying...' : 'Login to Dashboard'}
          <ArrowRight size={18} />
        </button>

        {error && (
          <p className="text-red-500 text-xs text-center font-bold mt-2">{error}</p>
        )}


        {/* Switch to Signup */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-[#00e5ff] hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
