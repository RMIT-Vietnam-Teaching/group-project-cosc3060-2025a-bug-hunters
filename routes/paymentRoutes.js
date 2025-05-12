const router = require('express').Router();

const { renderCheckoutPage, renderConfirmationPage, renderAddCoin, createPaymentIntent, useCoin  } = require('../controllers/paymentController.js');

router.get('/checkout', renderCheckoutPage);
router.get('/confirmation', renderConfirmationPage);
router.get('/addcoin', renderAddCoin); 
router.post('/create-payment-intent', createPaymentIntent);
router.post('/use-coin', useCoin); 



// router.post('/payment/update-coin', async (req, res) => {
//     const { userId, coinCount } = req.body;
  
//     if (!userId || typeof coinCount !== 'number') {
//       return res.status(400).json({ error: 'Invalid userId or coinCount' });
//     }
  
//     try {
//       const user = await User.findById(userId);
//       if (!user) return res.status(404).json({ error: 'User not found' });
  
//       user.coin += coinCount;
//       await user.save();
  
//       res.json({ message: 'Coin balance updated', newBalance: user.coin });
//     } catch (err) {
//       console.error('Coin update error:', err.message);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

module.exports = router;