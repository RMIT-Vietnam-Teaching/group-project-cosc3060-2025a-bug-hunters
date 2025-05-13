const User = require('../models/User');
const Course = require('../models/Course');
const Cart = require('../models/Cart');  

exports.renderCartPage = async (req, res) => {
  try {
    const userId = req.signedCookies?.userId;
    const user = await User.findById(userId);
    
    let cartItems = [];
    
    if (userId) {
      const userCart = await Cart.findOne({ userId }).populate('items');
      if (userCart && userCart.items && userCart.items.length > 0) {
        cartItems = userCart.items;
      }
    } else {
      // For non-logged in users
      const cartIds = req.session.cart || [];
      if (cartIds.length > 0) {
        cartItems = await Course.find({ _id: { $in: cartIds } });
      }
    }
    res.render('cart', { cartItems, user: user || {} });
  } catch (error) {
    console.error('Error rendering cart page:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

exports.addToCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.signedCookies?.userId;
    
    if (userId) {
      // For logged-in users
      let userCart = await Cart.findOne({ userId });
      
      if (!userCart) {
        userCart = new Cart({
          userId,
          items: [courseId]
        });
      } else if (!userCart.items.includes(courseId)) {
        userCart.items.push(courseId);
      }
      
      await userCart.save();
      return res.json({ success: true, cartCount: userCart.items.length });
      
    } else {
      // For non-logged in users
      req.session.cart = req.session.cart || [];
      
      if (!req.session.cart.includes(courseId)) {
        req.session.cart.push(courseId);
      }
      
      return res.json({ success: true, cartCount: req.session.cart.length });
    }
  } catch (error) {
    console.error('Error adding to cart:', error.message, error.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.signedCookies?.userId;
    
    if (userId) {
      // For logged-in users
      const userCart = await Cart.findOne({ userId });
      
      if (userCart) {
        userCart.items = userCart.items.filter(id => id.toString() !== courseId);
        await userCart.save();
      }
    } else {
      if (req.session.cart) {
        req.session.cart = req.session.cart.filter(id => id !== courseId);
      }
    }
    
    res.redirect('/cart');
  } catch (error) {
    console.error('Error removing from cart:', error.message, error.stack);
    res.status(500).send('Internal Server Error');
  }
};

exports.mergeCart = async (userId, sessionCart) => {
  try {
    if (!sessionCart || sessionCart.length === 0) return;
    
    let userCart = await Cart.findOne({ userId });
    
    if (!userCart) {
      userCart = new Cart({
        userId,
        items: sessionCart
      });
    } else {
      // Add session items to existing cart 
      for (const courseId of sessionCart) {
        if (!userCart.items.includes(courseId)) {
          userCart.items.push(courseId);
        }
      }
    }
    
    await userCart.save();
    return userCart;
  } catch (error) {
    console.error('Error merging carts:', error);
    throw error;
  }
};

// Clear cart items after successful purchase
exports.clearCart = async (userId, options = {}) => {
  const { onlyIfCoursePurchased = false, courseIds = [] } = options;

  if (onlyIfCoursePurchased && (!courseIds || courseIds.length === 0)) {
    return false;
  }

  try {
    if (userId) {
      await Cart.findOneAndUpdate(
        { userId }, 
        { $set: { items: [] } },
        { new: true }
      );
    }
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
