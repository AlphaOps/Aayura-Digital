import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { PROGRAM_DOMAINS } from '../data/programsData';
import './Programs.css';

export const Programs = () => {
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
    <div className="programs-page">
      <Section variant="primary" className="programs-header-section">
        <SectionHeading 
          title="Our Specialized Internship Tracks" 
          subtitle="EXPLORE PROGRAMS" 
          centered={true} 
        />
        <p className="programs-subtitle text-center">
          Whether you're interested in AI, Web Development, Data Analytics, or Engineering, we have a practical learning path designed for your career growth.
        </p>

        <div className="programs-filter-tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      <Section variant="secondary" className="programs-grid-section">
        <div className="programs-grid container">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="program-catalog-card" style={{ '--prog-color': program.accentColor }}>
              {program.image && (
                <div className="prog-card-image-wrapper">
                  <img src={program.image} alt={program.title} className="prog-card-image" />
                </div>
              )}
              
              <div className="prog-card-content">
                <div className="prog-card-top">
                  <span className="prog-category" style={{ color: program.accentColor, borderColor: `${program.accentColor}30`, background: `${program.accentColor}10` }}>
                    {program.category}
                  </span>
                  <span className="prog-number">#{program.num}</span>
                </div>
                
                <h3 className="prog-card-title">{program.title}</h3>
                
                <div className="prog-card-tech-line" style={{ color: 'var(--accent-primary)' }}>
                  {program.tools.slice(0, 4).join(', ')}
                </div>

                <p className="prog-card-desc">{program.shortDesc}</p>

                <div className="prog-card-actions-row">
                  <Link to={`/apply?domain=${program.id}`} className="btn btn-primary domain-action-btn">
                    Apply Now
                  </Link>
                  <a href="https://chat.whatsapp.com/example" target="_blank" rel="noopener noreferrer" className="btn btn-outline domain-action-btn-outline">
                    Join Groups
                  </a>
                </div>
              </div>
            </div>
          ))}
          {filteredPrograms.length === 0 && (
            <div className="no-programs-msg">
              <p>No programs found for this category.</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};
