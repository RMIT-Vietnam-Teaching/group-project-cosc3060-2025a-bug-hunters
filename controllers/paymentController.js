
const User   = require('../models/User');
const Course = require('../models/Course');
const Cart   = require('../models/Cart');
   


exports.renderCheckoutPage = async (req, res) => {
  try {
    const userId = req.signedCookies?.userId || req.query.id;
    const user   = await User.findById(userId).lean();
    if (!user) return res.redirect('/auth/login');

    let cartIds;
    if (userId) {
      // logged-in users, read from DB cart
      const userCart = await Cart.findOne({ userId });
      cartIds = userCart?.items.map(id => id.toString()) || [];
    } else {
      // guests, session
      cartIds = req.session.cart || [];
    }

    // fetch those courses
    const cartItems = await Course.find({ _id: { $in: cartIds } }).lean();

    // compute total
    const totalCost = cartItems
      .reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);

    res.render('checkout', {
      user,
      cardInfo: user.cardPaymentInfo || {},
      cartItems,
      totalCost,
      hasEnoughCoins: user.coin >= totalCost
    });
  } catch (err) {
    console.error('Error rendering checkout:', err);
    res.status(500).send('Server Error');
  }
};

exports.renderConfirmationPage = async (req, res) => {
  try {
    const cartIds   = req.session.cart || [];
    const cartItems = await Course.find({ _id: { $in: cartIds } }).lean();
    const totalCost = cartItems
      .reduce((sum, c) => sum + (parseFloat(c.price) || 0), 0);

    // Generate an order number
    const now    = new Date();
    const date   = now.toISOString().slice(0,10).replace(/-/g,'');
    const random = Math.floor(1000 + Math.random()*9000); 
    const orderNumber = `ORD-${date}-${random}`;

    //  clear the cart
    req.session.cart = [];
    res.render('paymentConfirmation', {
      cartItems,
      totalCost,
      orderNumber,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
