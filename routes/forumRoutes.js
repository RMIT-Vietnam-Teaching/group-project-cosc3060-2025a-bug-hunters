const router = require("express").Router();

// Example dummy data
const user = {
    name: "Mark Brand",
    avatar: "/images/default-avatar.png",
    latestCourses: [
        "Intro to Cybersecurity",
        "Data Science 101",
        "Advanced Physics – C3",
    ],
    enrolledPrograms: [
        "Intro to Cybersecurity",
        "Data Science 101",
        "Advanced Physics – C3",
        "Big Data Dive",
        "UI/UX Crash Course",
    ],
};

const posts = [
    {
        user: {
            name: "Bruce Sping",
            avatar: "/images/default-avatar.png",
        },
        timeAgo: "3h ago",
        content: "Just crushed my first course! 💥",
        image: "/images/rmit-building.jpg",
        likes: 1,
        comments: [
            {
                user: {
                    name: "Alex Robbie",
                    avatar: "/images/default-avatar.png",
                },
                text: "Let’s gooo 🚀 Congrats!!",
            },
        ],
    },
];

const instructors = [
    {
        id: 1,
        name: "Dr. Kim Jones",
        avatar: "/images/default-avatar.png",
        followed: true,
    },
    {
        id: 2,
        name: "Dr. Leonard Pines",
        avatar: "/images/default-avatar.png",
        followed: false,
    },
];

router.get("/", (req, res) => {
    res.render("forum", {
        user,
        posts,
        instructors,
    });
});

module.exports = router;
