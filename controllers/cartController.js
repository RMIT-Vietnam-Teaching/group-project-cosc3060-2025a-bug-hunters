// const express = require('express');
const user = require('../models/User');
// const {loadStripe} = require ('@stripe/stripe-js');


exports.renderCartPage = (req, res) => {
  try {
    const cartItems = req.session.cart || [];

    res.render('cart', {
      cartItems
    });
  } catch (error) {
    console.error('Error rendering cart page:', error.message, error.stack);

    res.status(500).send('Internal Server Error');
  }
};

// const makePaymnet = async (req, res) => {
//     const stripe = await loadStripe(process.env.STRIPE_PRIVATE_KEY);
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: req.body.items.map(item => ({
//             price_data: {
//                 currency: 'usd',
//                 product_data: {
//                     name: 'Coin Payment',
//                 },
//                 unit_amount: getPriceFromPackage(item.id),
//             },
//             quantity: item.quantity,
//         })),
//         mode: 'payment',
//         success_url: `${process.env.CLIENT_URL}/paymentSuccess`,
//         cancel_url: `${process.env.CLIENT_URL}/paymentFailed`,
//     });
//     res.json({url: session.url});
// }


// const paymentSuccessPage = (req, res) => {
//     res.render("paymentSuccess");
//   };
  
//   const paymentFailedPage = (req, res) => {
//     res.render("paymentFailed");
//   };
  
//   module.exports = {
//     makePaymnet,
//     paymentSuccessPage,
//     paymentFailedPage
//   };