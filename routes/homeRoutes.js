const express = require("express");
const router = express.Router();
// const Course = require("../models/course");

// sampleData.js

const sampleCourses = [
    {
        title: "Fullstack Web Development",
        description:
            "Learn to build complete web apps using MERN stack with real-world projects.",
        instructor: "Alex Pham",
        imageUrl: "/images/webdev.jpg",
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
        imageUrl: "/images/datascience.jpg",
        category: "Data Science",
        duration: "10h 45m",
        rating: 4.5,
        createdAt: new Date("2025-04-20"),
    },
    {
        title: "Creative UI/UX Design",
        description: "Design interfaces users love using Figma and Adobe XD.",
        instructor: "Minh Chau",
        imageUrl: "/images/design.jpg",
        category: "Design",
        duration: "8h",
        rating: 4.6,
        createdAt: new Date("2025-04-18"),
    },
    {
        title: "Digital Marketing 101",
        description: "Explore SEO, SEM, and social media marketing strategies.",
        instructor: "Linh Vu",
        imageUrl: "/images/marketing.jpg",
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
        imageUrl: "/images/cybersecurity.jpg",
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
        imageUrl: "/images/business.jpg",
        category: "Business",
        duration: "5h 45m",
        rating: 4.2,
        createdAt: new Date("2025-04-05"),
    },
];

router.get("/", async (req, res) => {
    try {
        const newCourses = [...sampleCourses]
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 3);
        const popularCourses = [...sampleCourses]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);

        res.render("homepage", {
            user: res.locals.user,
            newCourses,
            popularCourses,
        });
    } catch (err) {
        console.error("Error loading homepage courses:", err);
        res.render("homepage", {
            user: res.locals.user,
            newCourses: [],
            popularCourses: [],
        });
    }
});

module.exports = router;
