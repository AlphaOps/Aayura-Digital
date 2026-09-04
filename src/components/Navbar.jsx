import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-geo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H22L12 2Z" fill="url(#aayura-grad)" />
              <defs>
                <linearGradient id="aayura-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9d7cf4" />
                  <stop offset="1" stopColor="#7C4DDB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text-group">
            <span className="logo-main">AAYURA</span>
            <span className="logo-sub">DIGITAL SOLUTIONS</span>
          </div>
        </Link>
        
        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
          <Link to="/programs" className={`nav-link ${location.pathname === '/programs' ? 'active' : ''}`}>Programs</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          <div className="nav-actions">
            <Link to="/programs" className="nav-apply-btn">
              Apply Now 🚀
            </Link>
          </div>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};
