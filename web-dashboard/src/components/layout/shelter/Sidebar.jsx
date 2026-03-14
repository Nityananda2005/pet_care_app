import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Dog,
  FileHeart,
  MapPin,
  User,
  Settings,
  LogOut,
  ShieldAlert
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/login');
  };


  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/shelter/dashboard' },
    { icon: Dog, label: 'Pets for Adoption', path: '/shelter/pets' },
    { icon: FileHeart, label: 'Adoption Requests', path: '/shelter/requests' },
    { icon: ShieldAlert, label: 'Rescue Operations', path: '/shelter/rescues' },
  ];

  const accountItems = [
    { icon: User, label: 'Profile', path: '/shelter/profile' },
    { icon: Settings, label: 'Settings', path: '/shelter/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#00A99D] rounded-lg flex items-center justify-center shadow-lg shadow-[#00A99D]/20">
          <span className="text-white text-xl font-bold">🐾</span>
        </div>
        <span className="text-xl font-bold text-[#00A99D]">PetCare+</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-[#00D1C1]/10 text-[#00A99D] shadow-sm'
                    : 'text-gray-500 hover:bg-white hover:text-gray-900'
                    }`}
                >
                  <item.icon size={20} className={isActive ? 'text-[#00A99D]' : 'text-gray-400'} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Account Section */}
        <div className="mt-8">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Account</p>
          <ul className="space-y-2">
            {accountItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                      ? 'bg-[#00D1C1]/10 text-[#00A99D]'
                      : 'text-gray-500 hover:bg-white hover:text-gray-900'
                      }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-[#00A99D]' : 'text-gray-400'} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium w-full px-4 py-2 rounded-xl hover:bg-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
