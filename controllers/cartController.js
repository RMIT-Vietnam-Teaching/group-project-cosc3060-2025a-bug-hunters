const User = require('../models/User');

exports.renderCartPage = async (req, res) => {
  try {
    const userId = req.signedCookies?.userId;
    const user = await User.findById(userId);
     
    const cartItems = req.session.cart || [];
    res.render('cart', {
      cartItems,
      user,
    });
  } catch (error) {
    console.error('Error rendering cart page:', error.message, error.stack);

    res.status(500).send('Internal Server Error');
  }
};
