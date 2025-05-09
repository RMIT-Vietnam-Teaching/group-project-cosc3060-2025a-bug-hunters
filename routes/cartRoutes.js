const router = require("express").Router();

const { renderCartPage } = require("../controllers/cartController");

router.get("/", renderCartPage);

module.exports = router;
