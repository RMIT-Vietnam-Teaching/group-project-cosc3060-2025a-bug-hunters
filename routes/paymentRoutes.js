const express = require('express');
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { renderCheckoutPage, renderConfirmationPage  } = require('../controllers/paymentController.js');

router.get('/checkout', renderCheckoutPage);
router.get('/confirmation', renderConfirmationPage);



  
// Improved version of your create-payment-intent endpoint

router.post('/create-payment-intent', async (req, res) => {
  console.log("Payment intent request body:", req.body);
  
  // More detailed validation
  if (!req.body) {
    return res.status(400).json({ error: "Empty request body" });
  }
  
  const { amount } = req.body;
  console.log("Received amount:", amount, typeof amount);
  
  // Check if amount exists and is a number
  if (amount === undefined || amount === null) {
    return res.status(400).json({ error: "Amount required" });
  }
  
  // Convert to number if it's a string
  const amountValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(amountValue) || amountValue <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Stripe key missing");
      return res.status(500).json({ error: "Payment processing not configured" });
    }
    
    console.log(`Creating payment intent for amount: ${amountValue} cents`);
    
    // Convert to integer for Stripe
    const intAmount = Math.round(amountValue);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: intAmount,
      currency: 'usd',
      metadata: {
        integration_check: 'accept_a_payment'
      }
    });
    
    console.log(`Payment intent created successfully: ${paymentIntent.id}`);
    res.json({ 
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
    
  } catch (err) {
    console.error("Stripe payment intent creation error:", err);
    
    // Send a more descriptive error to the client
    res.status(500).json({ 
      error: err.message, 
      type: err.type || 'unknown',
      code: err.statusCode || 500
    });
  }
});

// router.post('/payment/update-coin', async (req, res) => {
//     const { userId, coinCount } = req.body;
  
//     if (!userId || typeof coinCount !== 'number') {
//       return res.status(400).json({ error: 'Invalid userId or coinCount' });
//     }
  
//     try {
//       const user = await User.findById(userId);
//       if (!user) return res.status(404).json({ error: 'User not found' });
  
//       user.coin += coinCount;
//       await user.save();
  
//       res.json({ message: 'Coin balance updated', newBalance: user.coin });
//     } catch (err) {
//       console.error('Coin update error:', err.message);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

module.exports = router;