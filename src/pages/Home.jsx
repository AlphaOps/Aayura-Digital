import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStats } from '../components/TrustStats';
import { WhyMaincrafts } from '../components/WhyMaincrafts';
import { CareerDomains } from '../components/CareerDomains';

import { InternshipJourney } from '../components/InternshipJourney';
import { RecognizingExcellence } from '../components/RecognizingExcellence';
import { ComprehensiveFAQ } from '../components/ComprehensiveFAQ';
import { FinalCTA } from '../components/FinalCTA';

export const Home = () => {
  return (
    <div className="home-page-container">
      {/* 1. Hero Section */}
      <Hero />

      {/* 1.5. Transparent Proof Metrics */}
      <TrustStats />

      {/* 2. Core Value Proposition */}
      <WhyMaincrafts />


      {/* 4. Choose Your Career Domain (31 domains) */}
      <CareerDomains />



      {/* 7. Your Internship Journey (6 Steps) */}
      <InternshipJourney />






      {/* 11. Recognizing Exceptional Work (Badges & Dashboard Leaderboard Preview) */}
      <RecognizingExcellence />

      {/* 12. 15-Question Comprehensive FAQ */}
      <ComprehensiveFAQ />

      {/* 13. Momentum Final Call-to-Action */}
      <FinalCTA />
    </div>
  );
};
