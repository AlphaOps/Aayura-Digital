import React, { useState } from 'react';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';
import './RecognizingExcellence.css';

export const RecognizingExcellence = () => {
  const [hideNames, setHideNames] = useState(false);

  const rewards = [
    {
      title: 'Direct Job Opportunity',
      icon: '🏆',
      criteria: 'Top-performing students may receive direct job opportunities or placement offers based on their exceptional performance, project quality, consistency, and overall contribution during the internship.',
      isFeatured: true,
      color: '#7C4DDB'
    },
    {
      place: '1st Place',
      amount: '₹10,000',
      title: '1st Place – ₹10,000',
      icon: '🥇',
      criteria: 'The #1 top performer will receive a cash reward of ₹10,000 for outstanding performance and exceptional project execution.',
      color: '#F59E0B'
    },
    {
      place: '2nd Place',
      amount: '₹7,000',
      title: '2nd Place – ₹7,000',
      icon: '🥈',
      criteria: 'The second-best performer will receive a cash reward of ₹7,000 for consistently delivering high-quality work.',
      color: '#64748B'
    },
    {
      place: '3rd Place',
      amount: '₹5,000',
      title: '3rd Place – ₹5,000',
      icon: '🥉',
      criteria: 'The third-best performer will receive a cash reward of ₹5,000 for demonstrating strong skills, dedication, and project excellence.',
      color: '#D97706'
    },
    {
      title: 'Recognition & Growth',
      icon: '🚀',
      criteria: 'Outstanding students gain recognition, stronger portfolios, mentorship opportunities, and increased chances to work on real industry opportunities.',
      color: '#3B82F6'
    }
  ];

  const sampleLeaderboard = [
    { rank: 1, name: 'Aarav Sharma', points: '1,450 XP', projects: 4, badge: '🏆 Top Performer' },
    { rank: 2, name: 'Ananya Iyer', points: '1,380 XP', projects: 3, badge: '💎 Project Excellence' },
    { rank: 3, name: 'Rohan Mehta', points: '1,320 XP', projects: 3, badge: '⚡ Consistency Award' },
    { rank: 4, name: 'Pooja Kulkarni', points: '1,290 XP', projects: 3, badge: '🚀 Innovation Award' }
  ];

  return (
    <Section id="recognition" variant="secondary" className="rec-section">
      <SectionHeading
        subtitle="MERIT & RECOGNITION"
        title="Recognizing Exceptional Work"
        centered={true}
      />
      <p className="rec-sub text-center">
        We believe disciplined effort and high craftsmanship deserve spotlighting. Active learners can earn official distinction badges and peer recognition.
      </p>

      {/* Rewards Grid */}
      <div className="badges-grid">
        {rewards.map((r, idx) => (
          <div
            key={idx}
            className={`badge-card ${r.isFeatured ? 'badge-card-featured' : ''}`}
            style={{ '--b-color': r.color }}
          >
            <div
              className="badge-icon-box"
              style={{ borderColor: `${r.color}40`, background: `${r.color}12` }}
            >
              <span className="b-icon">{r.icon}</span>
            </div>
            <h3 className="badge-name">
              {r.amount ? (
                <>
                  {r.place} – <span className="reward-amount-highlight">{r.amount}</span>
                </>
              ) : (
                r.title
              )}
            </h3>
            <p className="badge-criteria">{r.criteria}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard Concept Preview Box */}
      <div className="leaderboard-preview-box">
        <div className="lb-header">
          <div>
            <span className="lb-eyebrow">Student Dashboard Feature</span>
            <h3>Cohort Excellence Leaderboard</h3>
          </div>
          <div className="privacy-toggle-wrap">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={hideNames}
                onChange={(e) => setHideNames(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Student Privacy Mode</span>
            </label>
          </div>
        </div>

        <div className="lb-table-wrapper">
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Learner</th>
                <th>Milestone XP</th>
                <th>Completed Projects</th>
                <th>Active Badge</th>
              </tr>
            </thead>
            <tbody>
              {sampleLeaderboard.map((row) => (
                <tr key={row.rank}>
                  <td>
                    <span className={`rank-pill rank-${row.rank}`}>#{row.rank}</span>
                  </td>
                  <td className="learner-cell">
                    <span className="avatar-circle">{hideNames ? '🔒' : row.name.charAt(0)}</span>
                    <span className="learner-name">{hideNames ? `Student #${row.rank}09` : row.name}</span>
                  </td>
                  <td className="xp-cell">{row.points}</td>
                  <td>{row.projects} Verified</td>
                  <td>
                    <span className="mini-badge-pill">{row.badge}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Leaderboard Cards (visible only on mobile) */}
        <div className="lb-mobile-cards">
          {sampleLeaderboard.map((row) => (
            <div key={row.rank} className="lb-mobile-card">
              <div className="lb-mc-top">
                <span className={`rank-pill rank-${row.rank}`}>#{row.rank}</span>
                <span className="lb-mc-xp">{row.points}</span>
              </div>
              <div className="lb-mc-middle">
                <span className="avatar-circle">{hideNames ? '🔒' : row.name.charAt(0)}</span>
                <span className="learner-name">{hideNames ? `Student #${row.rank}09` : row.name}</span>
              </div>
              <div className="lb-mc-bottom">
                <span className="lb-mc-projects">✓ {row.projects} Verified Projects</span>
                <span className="mini-badge-pill">{row.badge}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lb-disclaimer">
          <span>🛡️ <strong>Integrity & Privacy:</strong> Participation is strictly voluntary. Badges celebrate learning milestones and do not imply commercial employment guarantees.</span>
        </div>
      </div>
    </Section>
  );
};
