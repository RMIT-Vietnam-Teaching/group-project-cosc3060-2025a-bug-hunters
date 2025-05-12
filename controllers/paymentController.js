
const User   = require('../models/User');
const Course = require('../models/Course');
const Cart   = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.renderCheckoutPage = async (req, res) => {
  try {
    const userId = req.signedCookies?.userId || req.query.id;
    const user = await User.findById(userId).lean();
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
    const userId = req.signedCookies?.userId;
    if (!userId) return res.redirect('/auth/login');

    // Load user
    const user = await User.findById(userId);
    if (!user) return res.redirect('/auth/login');

    // Pull query-params
    const purchased = parseInt(req.query.purchased, 10);
    const bonus     = parseInt(req.query.bonus, 10) || 0;
    const orderNumber = req.query.orderNumber;

    if (!isNaN(purchased)) {
      // 1) Update the user's coin balance
      const totalAdded = purchased + bonus;
      user.coin = (user.coin || 0) + totalAdded;
      await user.save();

      // 2) Render with coin info
      return res.render('paymentConfirmation', {
        user: user.toObject(),
        orderNumber,
        purchased,
        bonus,
        // no courses
        cartItems: null,
        totalCost:  null
      });
    }

    // === FALLBACK: course-purchase flow ===
    const cartIds   = req.session.cart || [];
    const cartItems = await Course.find({ _id: { $in: cartIds } }).lean();
    const totalCost = cartItems.reduce((sum, c) => sum + (parseFloat(c.price)||0), 0);

    // clear session cart
    req.session.cart = [];

    res.render('paymentConfirmation', {
      user: user.toObject(),
      orderNumber,
      cartItems,
      totalCost
    });
  } catch (err) {
    console.error('Error rendering confirmation:', err);
    res.status(500).send('Server Error');
  }
};


exports.renderAddCoin = async (req, res) => {
  try {
    const userId = req.signedCookies.userId || req.query.id;
    if (!userId) return res.redirect('/auth/login');

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).send('User not found');

    // show cart items
    const cartCourseIds = req.session.cart || [];
    const cartItems     = await Course.find({ _id: { $in: cartCourseIds } }).lean();
    const totalCost     = cartItems.reduce((sum, c) => sum + (parseFloat(c.price)||0), 0);

    res.render('addMoreCoin', {
      user,
      cartItems,
      totalCost,
      cardInfo: user.cardPaymentInfo || {}
    });
  } catch (err) {
    console.error('Error rendering Add Coin page:', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.createPaymentIntent = async (req, res) => {
  console.log('🏷️  [createPaymentIntent] body:', req.body);
  const { amount } = req.body || {};

  // Validate amount
  if (amount == null) {
    return res.status(400).json({ error: 'Amount required' });
  }
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(value) || value <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  // Ensure Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Stripe secret key not found');
    return res.status(500).json({ error: 'Payment processing not configured' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(value),
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' }
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({
      error: err.message,
      type: err.type || 'StripeError',
      code: err.statusCode || 500
    });
  }
};

//use coin to pay
exports.useCoin = async (req, res) => {
  try {
    const { userId, courseIds, totalCost } = req.body;
    
    console.log('Coin payment request received:', {
      userId,
      courseIds: courseIds || [],
      totalCost
    });

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({ error: 'Course IDs are required' });
    }
    
    if (totalCost == null || isNaN(parseFloat(totalCost)) || parseFloat(totalCost) <= 0) {
      return res.status(400).json({ error: 'Valid total cost is required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has enough coins
    if (user.coin < parseFloat(totalCost)) {
      return res.status(400).json({ 
        error: 'Insufficient coins', 
        userCoins: user.coin, 
        requiredCoins: parseFloat(totalCost)
      });
    }

    console.log(`User ${userId} has ${user.coin} coins, deducting ${parseFloat(totalCost)}`);
    
    // Deduct coins from user
    user.coin -= parseFloat(totalCost);
    await user.save();

    console.log(`User coins after deduction: ${user.coin}`);

    // Optional: Add purchased courses to user's course library
    // This would depend on your schema, but might look like:
    if (!user.purchasedCourses) user.purchasedCourses = [];
    user.purchasedCourses = [...new Set([...user.purchasedCourses, ...courseIds])];
    await user.save();

    // Clear the cart (this depends on your cart implementation)
    try {
      // If using database cart:
      const cartResult = await Cart.findOneAndUpdate(
        { userId: user._id },
        { $set: { items: [] } }
      );
      
      console.log('Cart cleared from database:', cartResult ? 'success' : 'no cart found');
      
      // If the session is available, clear that too
      if (req.session && req.session.cart) {
        req.session.cart = [];
        console.log('Session cart cleared');
      }
    } catch (cartErr) {
      console.error('Error clearing cart:', cartErr);
      // Don't fail the transaction if cart clearing fails
    }

    // Success response
    return res.json({
      success: true,
      message: 'Payment successful',
      redirectUrl: '/payment/confirmation'
    });
  } catch (err) {
    console.error('Coin payment error:', err);
    return res.status(500).json({ error: 'Server error processing coin payment' });
  }
};
