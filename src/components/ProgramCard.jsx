import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import './ProgramCard.css';

export const ProgramCard = ({ 
  title, 
  description, 
  icon,
  features = [], 
  duration,
  className = '',
  ...props 
}) => {
  return (
    <Card hoverEffect className={`program-card ${className}`} {...props}>
      <div className="program-icon-wrapper">
        {icon || <div className="program-icon-placeholder"></div>}
      </div>
      <h3 className="program-title">{title}</h3>
      <p className="program-desc">{description}</p>
      
      {duration && (
        <div className="program-meta">
          <span className="meta-label">Duration:</span>
          <span className="meta-value">{duration}</span>
        </div>
      )}
      
      {features.length > 0 && (
        <ul className="program-features">
          {[...new Set(features)].map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      )}
      
      <div className="program-actions">
        <Button variant="outline" fullWidth>Learn More</Button>
      </div>
    </Card>
  );
};
