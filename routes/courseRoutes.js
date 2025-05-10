const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require("../models/Course");
const User = require("../models/User");
const categories = require("../utils/categories");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadsDir = "public/uploads/courses";
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, "course-" + uniqueSuffix + ext);
    },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload only images."), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get all courses with optional category filter
router.get("/", async (req, res) => {
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

// Display course creation form
router.get("/create", async (req, res) => {
    try {
        // Fetch instructors (users with instructor role)
        const instructors = await User.find({ role: "instructor" });

        res.render("createCourse", {
            categories,
            instructors,
        });
    } catch (err) {
        console.error("Error loading create course form:", err);
        res.status(500).send("Failed to load create course form");
    }
});

// Handle course creation form submission
router.post("/create", upload.single("courseImage"), async (req, res) => {
    try {
        const {
            title,
            description,
            instructor,
            durationHours,
            durationMinutes,
            category,
        } = req.body;

        // If no image was uploaded, return error
        if (!req.file) {
            return res.status(400).render("createCourse", {
                categories,
                error: "Please upload a course image",
                formData: req.body,
                instructors: await User.find({ role: "instructor" }),
            });
        }

        // Format duration string
        const hours = parseInt(durationHours) || 0;
        const minutes = parseInt(durationMinutes) || 0;

        let duration = "";
        if (hours > 0) {
            duration += `${hours}h `;
        }
        if (minutes > 0 || hours === 0) {
            duration += `${minutes}m`;
        }

        // Trim any trailing space
        duration = duration.trim();

        // Get the path to the uploaded image (relative to public folder for use in HTML)
        const imageUrl = `/uploads/courses/${req.file.filename}`;

        // Create new course
        const newCourse = new Course({
            title,
            description,
            instructor: instructor || "Current User", // In production, use actual user ID
            duration,
            category,
            imageUrl,
            rating: 0, // New courses start with no rating
        });

        await newCourse.save();
        console.log("Course created successfully:", newCourse);

        // Redirect to courses page after successful creation
        res.redirect("/courses");
    } catch (err) {
        console.error("Error creating course:", err);

        // If there was an error and a file was uploaded, delete it
        if (req.file) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error("Error deleting file:", unlinkErr);
            });
        }

        res.status(500).render("createCourse", {
            categories,
            error: "Failed to create course: " + err.message,
            formData: req.body,
            instructors: await User.find({ role: "instructor" }),
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.render("courseDetail", { course });
    } catch (err) {
        console.error("Error loading course:", err);
        res.status(500).send("Failed to load course");
    }
});

module.exports = router;
