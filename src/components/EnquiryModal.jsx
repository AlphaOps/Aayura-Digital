import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnquiry } from '../context/EnquiryContext';
import { PROGRAM_DOMAINS } from '../data/programsData';
import './EnquiryModal.css';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", 
  "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

export const EnquiryModal = () => {
  const { isModalOpen, prefilledProgram, closeEnquiry } = useEnquiry();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    batch: '',
    college: '',
    state: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setFormData(prev => ({
        ...prev,
        program: prefilledProgram || ''
      }));
      setErrors({});
      setIsSuccess(false);
      setIsError(false);
    }
  }, [isModalOpen, prefilledProgram]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeEnquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeEnquiry]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.program) newErrors.program = 'Please select a program';
    if (!formData.batch) newErrors.batch = 'Please select a preferred batch';
    if (!formData.college.trim()) newErrors.college = 'College/Company Name is required';
    if (!formData.state) newErrors.state = 'Please select your state';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setIsError(false);
    
    const payload = {
      formType: "Internship Enquiry",
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      internshipPosition: formData.program,
      collegeOrCompany: formData.college,
      preferredBatch: formData.batch,
      additionalMessage: formData.message,
      submittedAt: new Date().toISOString()
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbw57d_daHHqG9o6QzF2Yn3pgqXsBxlGWOTyy9K5DtJz2FI2phwf4dZqJGGixsQYbALd/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        }
      );
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting enquiry form:', error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('enquiry-modal-overlay')) {
      closeEnquiry();
    }
  };

  return (
    <div className={`enquiry-modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
      <div className="enquiry-modal-container">
        <button className="close-modal-btn" onClick={closeEnquiry}>&times;</button>
        
        {isSuccess ? (
          <div className="enquiry-success-state">
            <div className="success-check-icon">&#10003;</div>
            <h3>Enquiry Submitted Successfully!</h3>
            <p>Thank you! Our team will contact you shortly to help you choose the right internship program.</p>
            <button className="enquiry-submit-btn" onClick={closeEnquiry} style={{ maxWidth: '250px' }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="enquiry-modal-header">
              <h2>Internship Enquiry</h2>
              <p>Fill in your details and our team will help you choose the right internship program.</p>
            </div>

            <div className="enquiry-modal-body">
              <form id="enquiry-form" onSubmit={handleSubmit} className="enquiry-form-grid">
                
                <div className="enquiry-form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Enter your full name" 
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="yourname@email.com" 
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label>Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label>State *</label>
                  <select 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange}
                    className={errors.state ? 'error' : ''}
                  >
                    <option value="">Select your state</option>
                    {INDIAN_STATES.sort().map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>

                <div className="enquiry-form-group form-full-width">
                  <label>Position for Internship *</label>
                  <select 
                    name="program" 
                    value={formData.program} 
                    onChange={handleChange}
                    className={errors.program ? 'error' : ''}
                  >
                    <option value="">Select a program</option>
                    {PROGRAM_DOMAINS.map(prog => (
                      <option key={prog.id} value={prog.id}>{prog.title}</option>
                    ))}
                    <option value="not-sure">Not Sure – Help Me Choose</option>
                  </select>
                  {errors.program && <span className="error-text">{errors.program}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label>College Name / Company Name *</label>
                  <input 
                    type="text" 
                    name="college"
                    placeholder="Enter your college or company name" 
                    value={formData.college}
                    onChange={handleChange}
                    className={errors.college ? 'error' : ''}
                  />
                  {errors.college && <span className="error-text">{errors.college}</span>}
                </div>

                <div className="enquiry-form-group">
                  <label>Preferred Batch *</label>
                  <select 
                    name="batch" 
                    value={formData.batch} 
                    onChange={handleChange}
                    className={errors.batch ? 'error' : ''}
                  >
                    <option value="">Select preferred batch</option>
                    <option value="upcoming">Upcoming Batch</option>
                    <option value="next-month">Next Month Batch</option>
                    <option value="flexible">Flexible / Not Sure</option>
                  </select>
                  {errors.batch && <span className="error-text">{errors.batch}</span>}
                </div>

                <div className="enquiry-form-group form-full-width">
                  <label>Additional Message (Optional)</label>
                  <textarea 
                    name="message"
                    placeholder="Tell us anything else about your internship requirements..." 
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

              </form>
            </div>
            
            <div className="enquiry-modal-footer">
              {isError && (
                <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
                  Something went wrong. Please try again.
                </div>
              )}
              <button 
                type="submit" 
                form="enquiry-form" 
                className="enquiry-submit-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : (isError ? 'Retry Submit \u2192' : 'Submit Enquiry \u2192')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
