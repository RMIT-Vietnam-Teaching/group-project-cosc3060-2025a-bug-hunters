const User = require('../models/User');

exports.renderCheckoutPage = async (req, res) => {
    try {
        const cartItems = req.session.cart || [];
        const routeUserId = req.query.id; 
        const routeUser = await User.findById(routeUserId);
        if (!routeUser) return res.redirect("/auth/login");
        res.render('checkout', {
            cartItems,
            routeUser
        });
      } catch (error) {
        console.error('Error rendering checkout page:', error.message, error.stack);
    
        res.status(500).send('Internal Server Error');
      }};


exports.renderAddCoin = async (req, res) => {
    try {
      const routeUserId = req.query.id; 
      const routeUser = await User.findById(routeUserId);     
      if (!routeUser) return res.redirect("/auth/login");
        const cartItems = req.session.cart || [];
        res.render('addMoreCoin', {
            cartItems,
            cardInfo: routeUser.cardPaymentInfo,
            routeUser,
        });
      } catch (error) {
        console.error('Error rendering add coin page:', error.message, error.stack);
    
        res.status(500).send('Internal Server Error');
      }}
      
