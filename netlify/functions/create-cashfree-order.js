const { Cashfree } = require('cashfree-pg');

// Server-side copy of internship plans — the ONLY source of truth for pricing
const internshipPlans = {
  "2-weeks":  { duration: "2 Weeks",  title: "Start Your Professional Journey", price: 199 },
  "4-weeks":  { duration: "4 Weeks",  title: "Build Your Foundation",           price: 299 },
  "6-weeks":  { duration: "6 Weeks",  title: "Accelerate Your Growth",          price: 399 },
  "8-weeks":  { duration: "8 Weeks",  title: "Build Career Momentum",           price: 449 },
  "12-weeks": { duration: "12 Weeks", title: "Professional Growth Path",        price: 649 },
  "16-weeks": { duration: "16 Weeks", title: "Build Your Career Edge",          price: 849 },
  "24-weeks": { duration: "24 Weeks", title: "Premium Career Experience",       price: 999 }
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { planId, customer_details, return_url } = JSON.parse(event.body);

    // Validate plan exists server-side — NEVER trust frontend price
    const selectedPlan = internshipPlans[planId];
    if (!selectedPlan) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid plan selected' })
      };
    }

    // Configure Cashfree
    Cashfree.XClientId = process.env.CASHFREE_APP_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
    Cashfree.XEnvironment = process.env.CASHFREE_ENV === 'production'
      ? Cashfree.Environment.PRODUCTION
      : Cashfree.Environment.SANDBOX;

    const orderId = `ORDER_${Date.now()}_${planId}`;

    const request = {
      order_amount: selectedPlan.price,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customer_details.customer_id || `CUST_${Date.now()}`,
        customer_name: customer_details.customer_name,
        customer_email: customer_details.customer_email,
        customer_phone: customer_details.customer_phone
      },
      order_meta: {
        return_url: return_url || ""
      },
      order_note: `${selectedPlan.duration} Professional Internship - ${selectedPlan.title}`
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    return {
      statusCode: 200,
      body: JSON.stringify({
        payment_session_id: response.data.payment_session_id,
        order_id: response.data.order_id,
        order_amount: selectedPlan.price
      })
    };
  } catch (error) {
    console.error('Error creating Cashfree order:', error?.response?.data || error.message || error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create payment order' })
    };
  }
};
