const router = require("express").Router();

const { renderCartPage, addToCart } = require("../controllers/cartController");

router.get("/", renderCartPage);
router.post("/add/:courseId", addToCart);

module.exports = router;
