const User = require("../models/User");


exports.renderUserProfile = async (req, res) => {
  try {
    const { userRouteId } = req.params;
    const routeUser = await User.findById(userRouteId);
    if (!routeUser) return res.status(404).send("User not found.");

    const loggedInUserId = req.signedCookies?.userId;
    let loggedInUser = null;

    if (loggedInUserId && loggedInUserId.match(/^[0-9a-fA-F]{24}$/)) {
      loggedInUser = await User.findById(loggedInUserId);
    }

    const isOwner = loggedInUserId === routeUser.id;

    res.render("userProfile", {
      user: loggedInUser,          // Used by navbar
      loggedInUser,                // Optional for internal logic
      profileUser: routeUser,
      isOwner
    });
  } catch (err) {
    console.error("Error loading user profile:", err);
    res.status(500).send("Server error.");
  }
};
