const router = require("express").Router();

router.get("/homepage", (req, res) => {
    res.render("homepage"); // ← this is key
});

module.exports = router;
