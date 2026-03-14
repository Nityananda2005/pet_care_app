import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  History,
  User,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/login');
  };



  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CalendarDays, label: 'Appointments', path: '/appointments' },
    // { icon: FileText, label: 'Medical Records', path: '/medical-records' },
    // { icon: History, label: 'Treatment History', path: '/treatment-history' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#00A99D] rounded-lg flex items-center justify-center">
          <span className="text-white text-xl font-bold">🐾</span>
        </div>
        <span className="text-xl font-bold text-[#00A99D]">PetCare+</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-[#E6F6F5] text-[#00A99D]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <item.icon size={20} className={isActive ? 'text-[#00A99D]' : 'text-gray-400'} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Clinic Status */}
      <div className="px-6 mb-4">
        <div className="bg-[#f8fdfd] rounded-2xl p-4 border border-[#e6f6f5]">
          <p className="text-[10px] uppercase tracking-wider font-bold text-[#00A99D] mb-1">Clinic Status</p>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-600">Open today</span>
            <span className="font-semibold text-gray-900">08:00 - 20:00</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
