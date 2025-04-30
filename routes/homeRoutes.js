const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const userId = req.signedCookies.userId;
        let user = null;

        if (userId) {
            user = await User.findById(userId).lean();
        }

        res.render("homepage", { user });
    } catch (error) {
        console.error("Error rendering homepage:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
