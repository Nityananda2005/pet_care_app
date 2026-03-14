import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import PetsPage from './pages/PetsPage';
import PetDetailsPage from './pages/PetDetailsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import AdoptionPage from './pages/AdoptionPage';
import LostPetsPage from './pages/LostPetsPage';
import AlertsPage from './pages/AlertsPage';
import AIHealthAssistant from './pages/AIHealthAssistant';
import ReportRescue from './pages/ReportRescue';
import MainLayout from './components/MainLayout';
import { ToastProvider } from './components/Toast';
function App() {
  const [route, setRoute] = useState(window.location.hash || '#/welcome');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/welcome');
      setUser(JSON.parse(localStorage.getItem('profile')));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // If not logged in, only allow welcome, login or register routes
  if (!user) {
    return (
      <div className="mobile-app-wrapper">
        <main className="app-main-content" style={{ padding: route === '#/welcome' ? '0' : '1.5rem' }}>
          {(() => {
            switch (route) {
              case '#/register': return <RegisterPage />;
              case '#/login': return <LoginPage />;
              default: return <WelcomePage />;
            }
          })()}
        </main>
      </div>
    );
  }

  // If logged in, wrap the app content in MainLayout
  const renderContent = () => {
    switch (route) {
      case '#/pets': return <PetsPage />;
      case '#/pet-profile': return <PetDetailsPage />;
      case '#/appointments': return <AppointmentsPage />;
      case '#/community': return <CommunityPage />;
      case '#/adoption': return <AdoptionPage />;
      case '#/lost-found': return <LostPetsPage />;
      case '#/profile': return <ProfilePage />;
      case '#/alerts': return <AlertsPage />;
      case '#/ai-assistant': return <AIHealthAssistant />;
      case '#/report-rescue': return <ReportRescue />;
      default: return <HomePage user={user} />;
    }
  };

  return (
    <MainLayout currentRoute={route} setRoute={setRoute}>
      {renderContent()}
    </MainLayout>
  );
}

export default function AppWithToast() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}
