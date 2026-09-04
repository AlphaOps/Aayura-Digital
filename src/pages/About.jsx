import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import './About.css';

export const About = () => {
  const frameworkSteps = [
    {
      num: '01',
      title: 'Learn',
      desc: 'Gain crystal-clear conceptual foundations, curated documentation, and industry best practices without fluff.'
    },
    {
      num: '02',
      title: 'Apply',
      desc: 'Immediately put ideas to work through targeted milestone exercises designed around live industry tools.'
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Develop end-to-end capstone deliverables that solve actual digital business problems.'
    },
    {
      num: '04',
      title: 'Improve',
      desc: 'Refine and polish your deliverables following structured rubric feedback and mentor guidance.'
    },
    {
      num: '05',
      title: 'Showcase',
      desc: 'Publish your work to public portfolios with internship documentation.'
    }
  ];

  const values = [
    {
      title: 'Practical Learning',
      desc: 'Action beats passive watching. Real proficiency is forged through tangible project execution.'
    },
    {
      title: 'Continuous Innovation',
      desc: 'Digital tools evolve rapidly. We continuously refresh our tracks to reflect modern AI and tech standards.'
    },
    {
      title: 'Student Growth',
      desc: 'Every learner starts somewhere. We foster an encouraging, high-agency environment for genuine confidence.'
    },
    {
      title: 'Ethical Learning',
      desc: 'No false job guarantees or deceptive claims. We focus purely on measurable skills and honest portfolio proof.'
    },
    {
      title: 'Real-World Relevance',
      desc: 'All briefs, datasets, and scenarios model what real digital companies require from early talent.'
    }
  ];

  return (
    <div className="about-page">
      {/* Editorial Hero */}
      <header className="about-hero">
        <div className="container">
          <span className="about-eyebrow">✦ ABOUT AAYURA DIGITAL SOLUTIONS</span>
          <h1 className="about-hero-title">
            Building Practical Skills for a <span className="text-gradient">Digital Future.</span>
          </h1>
          <p className="about-hero-subtitle">
            We believe students learn best when knowledge meets action.
          </p>
        </div>
      </header>

      {/* SECTION 1: Our Mission */}
      <Section variant="secondary" className="editorial-section">
        <div className="container">
          <div className="editorial-lead-box">
            <span className="section-roman">SECTION 01</span>
            <h2 className="editorial-lead-title">Our Mission</h2>
            <p className="about-quote">
              "Aayura Digital Solutions aims to help learners explore modern digital skills through practical, project-oriented learning experiences."
            </p>
            <p className="editorial-body">
              We empower ambitious college students and freshers across India to build competence they can prove. Instead of memorizing abstract slides, our learners spend their hours inside tools like Figma, Meta Ads Manager, AI model APIs, and code editors, gaining real creative stamina.
            </p>
          </div>
        </div>
      </Section>

      {/* SECTION 2: The Problem */}
      <Section variant="primary" className="editorial-section">
        <div className="container">
          <div className="editorial-split">
            <div className="editorial-split-left">
              <span className="section-roman">SECTION 02</span>
              <h2 className="editorial-title">The Industry Gap We Bridge</h2>
            </div>
            <div className="editorial-split-right">
              <p className="editorial-highlight">
                There is often a significant distance between academic knowledge and practical industry application.
              </p>
              <p className="editorial-body">
                Universities perform vital work establishing theoretical fundamentals, mathematical logic, and formal disciplines. However, modern digital sectors—such as Generative AI workflows, programmatic performance advertising, conversion UX design, and agile product development—move far faster than textbook revision cycles.
              </p>
              <p className="editorial-body">
                Aayura Digital Solutions exists as a collaborative bridge. We don't replace formal education; we complement it by providing hands-on sandboxes where learners can apply classroom intellect to contemporary industry scenarios.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: Our Approach (5-Step Framework) */}
      <Section variant="secondary" className="editorial-section">
        <div className="container">
          <div className="text-center mb-3xl">
            <span className="section-roman">SECTION 03</span>
            <h2 className="editorial-title">Our 5-Step Learning Framework</h2>
            <p className="editorial-sub-center">A disciplined methodology that moves learners from theory to confident execution.</p>
          </div>

          <div className="framework-grid">
            {frameworkSteps.map((step) => (
              <div key={step.num} className="framework-card">
                <span className="framework-num">{step.num}</span>
                <h3 className="framework-name">{step.title}</h3>
                <p className="framework-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 4: Our Values */}
      <Section variant="primary" className="editorial-section">
        <div className="container">
          <div className="text-center mb-3xl">
            <span className="section-roman">SECTION 04</span>
            <h2 className="editorial-title">Core Principles &amp; Values</h2>
            <p className="editorial-sub-center">The standard of integrity and excellence behind every program we design.</p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-header">
                  <span className="value-bullet">✦</span>
                  <h3 className="value-title">{v.title}</h3>
                </div>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 5: Vision */}
      <Section variant="secondary" className="editorial-section vision-section">
        <div className="container text-center">
          <span className="section-roman">SECTION 05</span>
          <h2 className="editorial-title mb-lg">Our Long-Term Vision</h2>
          <blockquote className="vision-quote">
            "To build a learning ecosystem where students can confidently explore, practice, and develop skills for the evolving digital economy."
          </blockquote>
          <div className="vision-cta-wrap mt-2xl">
            <Link to="/programs" className="vision-cta-btn">
              Join Our Next Cohort &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};
