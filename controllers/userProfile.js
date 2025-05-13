const User = require("../models/User");

exports.renderUserProfileByParam = async (req, res) => {
  const loggedInUserId = req.signedCookies?.userId;   
  const routeUserId = req.params.id;              
  const loggedInUser = await User.findById(loggedInUserId);
  console.log("🔐 Logged-in user:", loggedInUserId);
  console.log("👤 Viewing profile of:", routeUserId);

  try {
    const user = await User.findById(routeUserId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isOwner = loggedInUserId === routeUserId;
    res.render("userProfile", { user, isOwner, loggedInUser });
  } catch (err) {
    console.error("Error loading user profile:", err);
    res.status(500).send("Server error.");
  }
};

exports.renderUserProfileByQuery = async (req, res) => {
  const routeUserId = req.query.id; 
  const loggedInUserId = req.signedCookies?.userId; 
  const loggedInUser = await User.findById(loggedInUserId);
  if (!routeUserId) {
    return res.status(400).send("No user ID provided.");
  }

  try {
    const user = await User.findById(routeUserId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.render("userProfile", { user, loggedInUserId, loggedInUser });
  } catch (err) {
    console.error("Error loading user profile:", err);
    res.status(500).send("Server error.");
  }
};
