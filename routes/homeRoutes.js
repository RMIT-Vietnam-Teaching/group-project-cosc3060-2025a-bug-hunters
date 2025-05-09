const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    // Fetch newest courses first (limit to 9)
    const newCourses = await Course.find().sort({ createdAt: -1 }).limit(9);

    // Fetch courses with highest ratings (limit to 9)
    const popularCourses = await Course.find().sort({ rating: -1 }).limit(9);
    const loggedInUserId = req.signedCookies?.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    res.render("homepage", {
      user: res.locals.user,
      newCourses,
      popularCourses,
      loggedInUser
      
    });
  } catch (err) {
    console.error("Error loading homepage courses:", err);
    // Just render the homepage with empty arrays if there's an error
    res.render("homepage", {
      user: res.locals.user,
      newCourses: [],
      popularCourses: [],
      loggedInUser: null,
    });
  }
});

module.exports = router;
