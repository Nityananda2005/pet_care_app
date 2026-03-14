import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-100 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00D1C1] rounded-lg flex items-center justify-center text-white font-black">
                   +
                </div>
                <span className="text-xl font-black text-[#00D1C1]">PetCare<span className="text-black/10">+</span></span>
             </div>
             <p className="text-gray-400 font-medium max-w-sm leading-relaxed">
                PetCare+ is the world's most trusted software for veterinary clinics, animal shelters, and pet retail stores. Empowering care with technology.
             </p>
             <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                   <a key={idx} href="#" className="w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#00D1C1] hover:border-[#00D1C1]/20 transition-all">
                      <Icon size={18} />
                   </a>
                ))}
             </div>
          </div>

          {/* Links Columns */}
          <div>
             <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-8">Solutions</h4>
             <ul className="space-y-4">
                {['Veterinary Clinic', 'Shelter Intake', 'Pet Store POS', 'Mobile Grooming'].map((link) => (
                   <li key={link}>
                      <a href="#" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">{link}</a>
                   </li>
                ))}
             </ul>
          </div>

          <div>
             <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-8">Resources</h4>
             <ul className="space-y-4">
                {['Blog', 'Documentation', 'Community', 'Help Center'].map((link) => (
                   <li key={link}>
                      <a href="#" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">{link}</a>
                   </li>
                ))}
             </ul>
          </div>

          <div>
             <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-8">Legal</h4>
             <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'].map((link) => (
                   <li key={link}>
                      <a href="#" className="text-sm font-bold text-gray-500 hover:text-black transition-colors">{link}</a>
                   </li>
                ))}
             </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-xs font-bold text-gray-400">© 2026 PetCare+ Platforms. All rights reserved.</p>
         <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">All Systems Operational</span>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
