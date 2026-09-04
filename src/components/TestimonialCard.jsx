import React from 'react';
import { Card } from './Card';
import './TestimonialCard.css';

export const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  image,
  className = '',
  ...props 
}) => {
  return (
    <Card className={`testimonial-card ${className}`} glassEffect {...props}>
      <div className="quote-icon">"</div>
      <p className="testimonial-quote">{quote}</p>
      
      <div className="testimonial-author">
        <div className="author-avatar">
          {image ? (
            <img src={image} alt={author} />
          ) : (
            <div className="avatar-placeholder">{author.charAt(0)}</div>
          )}
        </div>
        <div className="author-info">
          <h4 className="author-name">{author}</h4>
          <span className="author-role">{role}</span>
        </div>
      </div>
    </Card>
  );
};
