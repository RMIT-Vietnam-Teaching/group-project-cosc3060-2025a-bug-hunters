const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const cors = require("cors");
const { paymentSuccessPage, paymentFailedPage } = require("../controllers/payment");


router.post("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Coin Payment",
          },
          unit_amount: getPriceFromPackage(item.id), 
        },
        quantity: item.quantity,
      })),
     
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/paymentSuccessPage`,
      cancel_url: `${process.env.CLIENT_URL}/paymentFailed.html`,
    })
    // res.json({ url: session.url })
    res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

// router.get("/paymentSuccess", paymentSuccessPage);
// router.get("/paymentFailed", paymentFailedPage);

function getPriceFromPackage(packageId) {
  const prices = {
    coin100: 1000,
    coin500: 4500,
    coin1000: 8000
  };
  return prices[packageId] || 1000;
}



module.exports = router;