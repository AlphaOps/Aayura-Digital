import React from 'react';
import './SectionHeading.css';

export const SectionHeading = ({ 
  title, 
  subtitle, 
  centered = true,
  className = '', 
  ...props 
}) => {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''} ${className}`} {...props}>
      {subtitle && <span className="subtitle text-gradient">{subtitle}</span>}
      <h2 className="title">{title}</h2>
    </div>
  );
};
