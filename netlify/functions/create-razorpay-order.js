const Razorpay = require('razorpay');

// Duplicate of internshipPlans since Netlify Functions in CommonJS can't easily import ES Modules from the src directory without a bundler setup.
const internshipPlans = {
  "2-weeks": {
    duration: "2 Weeks",
    title: "Start Your Professional Journey",
    price: 199,
    buttonText: "Start My Journey"
  },
  "4-weeks": {
    duration: "4 Weeks",
    title: "Build Your Foundation",
    price: 299,
    buttonText: "Build My Foundation"
  },
  "6-weeks": {
    duration: "6 Weeks",
    title: "Accelerate Your Growth",
    price: 399,
    buttonText: "Accelerate My Growth"
  },
  "8-weeks": {
    duration: "8 Weeks",
    title: "Build Career Momentum",
    price: 449,
    buttonText: "Build Momentum"
  },
  "12-weeks": {
    duration: "12 Weeks",
    title: "Professional Growth Path",
    price: 649,
    buttonText: "Level Up My Career"
  },
  "16-weeks": {
    duration: "16 Weeks",
    title: "Build Your Career Edge",
    price: 849,
    buttonText: "Build My Career Edge"
  },
  "24-weeks": {
    duration: "24 Weeks",
    title: "Premium Career Experience",
    price: 999,
    buttonText: "Unlock Premium Growth"
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { planId, customer_details } = JSON.parse(event.body);

    const selectedPlan = internshipPlans[planId];
    if (!selectedPlan) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid plan selected' }) };
    }

    const instance = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: selectedPlan.price * 100, // Razorpay amount is in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${planId}`,
    };

    const order = await instance.orders.create(options);

    return {
      statusCode: 200,
      body: JSON.stringify(order),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create order' }),
    };
  }
};
