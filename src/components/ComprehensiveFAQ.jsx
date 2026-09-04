import React, { useState } from 'react';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import { COMPREHENSIVE_FAQS } from '../data/programsData';
import './ComprehensiveFAQ.css';

export const ComprehensiveFAQ = () => {
  const [openIdx, setOpenIdx] = useState(0); // first item open by default

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <Section id="faq" variant="secondary" className="comp-faq-section">
      <SectionHeading
        subtitle="CLEAR ANSWERS"
        title="Frequently Asked Questions"
        centered={true}
      />
      <p className="comp-faq-sub text-center">
        Everything you need to know about our practical internship programs, scheduling, deliverables, and documentation.
      </p>

      <div className="faq-accordion-container">
        {COMPREHENSIVE_FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`faq-row ${isOpen ? 'active' : ''}`}>
              <button
                className="faq-question-btn"
                onClick={() => toggleFAQ(idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-num">0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
              </button>

              <div className={`faq-answer-collapse ${isOpen ? 'show' : ''}`}>
                <div className="faq-answer-inner">
                  <p>{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="faq-extra-help text-center">
        <span>Have an unanswered question? </span>
        <a href="/contact" className="help-link">Reach out to our student support desk &rarr;</a>
      </div>
    </Section>
  );
};
