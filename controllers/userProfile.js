const User = require("../models/User");

exports.renderUserProfile = async (req, res) => {
      const user = await User.findById(req.params.userId);
    try {
      

        res.render("userProfile", { user, activePage: "profile" });
    } catch (error) {
        console.error("Error rendering user profile:", error);
        res.status(500).send("Failed to render user profile");
    }};