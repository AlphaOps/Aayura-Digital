import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { PROGRAM_DOMAINS, BATCHES_DATA } from '../data/programsData';
import { internshipPlans } from '../data/internshipPlans';
import { load } from '@cashfreepayments/cashfree-js';
import { viewContent, initiateCheckout, purchase } from '../utils/metaPixel';
import './Register.css';

export const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialDomain = searchParams.get('program') || searchParams.get('domain') || 'artificial-intelligence-machine-learning';
  const initialBatch = searchParams.get('batch') || 'sep-batch';
  const planId = searchParams.get('plan');

  const selectedPlan = internshipPlans[planId];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    batch: initialBatch,
    domain: initialDomain,
    college: '',
    notes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState(null);
  const [cashfree, setCashfree] = useState(null);

  const selectedDomainObj = PROGRAM_DOMAINS.find(p => p.id === formData.domain) || PROGRAM_DOMAINS[0];
  const totalAmount = selectedPlan ? selectedPlan.price : 0;

  // Redirect to programs if plan is invalid
  if (!selectedPlan) {
    return <Navigate to="/programs" replace />;
  }

  // Fire ViewContent
  useEffect(() => {
    if (selectedPlan) {
      console.log(`[Meta Pixel] ViewContent fired with value: ${selectedPlan.price}`);
      viewContent({ value: selectedPlan.price, currency: 'INR' });
    }
  }, [planId]);

  // Initialize Cashfree SDK
  useEffect(() => {
    load({
      mode: "sandbox" // Change to "production" when going live
    }).then((cf) => {
      setCashfree(cf);
    });
  }, []);

  // Handle return from Cashfree redirect (check for order_id in URL)
  useEffect(() => {
    const orderId = searchParams.get('order_id');
    
    if (orderId) {
      setIsProcessing(true);
      // Verify payment status via backend
      fetch('/.netlify/functions/verify-cashfree-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          order_id: orderId,
          applicationData: {
            fullName: searchParams.get('name') || '',
            email: searchParams.get('email') || '',
            phone: searchParams.get('phone') || '',
            domain: searchParams.get('domain') || initialDomain,
            batch: searchParams.get('batch') || initialBatch,
            college: searchParams.get('college') || '',
            notes: searchParams.get('notes') || '',
            planId: planId,
            planDuration: selectedPlan?.duration,
            planPrice: selectedPlan?.price
          }
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const generatedId = data.applicationId || `AYR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
          setSubmittedAppId(generatedId);
          console.log(`[Meta Pixel] Purchase fired with value: ${totalAmount}`);
          purchase({ value: totalAmount, currency: 'INR' });
        } else {
          alert("Payment verification failed. Please contact support if amount was deducted.");
        }
      })
      .catch(() => {
        alert("Error verifying payment. Please contact support.");
      })
      .finally(() => {
        setIsProcessing(false);
      });
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill all required fields");
      return;
    }

    setIsProcessing(true);
    
    const metaCheckoutValue = Number(totalAmount);
    console.log('[Meta Pixel] InitiateCheckout:', metaCheckoutValue);

    if (
      typeof window !== 'undefined' &&
      typeof window.fbq === 'function' &&
      Number.isFinite(metaCheckoutValue) &&
      metaCheckoutValue > 0
    ) {
      window.fbq('track', 'InitiateCheckout', {
        value: metaCheckoutValue,
        currency: 'INR'
      });
    }
    
    try {
      // 1. Create Cashfree order on our backend
      const res = await fetch('/.netlify/functions/create-cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: planId,
          customer_details: {
            customer_id: `CUST_${Date.now()}`,
            customer_name: formData.fullName,
            customer_email: formData.email,
            customer_phone: formData.phone
          },
          return_url: `${window.location.origin}/register?plan=${planId}&domain=${formData.domain}&batch=${formData.batch}&name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}&college=${encodeURIComponent(formData.college)}&notes=${encodeURIComponent(formData.notes)}&order_id={order_id}`
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to create order');
      }

      const orderData = await res.json();

      if (orderData.payment_session_id && cashfree) {
        // 2. Open Cashfree Checkout
        const checkoutOptions = {
          paymentSessionId: orderData.payment_session_id,
          redirectTarget: "_self"
        };
        cashfree.checkout(checkoutOptions);
      } else {
        alert("Failed to initialize payment gateway. Please try again.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment flow error:", error);
      alert("Something went wrong. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  // SUCCESS SCREEN
  if (submittedAppId) {
    return (
      <div className="checkout-page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="checkout-form-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: '#10B981', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 20px' }}>✓</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.1em' }}>PAYMENT SUCCESSFUL</span>
            <h1 style={{ margin: '12px 0 24px', fontSize: '2rem' }}>Enrollment Confirmed!</h1>
            <p style={{ color: '#4B5563', marginBottom: '32px' }}>
              Welcome to Aayura Digital Solutions. Your application ID is <strong style={{ color: '#7C4DDB' }}>{submittedAppId}</strong>. We've sent the onboarding instructions to your email.
            </p>
            <Link to="/programs" className="btn-pay" style={{ textDecoration: 'none' }}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-container">
        
        {/* LEFT COLUMN: SUMMARY */}
        <div className="checkout-summary-panel">
          <div className="summary-brand-banner">
            <div className="summary-logo-group">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22H22L12 2Z" fill="white" />
              </svg>
              <span className="summary-brand-text">AAYURA DIGITAL SOLUTIONS</span>
            </div>
            <div className="secure-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Secured
            </div>
          </div>

          <div className="summary-content">
            <span className="summary-eyebrow">{selectedPlan.duration} – Virtual Internship Program</span>
            <h1 className="summary-title">{selectedPlan.title}</h1>
            <p className="summary-desc">
              Gain practical industry experience through structured projects, guided workflows and real-world deliverables.
            </p>

            <div className="included-section">
              <h4>What's Included</h4>
              <ul className="included-list">
                <li>
                  <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Professional Project Experience
                </li>
                <li>
                  <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Weekly Tasks &amp; Deliverables
                </li>
                <li>
                  <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Internship Certificate
                </li>
                <li>
                  <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Letter of Recommendation (where applicable)
                </li>
                <li>
                  <svg className="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Project Team Briefing
                </li>
              </ul>
              
              <a href="#details" className="view-details-link">
                View Full Details 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </a>
            </div>

            <div className="support-footer">
              <span className="support-text">Questions about enrollment?</span>
              <Link to="/contact" className="support-link">Contact Support &rarr;</Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM & PAYMENT */}
        <div className="checkout-form-panel">
          <div className="order-summary-box">
            <div>
              <div className="order-prog-label">Program</div>
              <div className="order-prog-name">{selectedPlan.duration} Professional Internship</div>
            </div>
            <div className="order-amount">
              <div className="order-prog-label">Amount</div>
              <div className="order-amt-val">₹{totalAmount}</div>
            </div>
          </div>

          <form className="checkout-form-body" onSubmit={handlePayment}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name <span className="req-ast">*</span></label>
              <input
                type="text"
                id="fullName"
                required
                placeholder="Eg. Ashok Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="req-ast">*</span></label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Eg. ashoka@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="req-ast">*</span></label>
                <div className="phone-input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="Eg. 98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="batch">Batch Starting Date <span className="req-ast">*</span></label>
                <select 
                  id="batch" 
                  value={formData.batch}
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                >
                  {BATCHES_DATA.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="domain">Selected Domain <span className="req-ast">*</span></label>
                <select 
                  id="domain" 
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                >
                  {PROGRAM_DOMAINS.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="college">College / Organization Name <span style={{fontWeight: 400, color: '#9CA3AF'}}>(optional)</span></label>
              <input
                type="text"
                id="college"
                placeholder="Eg. Delhi University"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="notes">Additional Notes <span style={{fontWeight: 400, color: '#9CA3AF'}}>(optional)</span></label>
              <textarea
                id="notes"
                placeholder="Any special requests or queries..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>
          </form>

          {/* STICKY PAYMENT FOOTER */}
          <div className="sticky-payment-section">
            <div className="payment-summary-row">
              <span className="pay-sum-label">Secure Payment</span>
              <span className="pay-sum-val">Total Amount: ₹{totalAmount}</span>
            </div>
            
            <button 
              type="submit" 
              className="btn-pay" 
              disabled={isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? (
                <div className="loader-spinner"></div>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Pay ₹{totalAmount} &rarr;
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
