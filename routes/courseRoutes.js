const express = require("express");
const router = express.Router();
const fs = require("fs");
const Course = require("../models/Course");
const User = require("../models/User");
const { categories } = require("../constants/categories");

const multer = require("multer");
const { courseStorage } = require("../utils/cloudinary");
const upload = multer({
    storage: courseStorage,
    limits: { fileSize: 99 * 1024 * 1024, files: 1 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images are allowed!"), false);
        }
        cb(null, true);
    },
});

// Get all courses with optional category filter
router.get("/", async (req, res) => {
    const selectedCategory = req.query.category;
    const loggedInUserId = req.signedCookies?.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    let filter = {};

    if (selectedCategory) {
        filter.category = selectedCategory;
    }

    try {
        const courses = await Course.find(filter);
        res.render("allCourses", {
            courses,
            categories,
            selectedCategory,
            loggedInUser,
        });
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
        const loggedInUserId = req.signedCookies?.userId;
        const loggedInUser = await User.findById(loggedInUserId);

        res.render("createCourse", {
            categories,
            instructors,
            loggedInUser,
            formData: {},
        });
    } catch (err) {
        console.error("Error loading create course form:", err);
        res.status(500).send("Failed to load create course form");
    }
});

router.post("/create", upload.single("courseImage"), async (req, res) => {
    const instructors = await User.find({ role: "instructor" });
    const loggedInUserId = req.signedCookies?.userId;
    const loggedInUser = await User.findById(loggedInUserId);
    const formData = req.body;

    try {
        const {
            title,
            description,
            category,
            price,
            learningOutcomes,
            sections = {},
        } = req.body;

        if (!req.file) throw new Error("Please upload a course image");

        // Parse learning outcomes
        const parsedOutcomes =
            typeof learningOutcomes === "string"
                ? learningOutcomes
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                : [];

        let totalSeconds = 0;
        const sectionIds = [];

        for (const [secIndex, sectionData] of Object.entries(sections)) {
            const sectionTitle = sectionData.title;
            const lessonsInput = sectionData.lessons || {};
            const lessonIds = [];

            for (const [lesIndex, lessonData] of Object.entries(lessonsInput)) {
                const { title: lessonTitle, duration, type } = lessonData;

                // Calculate time in seconds
                const parts = duration.split(":").map(Number).reverse();
                const seconds =
                    (parts[0] || 0) +
                    (parts[1] || 0) * 60 +
                    (parts[2] || 0) * 3600;
                totalSeconds += seconds;

                const lesson = new Lesson({
                    title: lessonTitle,
                    duration, // keep as "MM:SS" or "HH:MM:SS"
                    content: "", // optional field for future content (video/pdf/text)
                });
                await lesson.save();
                lessonIds.push(lesson._id);
            }

            const section = new Section({
                title: sectionTitle,
                lessons: lessonIds,
            });
            await section.save();
            sectionIds.push(section._id);
        }

        // Convert totalSeconds to "Hh Mm" format
        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
        const durationFormatted = `${
            totalHours > 0 ? totalHours + "h " : ""
        }${totalMinutes}m`;

        const newCourse = new Course({
            name: title,
            description,
            author: loggedInUser._id,
            category,
            price,
            image: req.file.path, // Cloudinary path
            learningOutcomes: parsedOutcomes,
            duration: durationFormatted.trim(),
            sections: sectionIds,
        });

        await newCourse.save();
        console.log("Course created:", newCourse._id);

        res.redirect("/courses");
    } catch (err) {
        console.error("Course creation failed:", err);
        if (req.file?.path) {
            // Optional: delete failed Cloudinary image if needed
        }
        res.status(500).render("createCourse", {
            categories,
            instructors,
            loggedInUser,
            error: "Failed to create course: " + err.message,
            formData: req.body,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const loggedInUserId = req.signedCookies?.userId;
        const loggedInUser = await User.findById(loggedInUserId);
        if (!course) {
            return res.status(404).send("Course not found");
        }
        res.render("courseDetail", { course, loggedInUser });
    } catch (err) {
        console.error("Error loading course:", err);
        res.status(500).send("Failed to load course");
    }
});

module.exports = router;
