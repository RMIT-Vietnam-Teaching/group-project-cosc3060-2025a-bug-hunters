const User = require('../models/User');
const Course = require('../models/Course');

exports.renderCartPage = async (req, res) => {
  try {
    const userId = req.signedCookies?.userId;
    const user = await User.findById(userId);

    const cartIds = req.session.cart || [];
    const cartItems = await Course.find({ _id: { $in: cartIds } });

    res.render('cart', { cartItems, user });
  } catch (error) {
    console.error('Error rendering cart page:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

exports.addToCart = async (req, res) => {
  const courseId = req.params.courseId;
  req.session.cart = req.session.cart || [];

  if (!req.session.cart.includes(courseId)) {
    req.session.cart.push(courseId);
  }

  res.json({ success: true, cartCount: req.session.cart.length });
};


exports.removeFromCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    
    // Ensure cart exists 
    if (req.session.cart) {
      // Filter out the course to remove
      req.session.cart = req.session.cart.filter(id => id !== courseId);
      
      // Save
      req.session.save(err => {
        if (err) {
          console.error('Error saving session:', err);
          return res.status(500).send('Error removing item from cart');
        }
        res.redirect('/cart');
      });
    } else {
      res.redirect('/cart');
    }
  } catch (error) {
    console.error('Error removing from cart:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};