import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { PROGRAM_DOMAINS } from '../data/programsData';
import './CareerDomains.css';

export const CareerDomains = () => {
  const [activeCategory, setActiveCategory] = useState('All Programs');

  const categories = [
    'All Programs',
    'Data & Analytics',
    'Development',
    'Cloud & DevOps',
    'Cybersecurity',
    'Mobile Development',
    'Design',
    'Emerging Technology',
    'Mechanical',
    'Civil'
  ];

  const filteredPrograms = activeCategory === 'All Programs'
    ? PROGRAM_DOMAINS
    : PROGRAM_DOMAINS.filter(p => p.category === activeCategory);

  return (
    <Section id="domains" variant="secondary" className="domains-section">
      <div className="container">
        <div className="domains-header text-center">
          <h2 className="domains-main-title">
            Our Specialized <span className="text-gradient">Internship Tracks</span>
          </h2>
          <p className="domains-main-subtitle">
            Whether you're interested in AI, Web Development, or Engineering, we have a path designed for your success.
          </p>

          <div className="domains-filter-tabs">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`domains-filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="domains-tracks-grid">
          {filteredPrograms.map((domain) => {
            const techLine = domain.tools && domain.tools.length > 0
              ? domain.tools.join(' + ')
              : (domain.skills ? domain.skills.join(' + ') : '');

            return (
              <div key={domain.id} className="track-card">
                {domain.image && (
                  <div className="track-card-image-box">
                    <img 
                      src={domain.image} 
                      alt={domain.title} 
                      className="track-card-img" 
                      loading="lazy"
                    />
                  </div>
                )}
                
                <div className="track-card-body">
                  <div className="track-card-top-row">
                    <span className="track-category-pill">
                      {domain.category}
                    </span>
                    <span className="track-number-badge">
                      #{domain.num}
                    </span>
                  </div>

                  <h3 className="track-card-title">
                    <Link to={`/program/${domain.id}`} className="track-title-link">
                      {domain.title}
                    </Link>
                  </h3>

                  <div className="track-tech-subtitle">
                    {techLine}
                  </div>

                  <p className="track-card-description">
                    {domain.shortDesc}
                  </p>

                  <div className="track-card-cta-row">
                    <Link to={`/apply?domain=${domain.id}`} className="track-btn-apply">
                      Apply Now
                    </Link>
                    <a 
                      href="https://chat.whatsapp.com/invite" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="track-btn-groups"
                    >
                      Join Groups
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
