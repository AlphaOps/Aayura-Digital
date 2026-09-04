const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature, 
      applicationData 
    } = JSON.parse(event.body);

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error("Missing RAZORPAY_KEY_SECRET");
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
    }

    // Verify the signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      console.error("Payment verification failed! Invalid signature.");
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid payment signature' }) };
    }

    console.log("Payment Verified! Forwarding to Google Apps Script...");

    // Forward to Google Apps Script
    const payload = {
      formType: "Internship Application",
      fullName: applicationData.fullName,
      email: applicationData.email,
      phone: applicationData.phone,
      internshipPosition: applicationData.domain, // The domain id from frontend
      collegeOrCompany: applicationData.college || "Not Provided",
      preferredBatch: applicationData.batch,
      additionalMessage: applicationData.notes || "",
      planId: applicationData.planId,
      planDuration: applicationData.planDuration,
      amountPaid: applicationData.planPrice,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      submittedAt: new Date().toISOString()
    };

    // Forward payload using global fetch
    try {
      await fetch("https://script.google.com/macros/s/AKfycbw57d_daHHqG9o6QzF2Yn3pgqXsBxlGWOTyy9K5DtJz2FI2phwf4dZqJGGixsQYbALd/exec", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });
      console.log("Successfully posted to Google Sheets");
    } catch (sheetError) {
      console.error("Warning: Failed to post to Google Sheets", sheetError);
      // We still return 200 because the payment itself was successful.
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Payment verified and data recorded' })
    };

  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
