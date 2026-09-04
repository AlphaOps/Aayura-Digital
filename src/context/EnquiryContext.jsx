import React, { createContext, useContext, useState } from 'react';

const EnquiryContext = createContext();

export const useEnquiry = () => useContext(EnquiryContext);

export const EnquiryProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefilledProgram, setPrefilledProgram] = useState('');

  const openEnquiry = (programId = '') => {
    setPrefilledProgram(programId);
    setIsModalOpen(true);
    // Prevent background scrolling on mobile/desktop
    document.body.style.overflow = 'hidden';
  };

  const closeEnquiry = () => {
    setIsModalOpen(false);
    setPrefilledProgram('');
    // Restore background scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <EnquiryContext.Provider value={{ isModalOpen, prefilledProgram, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};
