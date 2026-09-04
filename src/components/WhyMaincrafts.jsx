import React from 'react';
import './WhyMaincrafts.css';

const PurpleCheckIcon = () => (
  <svg className="rw-check-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#9d7cf4" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="8" fill="#8854ff" />
    <path d="M9 12.5L11 14.5L15 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhyMaincrafts = () => {
  const features = [
    'Industry-aligned curriculum',
    'Comprehensive project support',
    'Chances to work with our core team',
    'Flexible durations (2-52 weeks)'
  ];

  return (
    <section id="why-aayura" className="real-world-section">
      <div className="container">
        <div className="rw-grid">
          
          <div className="rw-image-col">
            <div className="rw-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team working together" 
                className="rw-main-img" 
              />
              <div className="rw-floating-badge">
                <span className="rw-badge-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                    <path d="M8 12.5L11 15.5L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="rw-badge-text">Industry Certified</span>
              </div>
            </div>
          </div>
          
          <div className="rw-content-col">
            <div className="rw-eyebrow">Our Expertise</div>
            <h2 className="rw-heading">
              Real-World <span className="text-gradient">Experience</span> Starts Here
            </h2>
            <p className="rw-desc">
              We provide more than just certificates. We provide the skills and confidence to launch your career in the world's most competitive tech industries.
            </p>
            
            <div className="rw-features-grid">
              {[...new Set(features)].map((text, idx) => (
                <div key={idx} className="rw-feature-item">
                  <PurpleCheckIcon />
                  <span className="rw-feature-text">{text}</span>
                </div>
              ))}
            </div>

            <button className="rw-cta-btn">Learn More About Us</button>
          </div>

        </div>
      </div>
    </section>
  );
};
