const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
// We'll add Post model import later when it's available

// Handle search requests
router.get("/", async (req, res) => {
  const searchQuery = req.query.query || "";
  const userId = req.signedCookies?.userId;

  // Debug
  console.log("Search query:", searchQuery);

  if (!searchQuery) {
    return res.render("searchResults", {
      courses: [],
      // posts: [], // We'll uncomment this later
      searchQuery: "",
      user: req.user, // Add user for navbar
    });
  }

  try {
    // Create a case-insensitive regex for the search term
    const searchRegex = new RegExp(searchQuery, "i");

    // Search for courses that match the query using schema field names
    // and populate the author field
    const courses = await Course.find({
      $or: [
        { name: searchRegex }, // Changed from title to name
        { description: searchRegex },
        { category: searchRegex },
      ],
    })
      .populate("author", "firstName lastName") // Add this to populate author data
      .lean(); // Add lean() for better performance

    console.log(`Found ${courses.length} matching courses`);

    // For now skip searching for posts
    // When the Post model is ready, uncomment this part
    /*
        const posts = await Post.find({
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { tags: searchRegex }
          ]
        }).populate('author', 'firstName lastName avatar');
        */

    res.render("searchResults", {
      courses,
      // posts, // We'll uncomment this later
      searchQuery,
      user: req.user, // Add user for navbar
    });
  } catch (err) {
    console.error("Error in search:", err);
    res.status(500).render("searchResults", {
      courses: [],
      // posts: [], // We'll uncomment this later
      searchQuery,
      error: "An error occurred while searching",
      user: req.user, // Add user for navbar
    });
  }
});

module.exports = router;
