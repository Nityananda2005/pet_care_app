import { Search, Bell } from 'lucide-react';

const Navbar = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const user = profile?.result || {};
  const userName = user.name || 'Owner';
  const userRole = user.role === 'seller' ? 'Store Owner' : user.role;

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 w-full ml-0">
      <div className="flex items-center gap-8 flex-1">
        {/* Search Bar */}
        <div className="relative w-96 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products, orders..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-[#00D1C1]/30 focus:ring-0 rounded-lg text-sm transition-all"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#FF4D4D] border-2 border-white rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <h4 className="text-xs font-bold text-gray-900">{userName}</h4>
            <p className="text-[10px] text-gray-400 font-medium capitalize">{userRole}</p>
          </div>
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=F8FAFC&color=00D1C1&bold=true`}
              alt="Admin Profile"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-50 border border-white bg-gray-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
};


export default Navbar;
