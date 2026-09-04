import React, { useEffect } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { PROGRAM_DOMAINS, INTERNSHIP_DURATIONS, BATCHES_DATA } from '../data/programsData';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import './Apply.css';

export const Apply = () => {
  const [searchParams] = useSearchParams();
  const domainId = searchParams.get('program') || searchParams.get('domain');

  // If no specific program is selected, redirect to complete programs catalog
  if (!domainId) {
    return <Navigate to="/programs" replace />;
  }

  const program = PROGRAM_DOMAINS.find(p => p.id === domainId) || PROGRAM_DOMAINS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [domainId]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    {
      icon: '📄',
      title: 'Official Offer Letter',
      desc: 'Receive your official internship offer letter after successful registration.'
    },
    {
      icon: '📊',
      title: 'Weekly Tasks & Reports',
      desc: 'Follow a structured learning workflow with weekly tasks, milestones, and performance tracking.'
    },
    {
      icon: '💻',
      title: 'Project-Based Learning',
      desc: 'Work on practical industry-style projects and build a strong portfolio.'
    },
    {
      icon: '🎓',
      title: 'Certificate of Internship + LOR',
      desc: 'Earn a verified internship certificate and performance-based Letter of Recommendation.'
    },
    {
      icon: '🏆',
      title: 'Performance Rewards',
      desc: 'Top performers receive exclusive cash rewards and recognition based on performance.'
    },
    {
      icon: '🚀',
      title: 'Career Opportunity',
      desc: 'Exceptional performers may receive direct job opportunities and career advancement support.'
    }
  ];

  const rewards = [
    { rank: '1st', place: 'Rank #1', prize: '₹10,000 Cash Prize', icon: '🥇', color: '#F59E0B' },
    { rank: '2nd', place: 'Rank #2', prize: '₹7,000 Cash Prize', icon: '🥈', color: '#64748B' },
    { rank: '3rd', place: 'Rank #3', prize: '₹5,000 Cash Prize', icon: '🥉', color: '#D97706' },
    { rank: 'Top', place: 'Top Performer', prize: 'Direct Career / Job Opportunity', icon: '🚀', color: '#7C4DDB', highlight: true }
  ];

  const defaultBatch = BATCHES_DATA.find(b => b.status !== 'Closed') || BATCHES_DATA[0];

  return (
    <div className="track-details-page">
      {/* 1. HERO SECTION */}
      <header className="track-hero" style={{ '--track-color': program.accentColor }}>
        <div className="container track-hero-container">
          <div style={{ marginBottom: '16px' }}>
            <span className="batch-pill">🚀 NEXT BATCH STARTING SOON</span>
          </div>
          <div className="track-hero-badge" style={{ color: program.accentColor, background: `${program.accentColor}15`, borderColor: `${program.accentColor}30` }}>
            Welcome to the Next Step
          </div>
          <h1 className="track-hero-title">
            Launch Your Career in <span className="highlight-text" style={{ color: program.accentColor }}>{program.title}</span>
          </h1>
          <p className="track-hero-desc">
            Build practical, industry-ready {program.title.toLowerCase()} skills through hands-on projects, real-world tools, mentorship, and structured internship experience.
          </p>
          <div className="track-hero-trust-badge">
            ⚡ From Learning to Portfolio-Ready Experience
          </div>
          <div className="track-hero-cta-wrapper">
            <button className="btn btn-primary track-hero-cta" onClick={() => scrollToSection('select-path')}>
              Join Now – Seats Filling Fast!
            </button>
          </div>
        </div>
      </header>

      {/* 2. WHAT THIS INTERNSHIP GIVES YOU */}
      <Section id="benefits" variant="secondary" className="track-benefits-section">
        <div className="container">
          <SectionHeading title="What This Internship Gives You" centered={true} />
          <div className="track-benefits-grid">
            {benefits.filter((b, idx, self) => idx === self.findIndex((t) => t.title === b.title)).map((b, idx) => (
              <div key={idx} className="track-benefit-card">
                <div className="tb-icon">{b.icon}</div>
                <h4 className="tb-title">{b.title}</h4>
                <p className="tb-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. WHAT YOU WILL LEARN */}
      <Section id="skills" variant="primary" className="track-skills-section">
        <div className="container">
          <SectionHeading title="What You Will Learn" centered={true} />
          <div className="track-skills-container">
            {Array.from(new Set([...(program.skills || []), ...(program.tools || [])])).map((skill, idx) => (
              <div key={idx} className="track-skill-badge" style={{ borderColor: `${program.accentColor}40`, background: `${program.accentColor}05` }}>
                <span className="ts-icon" style={{ color: program.accentColor }}>✓</span>
                <span className="ts-name">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. INTERNSHIP DETAILS */}
      <Section id="details" variant="secondary" className="track-details-section">
        <div className="container">
          <SectionHeading title="Internship Details" centered={true} />
          
          <div className="id-layout-container">
            {/* Top Full Width Block */}
            <div className="id-block id-full-width">
              <div className="id-block-header">
                <span className="id-icon">📅</span>
                <h4 className="id-title">Available Batches</h4>
              </div>
              <div className="id-batches-grid">
                {['6 Sep', '13 Sep', '20 Sep', '27 Sep', '4 Oct', '11 Oct', '18 Oct', '25 Oct', '1 Nov', '8 Nov', '15 Nov', '22 Nov'].map((date, idx) => (
                  <div key={idx} className="id-batch-pill">{date}</div>
                ))}
              </div>
            </div>

            {/* Bottom Two Blocks */}
            <div className="id-blocks-row">
              <div className="id-block id-half-width">
                <div className="id-block-header">
                  <span className="id-icon">⏱️</span>
                  <h4 className="id-title">Duration Support</h4>
                </div>
                <p className="id-desc">Comprehensive support for both short-term academic goals and long-term career specialization.</p>
              </div>

              <div className="id-block id-half-width">
                <div className="id-block-header">
                  <span className="id-icon">📍</span>
                  <h4 className="id-title">Work Location</h4>
                </div>
                <p className="id-desc">100% Virtual — Gain professional experience from the comfort of your home.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. CHOOSE YOUR CAREER JOURNEY */}
      <Section id="select-path" variant="primary" className="track-path-section">
        <div className="container">
          <SectionHeading 
            title="Choose Your Career Journey" 
            subtitle="Every step you invest in your growth builds stronger skills, experience, confidence, and career opportunities."
            centered={true}
          />

          {/* Career Growth Progression Indicator */}
          <div className="journey-progression-wrapper">
            <div className="journey-line"></div>
            <div className="journey-step">
              <div className="j-dot"></div>
              <span>Start</span>
            </div>
            <div className="journey-step">
              <div className="j-dot"></div>
              <span>Momentum</span>
            </div>
            <div className="journey-step">
              <div className="j-dot"></div>
              <span>Professional</span>
            </div>
            <div className="journey-step">
              <div className="j-dot"></div>
              <span>Elite</span>
            </div>
          </div>

          <div className="track-duration-grid">
            {INTERNSHIP_DURATIONS.map((dur, idx) => (
              <div key={idx} className={`tdur-card ${dur.styleClass || ''}`}>
                <div className="tdur-header">
                  <span className="tdur-badge">{dur.badge}</span>
                  <div className="tdur-duration-display">{dur.duration}</div>
                  <h3 className="tdur-title">{dur.title}</h3>
                  <p className="tdur-desc">{dur.description}</p>
                </div>
                
                <div className="tdur-outcomes">
                  <div className="tdur-outcomes-header">WHAT YOU BUILD</div>
                  {dur.outcomes && [...new Set(dur.outcomes)].map((ben, i) => (
                    <div key={i} className="tdur-ben-item">
                      <span className="tdur-ben-icon">★</span>
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>

                <div className="tdur-footer">
                  <div className="tdur-price-wrap">
                    <span className="tdur-price-label">Program Fee</span>
                    <div className="tdur-current-price">
                      <span className="tdur-currency">₹</span>
                      <span className="tdur-amount">{dur.price}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/register?domain=${program.id}&batch=${defaultBatch.id}&plan=${dur.value}`} 
                    className="btn btn-primary tdur-register-btn"
                  >
                    {dur.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. PERFORMANCE & REWARDS SECTION */}
      <Section id="rewards" variant="secondary" className="track-rewards-section">
        <div className="container">
          <SectionHeading title="Perform. Excel. Get Rewarded." centered={true} />
          <p className="track-rewards-desc text-center">
            Outstanding performance deserves exceptional recognition. Top-performing interns will be rewarded based on project quality, consistency, innovation, discipline, and overall contribution.
          </p>
          <div className="track-rewards-grid">
            {rewards.filter((r, idx, self) => idx === self.findIndex((t) => t.place === r.place)).map((r, idx) => (
              <div key={idx} className={`tr-card ${r.highlight ? 'tr-highlight' : ''}`} style={{ '--r-color': r.color }}>
                <div className="tr-icon" style={{ background: `${r.color}15`, borderColor: `${r.color}40` }}>{r.icon}</div>
                <div className="tr-place">{r.place}</div>
                <h4 className="tr-prize" style={{ color: r.color }}>{r.prize}</h4>
              </div>
            ))}
          </div>
          <div className="track-rewards-disclaimer text-center">
            <p>Top performers may receive direct job opportunities, career opportunities, or priority consideration based on performance and available openings. <em>(Not guaranteed for every student)</em></p>
          </div>
        </div>
      </Section>

      {/* 7. FINAL CTA */}
      <Section id="final-cta" variant="primary" className="track-cta-section">
        <div className="container track-cta-container">
          <h2 className="t-cta-title">Ready to Start Your {program.title} Journey?</h2>
          <p className="t-cta-desc">
            Build skills, complete real-world projects, strengthen your portfolio, and unlock career opportunities.
          </p>
          <div className="t-cta-actions">
            <button className="btn btn-primary t-cta-btn" onClick={() => scrollToSection('select-path')}>
              Register Now
            </button>
            <button className="btn btn-outline t-cta-btn-outline" onClick={() => scrollToSection('benefits')}>
              Explore Internship Benefits
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};
