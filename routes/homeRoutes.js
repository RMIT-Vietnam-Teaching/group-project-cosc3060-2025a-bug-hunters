const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const mockCourses = [
            {
                title: "Intro to Web Dev",
                instructor: "John Doe",
                description: "Learn HTML, CSS, and JavaScript.",
                duration: "3h",
                image: "images/course1.jpg",
                rating: 4.8,
            },
            {
                title: "Advanced JS",
                instructor: "Jane Smith",
                description: "Deep dive into JavaScript ES6+",
                duration: "2.5h",
                image: "images/course2.jpg",
                rating: 4.9,
            },
            // add more if needed
        ];

        const userId = req.signedCookies.userId;
        let user = null;

        if (userId) {
            user = await User.findById(userId).lean();
        }

        res.render("homepage", { user, newCourses: mockCourses });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
