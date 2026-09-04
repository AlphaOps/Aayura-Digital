import React from 'react';
import './StatsComponent.css';

export const StatsComponent = ({ stats = [], className = '' }) => {
  return (
    <div className={`stats-container ${className}`}>
      {stats.map((stat, idx) => (
        <div key={idx} className="stat-item">
          <div className="stat-value text-gradient">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};
