import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-icon-geo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H22L12 2Z" fill="url(#footer-aayura-grad)" />
                  <defs>
                    <linearGradient id="footer-aayura-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9d7cf4" />
                      <stop offset="1" stopColor="#7C4DDB" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="text-gradient" style={{fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.02em'}}>AAYURA</span>
            </Link>
            <p className="footer-desc">
              Practical learning experiences for the evolving digital world. Building skills, real project proof, and documentation for ambitious students.
            </p>
            <div className="footer-socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">💼</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📸</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">💻</a>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div className="footer-col">
            <h4 className="footer-heading">Programs</h4>
            <ul className="footer-links-list">
              <li><Link to="/program/digital-marketing">Digital Marketing</Link></li>
              <li><Link to="/program/artificial-intelligence">Artificial Intelligence</Link></li>
              <li><Link to="/program/web-development">Web Development</Link></li>
              <li><Link to="/program/data-analytics">Data Analytics</Link></li>
              <li><Link to="/program/ui-ux-design">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/programs">Programs Catalog</Link></li>
              <li><Link to="/programs" className="footer-highlight-link">Apply Now 🚀</Link></li>
            </ul>
          </div>

          {/* Column 4: Student Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Student Resources</h4>
            <ul className="footer-links-list">
              <li><a href="/#faq">FAQs</a></li>
              <li><a href="/#learn-beyond">Internship Guide</a></li>
              <li><Link to="/contact">Support Desk</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            Copyright &copy; {currentYear} Aayura Digital Solutions. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="dot">•</span>
            <a href="#terms">Terms &amp; Conditions</a>
            <span className="dot">•</span>
            <a href="#refund">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
