const User = require("../models/User");

exports.renderUserProfileByParam = async (req, res) => {
    const loggedInUserId = req.signedCookies?.userId;
    const routeUserId = req.signedCookies?.userId;

    if (!loggedInUserId || loggedInUserId !== routeUserId) {
        return res.status(403).send("Unauthorized access.");
    }

    try {
        const user = await User.findById(routeUserId);
        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.render("userProfile", { user });
    } catch (err) {
        console.error("Error loading user profile:", err);
        res.status(500).send("Server error.");
    }
};

exports.renderUserProfileByQuery = async (req, res) => {
    const userId = req.signedCookies?.userId;

    if (!userId) {
        return res.status(400).send("No user ID provided.");
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found.");
        res.render("userProfile", { user });
    } catch (err) {
        console.error("Error loading user profile:", err);
        res.status(500).send("Server error.");
    }
};
