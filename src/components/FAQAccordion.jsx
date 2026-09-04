import React, { useState } from 'react';
import './FAQAccordion.css';

export const FAQAccordion = ({ faqs = [], className = '' }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={`faq-container ${className}`}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button 
              className="faq-question" 
              onClick={() => toggleOpen(idx)}
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-answer-wrapper" style={{ height: isOpen ? 'auto' : 0 }}>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
