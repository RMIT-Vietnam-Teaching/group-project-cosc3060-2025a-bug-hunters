const User = require('../models/User');
const Course = require('../models/Course');

exports.renderCheckoutPage = async (req, res) => {
  try {
    const routeUserId = req.query.id; 
    const routeUser = await User.findById(routeUserId);  

    if (!routeUser) return res.redirect("/auth/login");

    // Retrieve course IDs from session cart
    const cartCourseIds = req.session.cart || [];

    // Fetch actual courses from database based on IDs stored in session
    const cartItems = await Course.find({ _id: { $in: cartCourseIds } }).lean();

    const cardInfo = routeUser.cardPaymentInfo || {};

    res.render("checkout", {
      cartItems,
      user: routeUser,
      cardInfo,
    });
  } catch (err) {
    console.error("Error rendering checkout page:", err.message, err.stack);
    res.status(500).send("Server Error");
  }
};




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
      


      exports.useCoinPayment = async (req, res) => {
        const { userId, totalCost } = req.body;
        const courseIds = req.session.cart || [];
      
        if (!userId || !Array.isArray(courseIds) || typeof totalCost !== 'number') {
          return res.status(400).json({ error: 'Invalid input' });
        }
      
        try {
          const user = await User.findById(userId);
          if (!user) return res.status(404).json({ error: 'User not found' });
      
          if (user.coin < totalCost) {
            return res.status(400).json({ error: 'Insufficient coins' });
          }
      
          user.coin -= totalCost;
          await user.save();
      
          req.session.cart = [];
      
          res.json({ success: true, newBalance: user.coin });
        } catch (err) {
          console.error('Coin payment error:', err.message);
          res.status(500).json({ error: 'Server error' });
        }
      };
      