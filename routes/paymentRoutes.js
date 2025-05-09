const express = require('express');
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { renderCheckoutPage, renderAddCoin } = require('../controllers/paymentController.js');

router.get('/checkout', renderCheckoutPage);
router.get('/addcoin', renderAddCoin);

router.get('/confirmation', (req, res) => {
    res.render('paymentConfirmation');
  });

  
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd'
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
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