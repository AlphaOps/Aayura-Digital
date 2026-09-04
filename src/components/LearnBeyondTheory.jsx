import React from 'react';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import './LearnBeyondTheory.css';

export const LearnBeyondTheory = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Practical Learning',
      desc: 'Learn by doing instead of only watching lectures. Build muscle memory through tangible execution.'
    },
    {
      icon: '💼',
      title: 'Project-Based Experience',
      desc: 'Build work that can contribute directly to your personal portfolio and showcase your capabilities.'
    },
    {
      icon: '🛠️',
      title: 'Industry-Relevant Skills',
      desc: 'Explore modern tools, frameworks, and workflows actively utilized in today’s digital tech companies.'
    },
    {
      icon: '🗺️',
      title: 'Structured Guidance',
      desc: 'Follow a clear step-by-step roadmap with assigned tasks, measurable milestones, and actionable feedback.'
    }
  ];

  return (
    <Section id="learn-beyond" variant="primary" className="lbt-section">
      <SectionHeading
        subtitle="LEARN BEYOND THEORY"
        title="From Learning to Doing."
        centered={true}
      />
      <p className="lbt-description text-center">
        Aayura Digital Solutions focuses on practical learning experiences where students don't just consume information — they apply skills through tasks, projects, and guided challenges.
      </p>

      <div className="lbt-layout">
        <div className="lbt-features">
          {features.filter((item, idx, self) => idx === self.findIndex((t) => t.title === item.title)).map((item, idx) => (
            <div key={idx} className="lbt-card">
              <div className="lbt-icon">{item.icon}</div>
              <div className="lbt-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Futuristic Interactive Studio Visual */}
        <div className="lbt-visual">
          <div className="studio-canvas">
            {/* Ambient Background Glows */}
            <div className="studio-glow-purple"></div>
            <div className="studio-glow-blue"></div>

            {/* Simulated Modern Workspace UI */}
            <div className="studio-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="window-title">aayura-workspace / practical-lab</div>
                <div className="live-pill">
                  <span className="live-indicator"></span> LIVE RUN
                </div>
              </div>

              <div className="window-body">
                {/* Code Terminal View */}
                <div className="ide-terminal">
                  <div className="code-line"><span className="code-kw">import</span> &#123; AIWorkflow, MetaOptimizer &#125; <span className="code-kw">from</span> <span className="code-str">'@aayura/core'</span>;</div>
                  <div className="code-line"><span className="code-comment">// Connecting practical workflows to real outcomes</span></div>
                  <div className="code-line"><span className="code-kw">const</span> campaign = <span className="code-fn">initProject</span>(&#123; domain: <span className="code-str">'Digital Innovation'</span> &#125;);</div>
                  <div className="code-line code-active"><span className="code-cursor">&#10095;</span> campaign.<span className="code-fn">deployDeliverable</span>(status = <span className="code-highlight">'PORTFOLIO_READY'</span>);</div>
                </div>

                {/* Micro Dashboards Row */}
                <div className="dashboard-metrics-grid">
                  <div className="metric-chip">
                    <span className="metric-label">Efficiency</span>
                    <span className="metric-val">+340%</span>
                    <div className="metric-bar"><div className="bar-fill" style={{ width: '85%' }}></div></div>
                  </div>
                  <div className="metric-chip">
                    <span className="metric-label">AI Output Quality</span>
                    <span className="metric-val">99.4%</span>
                    <div className="metric-bar"><div className="bar-fill blue" style={{ width: '94%' }}></div></div>
                  </div>
                </div>

                {/* Floating Visual Modules */}
                <div className="studio-float-pill float-top">
                  <span className="pill-badge">🚀 Active Sprint</span>
                  <span className="pill-text">Building Real Deliverable #03</span>
                </div>

                <div className="studio-float-pill float-bottom">
                  <span className="pill-avatar">👨‍💻</span>
                  <div>
                    <div className="pill-author">Mentor Review Passed</div>
                    <div className="pill-sub">"Outstanding attention to UX details"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
