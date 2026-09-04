import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MobileBottomCTA.css';

export const MobileBottomCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down past the hero
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`mobile-bottom-cta ${visible ? 'visible' : ''}`}>
      <div className="cta-content">
        <div className="cta-text">
          <span className="cta-title">Upcoming Cohorts Open</span>
          <span className="cta-subtitle">Limited seats per domain track</span>
        </div>
        <Link to="/programs" className="mobile-cta-link-btn">
          Apply Now 🚀
        </Link>
      </div>
    </div>
  );
};
