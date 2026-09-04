import React from 'react';
import './Section.css';

export const Section = ({ 
  children, 
  id,
  className = '', 
  variant = 'primary', // 'primary', 'secondary', 'white', 'grey'
  container = true,
  ...props 
}) => {
  const sectionClass = `section section-${variant} ${className}`;
  
  return (
    <section id={id} className={sectionClass} {...props}>
      {container ? (
        <div className="container">
          {children}
        </div>
      ) : children}
    </section>
  );
};
