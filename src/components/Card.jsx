import React from 'react';
import './Card.css';

export const Card = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  glassEffect = false,
  ...props 
}) => {
  const classes = `card ${hoverEffect ? 'card-hover' : ''} ${glassEffect ? 'card-glass' : ''} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
