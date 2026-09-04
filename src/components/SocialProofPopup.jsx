import React, { useState, useEffect, useRef } from 'react';
import { PROGRAM_DOMAINS } from '../data/programsData';
import './SocialProofPopup.css';

const NAMES = [
  'Divya Jain', 'Aarav Sharma', 'Priya Patil', 'Rahul Verma', 
  'Sneha Kulkarni', 'Aditya Joshi', 'Ananya Gupta', 'Rohan Mehta', 
  'Pooja Deshmukh', 'Aryan Singh', 'Kavya Shah', 'Yash Patil', 
  'Neha Agarwal', 'Siddharth Rao', 'Isha Sharma', 'Omkar Kulkarni', 
  'Riya Jain', 'Vedant Patil', 'Tanvi Desai', 'Arjun More', 
  'Shreya Gupta', 'Akash Jadhav', 'Nikita Sharma', 'Harsh Verma', 
  'Sakshi Patil'
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const SocialProofPopup = () => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const lastProgramRef = useRef('');
  const lastNameRef = useRef('');
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const showRandomNotification = () => {
    let name = getRandomItem(NAMES);
    while (name === lastNameRef.current) name = getRandomItem(NAMES);
    lastNameRef.current = name;

    let program = getRandomItem(PROGRAM_DOMAINS).title;
    while (program === lastProgramRef.current) program = getRandomItem(PROGRAM_DOMAINS).title;
    lastProgramRef.current = program;

    setNotification({ name, program });
    setIsVisible(true);

    const displayDuration = getRandomInt(6000, 8000); // 6-8 seconds
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      
      const nextInterval = getRandomInt(15000, 25000); // 15-25 seconds
      timeoutRef.current = setTimeout(showRandomNotification, nextInterval);
    }, displayDuration);
  };

  useEffect(() => {
    const initialDelay = getRandomInt(10000, 15000);
    timeoutRef.current = setTimeout(showRandomNotification, initialDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  if (!notification) return null;

  return (
    <div className={`live-enrollment-toast ${isVisible ? 'visible' : ''}`}>
      <div className="le-toast-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      
      <div className="le-toast-content">
        <strong>{notification.name}</strong> just enrolled in {notification.program}
      </div>
      
      <div className="le-toast-time">
        • Just now
      </div>

      <button className="le-toast-close" onClick={() => setIsVisible(false)} aria-label="Close notification">×</button>
    </div>
  );
};
