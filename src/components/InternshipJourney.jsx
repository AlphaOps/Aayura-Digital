import React, { useEffect, useRef } from 'react';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import './InternshipJourney.css';

export const InternshipJourney = () => {
  const steps = [
    {
      num: '1',
      label: 'EXPLORE',
      title: 'Choose Your Domain',
      desc: 'Select the career path that matches your interests.',
    },
    {
      num: '2',
      label: 'CUSTOMIZE',
      title: 'Select Your Duration',
      desc: 'Choose an internship duration suitable for your goals.',
    },
    {
      num: '3',
      label: 'ENROLL',
      title: 'Complete Registration',
      desc: 'Submit your details and complete the enrollment process.',
    },
    {
      num: '4',
      label: 'ONBOARD',
      title: 'Receive Onboarding',
      desc: 'Get access to internship guidelines, resources, and instructions.',
    },
    {
      num: '5',
      label: 'PROFESSIONAL WORKFLOW',
      title: 'Project Briefing & Team Interaction',
      desc: 'Before beginning selected projects, students participate in a structured professional briefing to understand project objectives, workflow, deliverables, timelines, communication processes, and execution expectations.',
      isPremium: true,
      badge: 'Professional Project Workflow'
    },
    {
      num: '6',
      label: 'EXECUTE',
      title: 'Work on Tasks & Projects',
      desc: 'Apply your learning by completing practical assignments and industry-oriented projects.',
    },
    {
      num: '7',
      label: 'SHOWCASE',
      title: 'Complete & Showcase',
      desc: 'Submit your final work and receive applicable completion credentials based on program requirements.',
    }
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.ij-step');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <Section id="process" variant="primary" className="internship-journey-section">
      <SectionHeading 
        subtitle="YOUR INTERNSHIP JOURNEY" 
        title="Start Your Journey in 7 Simple Steps." 
        centered={true}
      />

      <div className="ij-timeline-container" ref={sectionRef}>
        <div className="ij-timeline">
          {/* Mobile continuous vertical line */}
          <div className="ij-mobile-line"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className={`ij-step ${step.isPremium ? 'ij-step-premium' : ''}`}>
              <div className="ij-marker">
                <div className="ij-number">
                  {step.num < 10 ? `0${step.num}` : step.num}
                </div>
                {idx < steps.length - 1 && <div className="ij-desktop-connector"></div>}
              </div>
              
              <div className="ij-content">
                <span className="ij-label">{step.label}</span>
                <h3 className="ij-title">
                  {step.title}
                  {step.isPremium && <span className="ij-premium-icon" title="Professional Workflow Step">🤝</span>}
                </h3>
                {step.isPremium && step.badge && (
                  <div className="ij-premium-badge">✓ {step.badge}</div>
                )}
                <p className="ij-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
