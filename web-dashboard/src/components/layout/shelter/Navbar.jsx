import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const user = profile?.result || {};
  const userName = user.name || 'Admin';
  const userRole = user.role === 'shelter' ? 'Shelter Manager' : user.role;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 w-full ml-0">
      <div className="flex items-center gap-8 flex-1">
        <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">Shelter Overview</h2>

        {/* Search Bar */}
        <div className="relative w-96 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search pets, applicants..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-[#00D1C1]/30 focus:ring-0 rounded-full text-sm transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF4D4D] border-2 border-white rounded-full"></span>
        </button>

        {/* Add Pet Button */}
        <button
          onClick={() => navigate('/shelter/add-pet')}
          className="bg-[#00D1C1] text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#00B8A9] transition-all shadow-lg shadow-[#00D1C1]/20"
        >
          <Plus size={18} />
          Add Pet
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-900 leading-none">{userName}</p>
            <p className="text-[10px] text-gray-400 mt-1 capitalize">{userRole}</p>
          </div>
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=f0fdff&color=00D1C1&bold=true`}
              alt="Admin Profile"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-50 border border-white"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <ChevronDown size={16} className="text-gray-400 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};


export default Navbar;
