import React, { useState } from 'react';
import { Section } from '../components/Section';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiries',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(false);

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiryType: formData.subject,
      message: formData.message,
      source: "Website Contact Form"
    };

    console.log("Sending to Google Sheet:", payload);

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
      
      console.log("Google Sheet request completed");
      
      // In no-cors mode, we can't read the response, so we assume success if no network error
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Enquiries',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactChannels = [
    { title: 'General Enquiries', email: 'scalvora.team@gmail.com', desc: 'Questions about our programs, cohorts, and learning paths.' },
    { title: 'Internship Support', email: 'scalvora.team@gmail.com', desc: 'Active student assistance with task submissions and dashboard access.' },
    { title: 'College Collaborations', email: 'scalvora.team@gmail.com', desc: 'Institutional partnerships and campus practical training workshops.' }
  ];

  return (
    <div className="contact-page">
      <header className="contact-hero text-center">
        <div className="container">
          <span className="contact-eyebrow">✦ GET IN TOUCH</span>
          <h1 className="contact-hero-title">
            Let's Build Your <span className="text-gradient">Next Step.</span>
          </h1>
          <p className="contact-hero-sub">
            Whether you are a student, educator, or enterprise collaborator, our team is here to assist.
          </p>
        </div>
      </header>

      <Section variant="secondary" className="contact-content-section">
        <div className="container contact-split-grid">
          {/* Left Column: Direct Channels & College Banner */}
          <div className="contact-info-panel">
            <h2 className="panel-heading">Connect With Us</h2>
            <p className="panel-sub">Select the channel that best suits your inquiry for rapid routing:</p>

            <p className="quick-help-inline">
              <span className="quick-help-icon">📞</span> Need quick help? Call or WhatsApp:{' '}
              <a href="tel:+917796248049" className="quick-help-phone" aria-label="Call or WhatsApp +91 7796248049">
                +91 7796248049
              </a>
            </p>

            <div className="channel-cards-list">
              {contactChannels.map((ch, idx) => (
                <div key={idx} className="channel-card">
                  <h4>{ch.title}</h4>
                  <p className="ch-desc">{ch.desc}</p>
                  <a href={`mailto:${ch.email}`} className="ch-email">{ch.email}</a>
                </div>
              ))}
            </div>

            {/* College Collaboration Feature Block */}
            <div className="college-callout-card">
              <span className="callout-tag">🎓 INSTITUTIONAL OUTREACH</span>
              <h3>Are You a College or Institution?</h3>
              <p>
                We welcome opportunities to collaborate with universities and departments for campus-wide practical learning initiatives and student hackathons.
              </p>
              <a href="mailto:scalvora.team@gmail.com" className="callout-cta-btn">
                Explore Collaboration &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Accessible Mobile-First Form */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="form-success-card">
                <div className="success-icon">✓</div>
                <h3>Message sent successfully!</h3>
                <p>Our team will get back to you shortly.</p>
                <button className="reset-btn" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Send a Direct Message</h3>

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject / Inquiry Type</label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="General Enquiries">General Enquiries</option>
                    <option value="Internship Support">Internship Support</option>
                    <option value="Partnership Opportunities">Partnership Opportunities</option>
                    <option value="College Collaborations">College Collaborations</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    placeholder="How can we assist you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                {submitError && (
                  <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Something went wrong. Please try again.
                  </div>
                )}

                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message \u2192'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};
