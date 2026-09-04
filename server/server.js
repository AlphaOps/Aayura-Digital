import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("=== SERVER BOOT ===");
console.log("CASHFREE_APP_ID exists:", !!process.env.CASHFREE_APP_ID);
console.log("CASHFREE_SECRET_KEY exists:", !!process.env.CASHFREE_SECRET_KEY);
console.log("Environment:", process.env.CASHFREE_ENV || 'sandbox');

const getBaseUrl = () => {
  return process.env.CASHFREE_ENV === 'production' 
    ? 'https://api.cashfree.com/pg' 
    : 'https://sandbox.cashfree.com/pg';
};

app.post('/api/create-order', async (req, res) => {
  console.log("\n[POST /api/create-order] - Received request");
  try {
    const { order_amount, customer_details, order_meta } = req.body;
    
    // Create unique order_id if not provided
    const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const payload = {
      order_id: order_id,
      order_amount: order_amount,
      order_currency: 'INR',
      customer_details: customer_details,
      order_meta: order_meta
    };
    
    console.log("Payload:", JSON.stringify(payload, null, 2));
    console.log(`Calling Cashfree API at: ${getBaseUrl()}/orders`);

    const response = await fetch(`${getBaseUrl()}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree API Error:', data);
      return res.status(response.status).json({ error: data.message || 'Cashfree error', details: data });
    }

    console.log("Cashfree Success Response. payment_session_id exists:", !!data.payment_session_id);
    res.json(data);
  } catch (error) {
    console.error('Server Error in /api/create-order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  console.log("\n[POST /api/verify-payment] - Received request");
  try {
    const { order_id } = req.body;
    
    const response = await fetch(`${getBaseUrl()}/orders/${order_id}`, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree API Error during verification:', data);
      return res.status(response.status).json({ error: data.message || 'Verification error' });
    }

    res.json(data);
  } catch (error) {
    console.error('Server Error in /api/verify-payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
