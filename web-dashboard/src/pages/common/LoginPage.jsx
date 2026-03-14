import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import Login from './Login';
import Signup from './Signup';
import illustration from '../../assets/auth_illustration.png';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4 relative">
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-gray-400 hover:text-[#00e5ff] font-bold transition-all group z-50"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:shadow-[#00e5ff]/20 transition-all">
          <ArrowLeft size={20} />
        </div>
        <span className="hidden md:inline">Back to Home</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-10 animate-in fade-in slide-in-from-top duration-700">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-10 h-10 bg-[#00e5ff] rounded-xl flex items-center justify-center shadow-lg shadow-[#00e5ff]/30">
            <PawPrint className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black text-gray-800 tracking-tight">PetCare<span className="text-[#00e5ff]">+</span></span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">PetCare+ Service Dashboard</h1>
        <p className="text-gray-500 font-medium">Unified management for pet care professionals</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1000px] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-white/50 overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-in zoom-in-95 duration-700">
        
        {/* Left Side: Forms */}
        <div className="flex-1 p-8 md:p-12 flex flex-col">
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 p-1.5 rounded-full w-full max-w-[240px] mb-10 mx-auto md:mx-0">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
                activeTab === 'login' ? 'bg-[#00e5ff] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
                activeTab === 'signup' ? 'bg-[#00e5ff] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 flex items-center">
            {activeTab === 'login' ? (
              <div className="w-full animate-in slide-in-from-left duration-500">
                <Login onSwitchToSignup={() => setActiveTab('signup')} />
              </div>
            ) : (
              <div className="w-full animate-in slide-in-from-right duration-500">
                <Signup onSwitchToLogin={() => setActiveTab('login')} />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Showcase */}
        <div className="flex-1 bg-linear-to-br from-[#e0faff] to-[#f0fdff] p-8 md:p-12 hidden md:flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 w-full max-w-[400px]">
            {/* Image Container */}
            <div className="relative mb-10 group">
              <div className="absolute inset-0 bg-[#00e5ff]/10 rounded-4xl transform rotate-3 scale-105 group-hover:rotate-1 transition-transform duration-500" />
              <div className="relative bg-white p-3 rounded-4xl shadow-xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src={illustration} 
                  alt="PetCare Dashboard Illustration" 
                  className="w-full h-auto rounded-3xl"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50 animate-bounce duration-3000">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 leading-none">Dr. Sarah Thompson</p>
                    <p className="text-[10px] text-gray-400 mt-1">Chief Veterinarian</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to care for more?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">
                Join over 5,000 veterinary clinics, shelters, and pet stores streamlining their daily operations with PetCare+.
              </p>

              {/* Stats/Badges */}
              <div className="flex items-center justify-center gap-6">
                {[
                  { icon: Mail, label: 'Clinics' },
                  { icon: Phone, label: 'Shelters' },
                  { icon: MapPin, label: 'Stores' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#00e5ff]">
                      <item.icon size={20} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="flex items-center justify-center gap-8 mb-6 opacity-40">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
        </div>
        <p className="text-xs text-gray-400">
          © 2024 PetCare+ Technologies Inc. | All rights reserved. | <button className="hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
