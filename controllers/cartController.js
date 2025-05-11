const User = require('../models/User');
const Course = require('../models/Courses');

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

  res.redirect('/cart');
};
