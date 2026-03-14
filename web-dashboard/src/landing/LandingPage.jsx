import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoleCards from './components/RoleCards';
import Features from './components/Features';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#00D1C1]/20">
      {/* Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Tailored for Your Mission (Role Cards) */}
        <RoleCards />

        {/* Features & Why Us */}
        <Features />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
