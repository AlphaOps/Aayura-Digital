import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { SectionHeading } from '../components/SectionHeading';
import { PROGRAM_DOMAINS } from '../data/programsData';
import { FAQAccordion } from '../components/FAQAccordion';
import './ProgramDetails.css';
import './ProgramDetailsPricing.css';

export const ProgramDetails = () => {
  const { slug } = useParams();
  
  // Find program by slug, or fallback to first
  const program = PROGRAM_DOMAINS.find(p => p.id === slug) || PROGRAM_DOMAINS[0];

  // Scroll to top on program change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const relatedProgs = program.relatedPrograms.map(rpId => PROGRAM_DOMAINS.find(p => p.id === rpId)).filter(Boolean);

  const formattedFaqs = program.faqs.map(f => ({ question: f.q, answer: f.a }));

  const PRICING_TIERS = [
    { duration: '2 Weeks', badge: 'Starter', price: 89, value: '2-weeks' },
    { duration: '4 Weeks', badge: 'Popular', price: 179, value: '4-weeks' },
    { duration: '6 Weeks', badge: 'Best Value', price: 199, value: '6-weeks' },
    { duration: '8 Weeks', badge: 'Trending', price: 249, value: '8-weeks' },
    { duration: '12 Weeks', badge: 'Most Popular', price: 299, value: '12-weeks' },
    { duration: '16 Weeks', badge: 'Recommended', price: 329, value: '16-weeks' },
    { duration: '24 Weeks', badge: 'Premium', price: 529, value: '24-weeks' },
    { duration: '36 Weeks', badge: 'Elite', price: 729, value: '36-weeks' }
  ];

  return (
    <div className="program-details-page">
      {/* SECTION 1 — HERO */}
      <header className="program-hero" style={{ '--prog-accent': program.accentColor }}>
        <div className="container hero-split">
          <div className="prog-hero-content">
            <div className="prog-hero-top">
              <span className="batch-pill">🚀 NEXT BATCH STARTING SOON</span>
              <span className="prog-hero-badge" style={{ borderColor: `${program.accentColor}50`, background: `${program.accentColor}15`, color: program.accentColor }}>
                {program.category}
              </span>
            </div>
            
            <h1 className="prog-hero-title">
              {program.title}
            </h1>
            
            <p className="prog-hero-sub">
              {program.shortDesc}
            </p>
            
            <div className="prog-hero-ctas">
              <Link to={`/apply?program=${program.id}`} className="prog-apply-primary">
                Apply Now &rarr;
              </Link>
              <a href="#curriculum" className="prog-curriculum-btn">
                Download Curriculum
              </a>
            </div>
          </div>
          
          <div className="prog-hero-visual">
            <div className="prog-visual-card" style={{ background: `${program.accentColor}15`, borderColor: `${program.accentColor}40` }}>
              <span className="huge-icon" style={{ color: program.accentColor }}>{program.icon}</span>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2 — PROGRAM OVERVIEW */}
      <Section id="overview" variant="secondary" className="prog-section">
        <div className="container">
          <SectionHeading title="Program Overview" />
          <div className="overview-content">
            <p className="lead-p">{program.overview}</p>
          </div>
        </div>
      </Section>

      {/* SECTION 3 — WHAT YOU WILL LEARN */}
      <Section id="curriculum" variant="primary" className="prog-section">
        <div className="container">
          <SectionHeading title="What You Will Learn" subtitle="CURRICULUM ROADMAP" centered={true} />
          <div className="curriculum-timeline">
            {program.curriculumModules.filter((mod, idx, self) => idx === self.findIndex((t) => t.title === mod.title)).map((mod, idx) => (
              <div key={idx} className="curriculum-module-card">
                <div className="module-index">Module 0{idx + 1}</div>
                <h4 className="module-title">{mod.title}</h4>
                <p className="module-desc">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 4 — TOOLS & TECHNOLOGIES */}
      <Section variant="secondary" className="prog-section">
        <div className="container text-center">
          <SectionHeading title="Tools & Technologies" />
          <div className="tech-badge-container">
            {[...new Set(program.tools)].map((tool, idx) => (
              <div key={idx} className="tech-large-badge">
                <span className="tech-icon">⚙️</span>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 5 — PROJECTS YOU WILL BUILD */}
      <Section variant="primary" className="prog-section">
        <div className="container">
          <SectionHeading title="Build Real-World Projects" centered={true} />
          <div className="example-projects-grid">
            {program.projects.filter((proj, idx, self) => idx === self.findIndex((t) => t.title === proj.title)).map((proj, idx) => (
              <div key={idx} className="example-project-card">
                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-card-desc">{proj.desc}</p>
                <div className="deliverable-box">
                  <span className="deliv-label">Deliverable:</span>
                  <span className="deliv-val">{proj.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 5.5 — INTERNSHIP PRICING & DURATION */}
      <Section variant="secondary" className="prog-section pricing-section">
        <div className="container">
          <SectionHeading title={`Internship Pricing & Duration`} subtitle={`Select your internship duration for ${program.title}`} centered={true} />
          <div className="pricing-cards-grid">
            {PRICING_TIERS.map((tier, idx) => (
              <div key={idx} className="pricing-card">
                <div className="pricing-badge">{tier.badge}</div>
                <h4 className="pricing-duration">{tier.duration}</h4>
                <div className="pricing-price">
                  <span className="price-currency">₹</span>
                  <span className="price-amount">{tier.price}</span>
                </div>
                <Link to={`/apply?program=${program.id}&duration=${tier.value}&price=${tier.price}`} className="btn btn-primary pricing-enroll-btn">
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 6 — CAREER OPPORTUNITIES */}
      <Section variant="primary" className="prog-section">
        <div className="container">
          <SectionHeading title="Career Opportunities" />
          <div className="career-grid">
            {[...new Set(program.careerOpportunities)].map((career, idx) => (
              <div key={idx} className="career-card">
                <span className="check-bullet">💼</span>
                <span>{career}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 7 — PROGRAM HIGHLIGHTS */}
      <Section variant="primary" className="prog-section">
        <div className="container">
          <SectionHeading title="Program Highlights" centered={true} />
          <div className="highlights-grid">
            <div className="highlight-card">
              <div className="hl-icon">🎯</div>
              <h4>Industry-Oriented Learning</h4>
              <p>Curriculum designed to match current industry demands.</p>
            </div>
            <div className="highlight-card">
              <div className="hl-icon">🛠️</div>
              <h4>Hands-On Projects</h4>
              <p>Build real-world applications and simulations.</p>
            </div>
            <div className="highlight-card">
              <div className="hl-icon">👨‍🏫</div>
              <h4>Expert Mentorship</h4>
              <p>Learn from professionals with practical experience.</p>
            </div>
            <div className="highlight-card">
              <div className="hl-icon">📜</div>
              <h4>Certificate of Completion</h4>
              <p>Receive internship documentation to boost your resume.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 8 — WHO SHOULD JOIN */}
      <Section variant="secondary" className="prog-section">
        <div className="container">
          <div className="who-card">
            <SectionHeading title="Who Should Join This Program?" />
            <ul className="who-list">
              {[...new Set(program.whoShouldJoin)].map((item, i) => (
                <li key={i}>
                  <span className="check-bullet">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* SECTION 9 — FAQ */}
      <Section variant="primary" className="prog-section">
        <div className="container">
          <SectionHeading title="Frequently Asked Questions" centered={true} />
          <FAQAccordion faqs={formattedFaqs} />
        </div>
      </Section>

      {/* SECTION 10 — FINAL CTA */}
      <Section variant="secondary" className="prog-section">
        <div className="container text-center final-prog-cta">
          <h2>Ready to Start Your Journey?</h2>
          <p>Build industry-ready skills, work on practical projects, and take the next step toward your career.</p>
          <div className="final-cta-btns">
            <Link to={`/apply?program=${program.id}`} className="btn btn-primary btn-lg">Apply Now</Link>
            <Link to="/programs" className="btn btn-outline btn-lg">Explore Other Programs</Link>
          </div>
        </div>
      </Section>

      {/* RELATED PROGRAMS */}
      <Section variant="primary" className="prog-section">
        <div className="container">
          <SectionHeading title="Explore Related Programs" centered={true} />
          <div className="programs-grid">
            {relatedProgs.map(rp => (
              <div key={rp.id} className="program-catalog-card" style={{ '--prog-color': rp.accentColor }}>
                <div className="prog-card-top">
                  <span className="prog-number">#{rp.num}</span>
                  <span className="prog-category" style={{ color: rp.accentColor, borderColor: rp.accentColor }}>
                    {rp.category}
                  </span>
                </div>
                <div className="prog-card-icon" style={{ background: `${rp.accentColor}15` }}>
                  {rp.icon}
                </div>
                <h3 className="prog-card-title">{rp.title}</h3>
                <p className="prog-card-desc">{rp.shortDesc}</p>
                <div className="prog-card-actions">
                  <Link to={`/program/${rp.id}`} className="btn btn-outline domain-btn-link">
                    Explore Program &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Sticky Mobile Bottom CTA */}
      <div className="prog-mobile-sticky-bar">
        <div>
          <span className="sticky-domain">{program.title}</span>
          <span className="sticky-sub">Applications Open</span>
        </div>
        <Link to={`/apply?program=${program.id}`} className="sticky-apply-btn">
          Apply Now 🚀
        </Link>
      </div>
    </div>
  );
};
