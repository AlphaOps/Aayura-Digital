/**
 * Meta Pixel tracking utility
 * Safely wraps fbq calls to ensure they only fire if fbq is initialized.
 */

export const trackMetaEvent = (eventName, data = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    if (Object.keys(data).length > 0) {
      window.fbq('track', eventName, data);
    } else {
      window.fbq('track', eventName);
    }
  } else {
    console.warn(`Meta Pixel (fbq) is not initialized. Failed to track event: ${eventName}`);
  }
};

export const pageView = () => trackMetaEvent('PageView');
export const viewContent = (data) => trackMetaEvent('ViewContent', data);
export const addToCart = (data) => trackMetaEvent('AddToCart', data);
export const initiateCheckout = (data) => trackMetaEvent('InitiateCheckout', data);

// IMPORTANT: Do not automatically fire Purchase unless a payment is genuinely confirmed successfully.
export const purchase = (data) => trackMetaEvent('Purchase', data);
