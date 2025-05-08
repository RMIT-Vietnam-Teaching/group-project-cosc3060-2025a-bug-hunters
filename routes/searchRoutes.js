const express = require("express");
const router = express.Router();
const Course = require("../models/course");
// We'll add Post model import later when it's available

// Handle search requests
router.get("/", async (req, res) => {
  const searchQuery = req.query.query || "";

  if (!searchQuery) {
    return res.render("searchResults", {
      courses: [],
      // posts: [], // We'll uncomment this later
      searchQuery: "",
    });
  }

  try {
    // Create a case-insensitive regex for the search term
    const searchRegex = new RegExp(searchQuery, "i");

    // Search for courses that match the query
    const courses = await Course.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ],
    });

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
    });
  } catch (err) {
    console.error("Error in search:", err);
    res.status(500).render("searchResults", {
      courses: [],
      // posts: [], // We'll uncomment this later
      searchQuery,
      error: "An error occurred while searching",
    });
  }
});

module.exports = router;
