import React from 'react';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import './JourneyTimeline.css';

export const JourneyTimeline = () => {
  const stages = [
    {
      num: '01',
      title: 'Choose Your Path',
      desc: 'Explore programs and choose a domain that interests you.',
      icon: '🔍'
    },
    {
      num: '02',
      title: 'Learn the Skills',
      desc: 'Access structured learning resources and understand modern industry tools.',
      icon: '🧠'
    },
    {
      num: '03',
      title: 'Complete Practical Tasks',
      desc: 'Apply what you learn through structured assignments and activities.',
      icon: '⚡'
    },
    {
      num: '04',
      title: 'Build Your Project',
      desc: 'Create portfolio-worthy work that demonstrates your skills.',
      icon: '🏗️'
    },
    {
      num: '05',
      title: 'Show What You\'ve Built',
      desc: 'Complete your journey with documented work, project experience and internship documentation where applicable.',
      icon: '🎓'
    }
  ];

  return (
    <Section id="journey" variant="primary" className="journey-section">
      <SectionHeading 
        subtitle="YOUR JOURNEY WITH AAYURA" 
        title="From Curious Beginner to Confident Creator." 
        centered={true}
      />

      <div className="journey-timeline">
        {stages.map((stage, idx) => (
          <div key={idx} className="journey-stage">
            {/* Connection Line */}
            {idx < stages.length - 1 && (
              <div className="journey-connector">
                <div className="connector-line"></div>
                <div className="connector-arrow">↓</div>
              </div>
            )}
            
            <div className="stage-content">
              <div className="stage-header">
                <span className="stage-num">STAGE {stage.num}</span>
                <div className="stage-icon-box">{stage.icon}</div>
              </div>
              <h3 className="stage-title">{stage.title}</h3>
              <p className="stage-desc">{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
