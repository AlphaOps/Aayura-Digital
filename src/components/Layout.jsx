import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileBottomCTA } from './MobileBottomCTA';

export const Layout = () => {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide global sticky bottom CTA on apply/register pages and individual program pages (which have their own dedicated track sticky bar)
  const hideBottomCTA = ['/apply', '/register'].includes(location.pathname) || location.pathname.startsWith('/program/');

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      {!hideBottomCTA && <MobileBottomCTA />}
    </div>
  );
};
