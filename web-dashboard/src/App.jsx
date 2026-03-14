import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import VetSidebar from './components/layout/vet/Sidebar';
import VetNavbar from './components/layout/vet/Navbar';
import ShelterSidebar from './components/layout/shelter/Sidebar';
import ShelterNavbar from './components/layout/shelter/Navbar';
import StoreSidebar from './components/layout/store/Sidebar';
import StoreNavbar from './components/layout/store/Navbar';
import AdminSidebar from './components/layout/admin/Sidebar';
import DashboardRoutes from './routes/DashboardRoutes';
import LandingPage from './landing/LandingPage';
import LoginPage from './pages/common/LoginPage';

import { useNavigate, Navigate } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileStr = localStorage.getItem('profile');
  const profile = profileStr ? JSON.parse(profileStr) : null;
  const userRole = profile?.result?.role;

  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isLandingPage) {
    return <LandingPage />;
  }

  if (isAuthPage) {
    if (profile) {
      // If already logged in, redirect to their role dashboard
      if (userRole === 'vet') return <Navigate to="/dashboard" />;
      if (userRole === 'shelter') return <Navigate to="/shelter/dashboard" />;
      if (userRole === 'seller') return <Navigate to="/store/dashboard" />;
      if (userRole === 'admin') return <Navigate to="/admin/dashboard" />;
    }
    return <LoginPage />;
  }

  // If not logged in and trying to access dashboard, go to login
  if (!profile) {
    return <Navigate to="/login" />;
  }

  const isShelter = location.pathname.startsWith('/shelter');
  const isStore = location.pathname.startsWith('/store');
  const isAdmin = location.pathname.startsWith('/admin');
  const isVet = !isShelter && !isStore && !isAdmin && (location.pathname === '/dashboard' || location.pathname === '/' || !isAuthPage);

  // Simple role protection: ensure they don't access dashboards of other roles
  if (isShelter && userRole !== 'shelter') return <Navigate to="/login" />;
  if (isStore && userRole !== 'seller') return <Navigate to="/login" />;
  if (isAdmin && userRole !== 'admin') return <Navigate to="/login" />;
  if (isVet && userRole !== 'vet') {
    // If they are on a generic path like /dashboard but are a different role, fix it
    if (userRole === 'shelter') return <Navigate to="/shelter/dashboard" />;
    if (userRole === 'seller') return <Navigate to="/store/dashboard" />;
    if (userRole === 'admin') return <Navigate to="/admin/dashboard" />;
  }

  const Sidebar = isAdmin ? AdminSidebar : (isStore ? StoreSidebar : (isShelter ? ShelterSidebar : VetSidebar));
  const Navbar = isAdmin ? VetNavbar : (isStore ? StoreNavbar : (isShelter ? ShelterNavbar : VetNavbar));

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main>
          <DashboardRoutes />
        </main>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;