import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import './FinalCTA.css';

export const FinalCTA = () => {
  return (
    <Section variant="primary" className="final-cta-section">
      {/* Animated Subtle Floating Domain Nodes */}
      <div className="cta-ambient-nodes">
        <span className="ambient-node node-ai" style={{ top: '15%', left: '8%' }}>🤖 AI</span>
        <span className="ambient-node node-code" style={{ top: '65%', left: '12%' }}>&lt;/&gt; Code</span>
        <span className="ambient-node node-mkt" style={{ top: '20%', right: '10%' }}>📈 Growth</span>
        <span className="ambient-node node-data" style={{ top: '70%', right: '14%' }}>📊 Data</span>
        <span className="ambient-node node-des" style={{ top: '40%', right: '5%' }}>✨ Design</span>
      </div>

      <div className="final-cta-content text-center">
        <div className="cta-badge-eyebrow">
          🚀 Next Cohort Commences Soon
        </div>

        <h2 className="final-cta-heading">
          Your Next Skill Could Become Your <span className="text-gradient">Strongest Advantage.</span>
        </h2>

        <p className="final-cta-sub">
          Explore practical internship experiences designed around modern digital skills, projects, and guided learning. Build real proof before stepping into the industry.
        </p>

        <div className="final-cta-buttons">
          <Link to="/programs" className="cta-btn-primary">
            Explore Internships &rarr;
          </Link>
          <a href="#domains" className="cta-btn-secondary">
            View Programs
          </a>
        </div>

        <div className="cta-trust-strip">
          <span>✓ 100% Online & Flexible</span>
          <span className="dot-sep">•</span>
          <span>✓ Real Project Deliverables</span>
          <span className="dot-sep">•</span>
          <span>✓ Internship Completion Documentation</span>
        </div>
      </div>
    </Section>
  );
};
