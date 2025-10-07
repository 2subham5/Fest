const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
// const { authenticateUserJwt } = require('../middleware/auth'); // ✅ if auth exports an object
const { Payment } = require('../db/db');
const crypto = require('crypto'); 
const { z } = require("zod");
const axios = require('axios');

const paymentValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Name must contain only letters and spaces"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  contact: z
    .string()
    .trim()
    .min(1, "Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/pay', async (req, res) => {

  try {
        const { name, email, contact } = paymentValidationSchema.parse(req.body);
        const existingIssuedPayment = await Payment.findOne({
      email,
       status: { $in: ['issued', 'expired'] }

    });

    if (existingIssuedPayment) {
      return res.status(400).json({
        error: 'This email has already completed a payment.'
      });
    }
    const amountINR = 5;
    const amountPaise = amountINR * 100;
    const uniqueId = uuidv4().replace(/-/g, '').slice(0, 32);

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `receipt_${uniqueId}`,
      payment_capture: 1
    });
let paymentDoc = await Payment.findOne({
      email,
      status: { $in: ['initiated', 'failed'] }
    });

   if (paymentDoc) {
      // Update existing payment
      paymentDoc.name = name;
      paymentDoc.contact = contact;
      paymentDoc.amount = amountPaise;
      paymentDoc.razorpayOrderId = order.id;
      paymentDoc.uniqueId = uniqueId;
      paymentDoc.status = 'initiated';
      await paymentDoc.save();
    } else {
      // Create new payment
      paymentDoc = new Payment({
        email,
        name,
        contact,
        amount: amountPaise,
        razorpayOrderId: order.id,
        uniqueId,
        status: 'initiated'
      });
      await paymentDoc.save();
    }

    res.json({
      email,
      name,
      contact,
      message: 'order_created',
      uniqueId,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      },
      razorpayKeyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors.map(e => e.message) });
    }
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.post("/verifyPayment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      uniqueId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Payment successful → set to issued
      await Payment.findOneAndUpdate(
        { uniqueId },
        { 
          status: "issued",
          razorpayPaymentId: razorpay_payment_id 
        }
      );

      return res.json({ message: "Payment verified successfully" });
    } else {
      // ❌ Signature mismatch → set to failed
      await Payment.findOneAndUpdate(
        { uniqueId },
        { status: "failed" }
      );

      return res.status(400).json({ error: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);

    // ❌ Error occurred → set to failed
    if (req.body.uniqueId) {
      await Payment.findOneAndUpdate(
        { uniqueId: req.body.uniqueId },
        { status: "failed" }
      );
    }

    res.status(500).json({ error: "Payment verification failed" });
  }
});

router.post("/send-whatsapp", async (req, res) => {
  const { contact, uniqueId } = req.body;

  const paymentUrl = `http://localhost:5173/expire?uniqueId=${uniqueId}`;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: `91${contact}`, // prefix with country code (India = 91)
        type: "text",
        text: {
          body: `🎉 Congratulations! Your payment was successful.\n\nUnique ID: ${uniqueId}\nScan your QR: ${paymentUrl}`
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
console.log("success");
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("WhatsApp API Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Failed to send WhatsApp message" });
  }
});

module.exports = router;
