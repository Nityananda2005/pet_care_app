import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const user = profile?.result || {};
  const userName = user.name || 'Doctor';
  const userRole = user.role === 'vet' ? 'Chief Veterinarian' : user.role;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search patients, owners, or records..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-[#00A99D] focus:ring-0 rounded-full text-sm transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 leading-none">{userName}</p>
            <p className="text-[11px] text-gray-500 mt-1 capitalize">{userRole}</p>
          </div>
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=E6F6F5&color=00A99D&bold=true`}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-[#E6F6F5]"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <ChevronDown size={16} className="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};


export default Navbar;
