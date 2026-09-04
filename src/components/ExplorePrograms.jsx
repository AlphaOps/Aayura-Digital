import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { Button } from './Button';
import { PROGRAM_DOMAINS } from '../data/programsData';
import './ExplorePrograms.css';

export const ExplorePrograms = () => {
  return (
    <Section id="programs" variant="secondary" className="programs-section">
      <SectionHeading 
        subtitle="CHOOSE YOUR PATH" 
        title="Find the Skill That Shapes Your Future." 
        centered={true}
      />
      
      <p className="programs-subtitle text-center">
        Explore practical programs designed around today's fastest-growing digital opportunities.
      </p>

      {/* Horizontal scrolling container for mobile, grid for desktop */}
      <div className="programs-container">
        {PROGRAM_DOMAINS.slice(0, 6).filter((prog, idx, self) => idx === self.findIndex((t) => t.title === prog.title)).map((prog, idx) => (
          <Card key={idx} hoverEffect className="program-premium-card" style={{ '--card-accent': prog.accentColor }}>
            <div className="prog-icon" style={{ color: prog.accentColor, background: `${prog.accentColor}15`, border: `1px solid ${prog.accentColor}30` }}>
              {prog.icon}
            </div>
            
            <h3 className="prog-title">{prog.title}</h3>
            <p className="prog-desc">{prog.shortDesc}</p>
            
            <div className="prog-tags">
              {[...new Set(prog.tools ? prog.tools.slice(0,3) : (prog.skills ? prog.skills.slice(0,3) : []))].map((tag, i) => (
                <span key={i} className="prog-tag">{tag}</span>
              ))}
            </div>
            
            <div className="prog-footer">
              <Link to={`/program/${prog.id}`} style={{ width: '100%', textDecoration: 'none' }}>
                <Button variant="outline" fullWidth className="prog-btn">Explore Program &rarr;</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="programs-all text-center">
        <Link to="/programs" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="lg">View All Programs &rarr;</Button>
        </Link>
      </div>
    </Section>
  );
};
