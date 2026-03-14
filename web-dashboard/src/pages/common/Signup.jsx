import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../../api';

const Signup = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Veterinarian',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);

    // Map display roles to backend roles
    const roleMapping = {
      'Veterinarian': 'vet',
      'Shelter Manager': 'shelter',
      'Pet Store Owner': 'seller'
    };

    const submissionData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: roleMapping[formData.role]
    };

    try {
      const { data } = await registerApi(submissionData);
      localStorage.setItem('profile', JSON.stringify(data));

      const userRole = data.result.role;
      if (userRole === 'vet') {
        navigate('/dashboard');
      } else if (userRole === 'shelter') {
        navigate('/shelter/dashboard');
      } else if (userRole === 'seller') {
        navigate('/store/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-500 text-sm">Join over 5,000 pet care professionals today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User size={16} className="text-[#00e5ff]" />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Dr. Sarah Thompson"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all"
            required
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail size={16} className="text-[#00e5ff]" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="sarah@petcare.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all"
            required
          />
        </div>

        {/* Account Role */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#00e5ff]" />
            Account Role
          </label>
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all appearance-none"
            >
              <option>Veterinarian</option>
              <option>Shelter Manager</option>
              <option>Pet Store Owner</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ArrowRight size={16} className="rotate-90" />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={16} className="text-[#00e5ff]" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={16} className="text-[#00e5ff]" />
              Confirm
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00e5ff]/20 focus:border-[#00e5ff] transition-all"
              required
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="py-2">
          <label className="flex items-start gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="peer appearance-none w-4 h-4 border border-gray-300 rounded focus:ring-[#00e5ff] checked:bg-[#00e5ff] checked:border-[#00e5ff] transition-all"
                required
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
            <span className="text-[11px] text-gray-500 group-hover:text-gray-700 transition-colors">
              I agree to the <span className="text-[#00e5ff] font-semibold">Terms of Service</span> and <span className="text-[#00e5ff] font-semibold">Privacy Policy</span>.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#00e5ff] hover:bg-[#00cce6] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#00e5ff]/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating Account...' : 'Create Free Account'}
          <ArrowRight size={18} />
        </button>

        {error && (
          <p className="text-red-500 text-xs text-center font-bold mt-2">{error}</p>
        )}

        {/* Switch to Login */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-[#00e5ff] hover:underline"
          >
            Login here
          </button>
        </p>
      </form>

    </div>
  );
};

export default Signup;
