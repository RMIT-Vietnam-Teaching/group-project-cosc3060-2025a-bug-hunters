const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    const userId = req.signedCookies.userId;
    let user = null;

    if (userId) {
        user = await User.findById(userId).lean();
    }

    res.render("homepage", { user });
});

module.exports = router;
