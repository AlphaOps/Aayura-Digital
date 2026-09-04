import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useEnquiry } from '../context/EnquiryContext';
import './Hero.css';

// Check both hero/ subfolder and website-images/ root folder
const heroImagePrimary = new URL('../assets/website-images/hero/student-ambassadors.jpg', import.meta.url).href;
const heroImageSecondary = new URL('../assets/website-images/student-ambassadors.jpg', import.meta.url).href;

export const Hero = () => {
  const { openEnquiry } = useEnquiry();
  const [imgSrc, setImgSrc] = useState(heroImagePrimary);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (imgSrc !== heroImageSecondary) {
      setImgSrc(heroImageSecondary);
    } else {
      setImageError(true);
    }
  };

  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-batch-container animate-fade-in">
                <Link to="/programs" className="batch-pill" style={{ textDecoration: 'none' }}>
                  🚀 NEXT BATCH STARTING SOON
                </Link>
              </div>
              
              <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Welcome To the <span className="text-gradient">Aayura</span><br/>
                Professional Internship<br/>
                Experience.
              </h1>
              
              <p className="hero-desc animate-fade-in" style={{ animationDelay: '0.2s' }}>
                This virtual internship is designed to convert classroom learning into real industry skills through practical, hands-on projects and weekly deliverables.
              </p>
              
              <p className="hero-bold-stmt animate-fade-in" style={{ animationDelay: '0.25s' }}>
                <strong>It's the fast-track from concepts to portfolio-ready work.</strong>
              </p>
              
              <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <a href="#domains" className="btn btn-primary btn-lg hero-btn">Explore Programs &rarr;</a>
                <button onClick={() => openEnquiry()} className="btn btn-outline btn-lg hero-btn">Enquiry Now</button>
              </div>
              
              <div className="hero-trust-box animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="trust-icon">✓</span> 
                <p>This internship fulfills your academic / industrial training requirement and helps you move one step closer to your dream job career.</p>
              </div>
            </div>

            {/* Right Visual Ecosystem */}
            <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="visual-card">
                {!imageError ? (
                  <img 
                    src={imgSrc} 
                    alt="Student Ambassadors" 
                    className="visual-card-img animate-fade-in"
                    onError={handleImageError}
                  />
                ) : (
                  <>
                    <div className="visual-card-bg"></div>
                    <div className="visual-card-content">
                      <div className="visual-abstract-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Floating Stat Cards */}
              <div className="stat-card stat-1">
                <div className="stat-val">10,000+</div>
                <div className="stat-label">STUDENTS</div>
              </div>
              
              <div className="stat-card stat-2">
                <div className="stat-val">98%</div>
                <div className="stat-label">SUCCESS RATE</div>
              </div>
              
              <div className="stat-card stat-3">
                <div className="stat-val">33+</div>
                <div className="stat-label">PROGRAMS</div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};
