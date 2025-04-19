const router = require("express").Router();

router.get("/message", (req, res) => {
    res.render("message"); // ← this is key
});

module.exports = router;