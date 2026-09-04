import React, { useState, useEffect, useRef } from 'react';
import './TrustStats.css';

const CountUp = ({ end, duration = 1500, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const startVal = 0;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const current = Math.floor(progress * (end - startVal) + startVal);
            setCount(current);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className="animated-counter-val">
      {prefix}{count}{suffix}
    </span>
  );
};

export const TrustStats = () => {
  const stats = [
    {
      val: '10,000+',
      label: 'Students Trained',
      subtext: 'Empowered across engineering & tech institutes'
    },
    {
      val: '30+',
      label: 'Professional Programs',
      subtext: 'Specialized tracks from AI to Civil & Mechanical'
    },
    {
      val: 'Core Team',
      label: 'Expert Guidance',
      subtext: 'Learn, grow and get guided directly by our experienced core team'
    },
    {
      val: 'Hands-On',
      label: 'Industry-Level Projects',
      subtext: 'Work on practical projects designed to build real-world skills and a stronger portfolio'
    }
  ];

  return (
    <div className="trust-stats-wrapper">
      <div className="container">
        <div className="trust-stats-grid">
          {stats.map((item, idx) => (
            <div key={idx} className="trust-stat-box">
              <div className="stat-number-display">{item.val}</div>
              <h4 className="stat-title">{item.label}</h4>
              <p className="stat-sub">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
