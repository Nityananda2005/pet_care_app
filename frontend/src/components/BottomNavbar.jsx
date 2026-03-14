import React from 'react';
import { Home, ClipboardList, Calendar, Heart, User } from 'lucide-react';

const BottomNavbar = ({ currentRoute, setRoute }) => {
    const navItems = [
        { label: 'Home', icon: Home, route: '#/' },
        { label: 'Pets', icon: ClipboardList, route: '#/pets' },
        { label: 'Appointments', icon: Calendar, route: '#/appointments' },
        { label: 'Adoption', icon: Heart, route: '#/adoption' },
        { label: 'Profile', icon: User, route: '#/profile' },
    ];

    return (
        <nav className="bottom-navbar">
            {navItems.map((item) => (
                <button
                    key={item.label}
                    className={`nav-item ${currentRoute === item.route ? 'active' : ''}`}
                    onClick={() => {
                        window.location.hash = item.route;
                        setRoute(item.route);
                    }}
                >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNavbar;
