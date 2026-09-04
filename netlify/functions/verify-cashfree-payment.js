const { Cashfree } = require('cashfree-pg');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { order_id, applicationData } = JSON.parse(event.body);

    if (!order_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing order_id' })
      };
    }

    // Configure Cashfree
    Cashfree.XClientId = process.env.CASHFREE_APP_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
    Cashfree.XEnvironment = process.env.CASHFREE_ENV === 'production'
      ? Cashfree.Environment.PRODUCTION
      : Cashfree.Environment.SANDBOX;

    // Fetch order status from Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
    const payments = response.data;

    // Check if any payment is successful
    const successfulPayment = payments && payments.length > 0
      ? payments.find(p => p.payment_status === 'SUCCESS')
      : null;

    if (!successfulPayment) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Payment not successful' })
      };
    }

    // Payment is verified! Now forward to Google Apps Script
    const applicationId = `AYR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      formType: "Internship Application",
      fullName: applicationData.fullName || "",
      email: applicationData.email || "",
      phone: applicationData.phone || "",
      internshipPosition: applicationData.domain || "",
      collegeOrCompany: applicationData.college || "Not Provided",
      preferredBatch: applicationData.batch || "",
      additionalMessage: applicationData.notes || "",
      planId: applicationData.planId || "",
      planDuration: applicationData.planDuration || "",
      amountPaid: successfulPayment.payment_amount || applicationData.planPrice || "",
      paymentId: successfulPayment.cf_payment_id || "",
      orderId: order_id,
      paymentStatus: "SUCCESS",
      applicationId: applicationId,
      submittedAt: new Date().toISOString()
    };

    // Forward to existing Google Apps Script endpoint
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbw57d_daHHqG9o6QzF2Yn3pgqXsBxlGWOTyy9K5DtJz2FI2phwf4dZqJGGixsQYbALd/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(payload)
        }
      );
      console.log("Successfully posted to Google Sheets");
    } catch (sheetError) {
      console.error("Warning: Failed to post to Google Sheets", sheetError);
      // Still return success because the payment itself was verified
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        applicationId: applicationId,
        message: 'Payment verified and application recorded'
      })
    };

  } catch (error) {
    console.error('Error verifying Cashfree payment:', error?.response?.data || error.message || error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Payment verification failed' })
    };
  }
};
