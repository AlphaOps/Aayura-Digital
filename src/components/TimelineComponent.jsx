import React from 'react';
import './TimelineComponent.css';

export const TimelineComponent = ({ steps = [], className = '' }) => {
  return (
    <div className={`timeline ${className}`}>
      {steps.map((step, idx) => (
        <div key={idx} className="timeline-item">
          <div className="timeline-marker">
            <div className="timeline-dot"></div>
            {idx < steps.length - 1 && <div className="timeline-line"></div>}
          </div>
          <div className="timeline-content card-hover">
            <h4 className="timeline-title">{step.title}</h4>
            <p className="timeline-desc">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
