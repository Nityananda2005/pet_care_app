import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu as MenuIcon, X } from 'lucide-react';

// Change this URL to point to your main web application (frontend) deployment.
const WEB_APP_URL = import.meta.env.VITE_WEB_APP_URL || 'http://localhost:5173';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Solutions', hasDropdown: true },
    { name: 'Features', hasDropdown: false },
    { name: 'Pricing', hasDropdown: false },
    { name: 'Company', hasDropdown: true },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
             <div className="shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-[#00D1C1] to-[#00B4B4] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">+</span>
             </div>
             <span className="text-2xl font-black tracking-tight text-[#00D1C1]">PetCare<span className="text-black/10">+</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="group flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-black transition-colors"
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={14} className="text-gray-300 group-hover:text-black transition-colors" />
                )}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="text-sm font-bold text-gray-900 hover:text-[#00D1C1] transition-colors">
              Log In
            </Link>
            <button
              onClick={() => (window.location.href = WEB_APP_URL)}
              className="px-6 py-2.5 bg-[#00D1C1] hover:bg-[#00B8A9] text-white text-sm font-extrabold rounded-full shadow-lg shadow-[#00D1C1]/20 transition-all"
            >
              Web App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 hover:text-black focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="block text-base font-bold text-gray-700 hover:text-[#00D1C1]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-4">
              <Link to="/login" className="text-center font-bold text-gray-900" onClick={() => setIsOpen(false)}>
                Log In
              </Link>
              <button
                onClick={() => (window.location.href = WEB_APP_URL)}
                className="w-full py-3 bg-[#00D1C1] text-white font-extrabold rounded-full"
              >
                Web App
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
