const User = require("../models/User");


exports.renderUserProfile = async (req, res) => {
  try {
    const { userRouteId } = req.params;
    const routeUser = await User.findById(userRouteId);
    if (!routeUser) return res.status(404).send("User not found.");

    const loggedInUserId = req.signedCookies?.userId;
    const loggedInUser = loggedInUserId ? await User.findById(loggedInUserId) : null;

    const isOwner = loggedInUserId && loggedInUserId === routeUser._id.toString();

    res.render("userProfile", {
      user: loggedInUser,         // for navbar
      profileUser: routeUser,     // profile being viewed
      isOwner
    });
  } catch (err) {
    console.error("Error loading user profile:", err);
    res.status(500).send("Server error.");
  }
};
