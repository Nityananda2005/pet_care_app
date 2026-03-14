import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ClipboardList,
  User,
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profile');
    navigate('/login');
  };


  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/store/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/store/products' },
    { icon: Package, label: 'Inventory', path: '/store/inventory' },
    { icon: ClipboardList, label: 'Orders', path: '/store/orders' },
  ];

  const accountItems = [
    { icon: User, label: 'Profile', path: '/store/profile' },
    { icon: Settings, label: 'Settings', path: '/store/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-[#F8FAFC] border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#00D1C1] rounded-lg flex items-center justify-center shadow-lg shadow-[#00D1C1]/20">
          <span className="text-white text-xl font-bold">🐾</span>
        </div>
        <span className="text-xl font-bold text-[#00D1C1]">PetCare+</span>
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
                    : 'text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-100'
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
        <div className="mt-auto pt-8 mb-4">
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
                    <item.icon size={18} className={isActive ? 'text-[#00A99D]' : 'text-gray-400'} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Logout & Collapse */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium w-full px-4 py-2.5 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>


        <button className="w-full flex items-center justify-center p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-gray-600 transition-all">
          <ChevronLeft size={16} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
