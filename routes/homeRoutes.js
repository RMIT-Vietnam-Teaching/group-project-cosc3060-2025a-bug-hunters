const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Course = require("../models/course");

const { preventAuthAccess } = require("../middlewares/auth");

const sampleCourses = [
    {
        title: "Fullstack Web Development",
        description:
            "Learn to build complete web apps using MERN stack with real-world projects.",
        instructor: "Alex Pham",
        imageUrl: "/images/defaultCourse.png",
        category: "Web Development",
        duration: "12h 30m",
        rating: 4.8,
        createdAt: new Date("2025-04-25"),
    },
    {
        title: "Introduction to Data Science",
        description:
            "Master the basics of Python, pandas, and data visualization techniques.",
        instructor: "Dr. Jane Tran",
        imageUrl: "/images/defaultCourse.png",
        category: "Data Science",
        duration: "10h 45m",
        rating: 4.5,
        createdAt: new Date("2025-04-20"),
    },
    {
        title: "Creative UI/UX Design",
        description: "Design interfaces users love using Figma and Adobe XD.",
        instructor: "Minh Chau",
        imageUrl: "/images/defaultCourse.png",
        category: "Design",
        duration: "8h",
        rating: 4.6,
        createdAt: new Date("2025-04-18"),
    },
    {
        title: "Digital Marketing 101",
        description: "Explore SEO, SEM, and social media marketing strategies.",
        instructor: "Linh Vu",
        imageUrl: "/images/defaultCourse.pngg",
        category: "Marketing",
        duration: "6h 30m",
        rating: 4.3,
        createdAt: new Date("2025-03-30"),
    },
    {
        title: "Cybersecurity Basics",
        description:
            "Understand threats, firewalls, encryption, and how to protect your systems.",
        instructor: "Anh Tuan",
        imageUrl: "/images/defaultCourse.png",
        category: "Cybersecurity",
        duration: "7h",
        rating: 4.7,
        createdAt: new Date("2025-04-10"),
    },
    {
        title: "Startup Business Fundamentals",
        description:
            "Learn how to validate ideas, attract investors, and grow a startup.",
        instructor: "Nguyen Huy",
        imageUrl: "/images/defaultCourse.pngs",
        category: "Business",
        duration: "5h 45m",
        rating: 4.2,
        createdAt: new Date("2025-04-05"),
    },
];

router.get("/", async (req, res) => {
    try {
        const userId = req.signedCookies.userId;
        const user = await User.findById(userId).lean();

        const newCourses = [...sampleCourses]
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 3);
        const popularCourses = [...sampleCourses]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);

        console.log(user);
        res.render("homepage", {
            user,
            newCourses,
            popularCourses,
        });
    } catch (err) {
        console.error("Error loading homepage courses:", err);
        res.render("homepage", {
            user,
            newCourses: [],
            popularCourses: [],
        });
    }
});

module.exports = router;
