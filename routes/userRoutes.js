const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// My Courses page route - NO AUTHENTICATION CHECK FOR DEVELOPMENT
router.get("/my-courses", async (req, res) => {
  try {
    // For development: always render the page with empty enrolledCourses
    // The demo script in myCourses.ejs will populate sample courses
    const enrolledCourses = [];

    res.render("myCourses", { enrolledCourses });
  } catch (err) {
    console.error("Error loading enrolled courses:", err);
    res.status(500).send("Failed to load your enrolled courses");
  }
});

// User profile page - NO AUTHENTICATIO CHECK FOR DEVELOPMENT
router.get("/profile", (req, res) => {
  // For development: create a mock user object
  const mockUser = {
    name: "Test User",
    email: "test@example.com",
  };

  res.render("userProfile", { user: mockUser });
});

module.exports = router;
