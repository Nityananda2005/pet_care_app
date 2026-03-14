import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Activity,
    User,
    Settings,
    LogOut,
    Bell
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('profile');
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'User Management', path: '/admin/users' },
        { icon: Activity, label: 'System Logs', path: '/admin/logs' },
        { icon: ShieldCheck, label: 'Permissions', path: '/admin/permissions' },
        { icon: User, label: 'Profile', path: '/admin/profile' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <aside className="w-64 h-screen bg-gray-900 text-gray-400 border-r border-gray-800 flex flex-col fixed left-0 top-0 z-50">
            {/* Logo */}
            <div className="p-6 flex items-center gap-2 border-b border-gray-800 mb-4">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">🐾</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Admin<span className="text-teal-500">Panel</span></span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                                            : 'hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-500'} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* System Status */}
            <div className="px-6 mb-6">
                <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-800">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-teal-500 mb-2">System Status</p>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-gray-300 font-medium">All systems green</span>
                    </div>
                    <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-full w-[94%]" />
                    </div>
                </div>
            </div>

            {/* Logout */}
            <div className="p-6 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 text-gray-500 hover:text-red-400 transition-colors text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-800"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
