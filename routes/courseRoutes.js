const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const categories = require("../utils/categories");

router.get("/courses", async (req, res) => {
  console.log("GET /courses route was hit ✅");

  const selectedCategory = req.query.category;
  let filter = {};

  if (selectedCategory) {
    filter.category = selectedCategory;
  }

  try {
    const courses = await Course.find(filter);
    res.render("allCourses", { courses, categories, selectedCategory });
  } catch (err) {
    console.error("Error loading courses:", err);
    res.status(500).send("Failed to load courses");
  }
});


module.exports = router;
