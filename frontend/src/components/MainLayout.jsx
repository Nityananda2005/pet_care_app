import { Bell, ChevronLeft, Info, SlidersHorizontal, Plus } from 'lucide-react';
import BottomNavbar from './BottomNavbar';
import logo from '../assets/dog-avatar.png';
import buddyAvatar from '../assets/buddy-avatar.png';

const MainLayout = ({ children, currentRoute, setRoute }) => {
    const getPageTitle = () => {
        switch (currentRoute) {
            case '#/pets': return 'My Pets';
            case '#/pet-profile': return "Buddy's Profile";
            case '#/appointments': return 'Find a Vet';
            case '#/community': return 'Community';
            case '#/adoption': return 'Pet Adoption';
            case '#/lost-found': return 'Lost & Found';
            case '#/profile': return 'My Profile';
            case '#/alerts': return 'Alerts & Notifications';
            case '#/ai-assistant': return 'AI Health Assistant';
            case '#/report-rescue': return 'Report Emergency';
            default: return 'PawsomeCare';
        }
    };

    return (
        <div className="mobile-app-wrapper">
            <header className="app-header">
                {['#/pet-profile', '#/appointments', '#/lost-found', '#/adoption', '#/ai-assistant', '#/report-rescue'].includes(currentRoute) ? (
                    <button className="icon-button" onClick={() => {
                        window.location.hash = currentRoute === '#/pet-profile' ? '#/pets' : '#/';
                        setRoute(currentRoute === '#/pet-profile' ? '#/pets' : '#/');
                    }}>
                        <ChevronLeft size={24} />
                    </button>
                ) : (
                    <div className="header-logo">
                        <img src={logo} alt="PawsomeCare Logo" />
                    </div>
                )}

                <span>{getPageTitle()}</span>

                {currentRoute === '#/pet-profile' ? (
                    <button className="icon-button">
                        <Info size={24} color="#111" />
                    </button>
                ) : currentRoute === '#/appointments' || currentRoute === '#/adoption' ? (
                    <button className="icon-button notification-badge">
                        <SlidersHorizontal size={24} color="#111" />
                    </button>
                ) : currentRoute === '#/community' ? (
                    <button className="icon-button" onClick={() => window.dispatchEvent(new CustomEvent('open-create-post'))}>
                        <Plus size={24} color="#111" />
                    </button>
                ) : (
                    <button className="icon-button notification-badge" onClick={() => {
                        window.location.hash = '#/alerts';
                        setRoute('#/alerts');
                    }}>
                        <Bell size={24} />
                    </button>
                )}
            </header>

            <main className="app-main-content">
                {children}
            </main>

            <BottomNavbar currentRoute={currentRoute} setRoute={setRoute} />
        </div>
    );
};

export default MainLayout;
