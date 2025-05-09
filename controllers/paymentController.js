const User = require('../models/User');

exports.renderCheckoutPage = (req, res) => {
    try {
        const cartItems = req.session.cart || [];
        res.render('checkout', {
            cartItems
        });
      } catch (error) {
        console.error('Error rendering checkout page:', error.message, error.stack);
    
        res.status(500).send('Internal Server Error');
      }};


exports.renderAddCoin = (req, res) => {
    try {
        const cartItems = req.session.cart || [];
        res.render('addMoreCoin', {
            cartItems
        });
      } catch (error) {
        console.error('Error rendering add coin page:', error.message, error.stack);
    
        res.status(500).send('Internal Server Error');
      }}
      
