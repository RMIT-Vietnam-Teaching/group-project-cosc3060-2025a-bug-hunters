const router = require("express").Router();
const User = require("../models/User");
const Course = require("../models/Course");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Post = require("../models/Post");

const posts = [
    {
        user: {
            name: "Bruce Sping",
            avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        },
        timeAgo: "3h ago",
        content: "Just crushed my first course! 💥",
        image: "https://statics.cdn.200lab.io/2022/11/WebDevelopmentImage.jpeg",
        likes: 1,
        comments: [
            {
                user: {
                    name: "Alex Robbie",
                    avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                },
                text: "Let’s gooo 🚀 Congrats!!",
            },
        ],
    },
];

router.get("/", async (req, res) => {
    try {
        const userId = req.signedCookies.userId;

        const user = await User.findById(userId).lean();

        user.latestCourses = [
            "Intro to Cybersecurity",
            "Data Science 101",
            "Advanced Physics – C3",
        ];
        user.enrolledPrograms = [
            "Intro to Cybersecurity",
            "Data Science 101",
            "Advanced Physics – C3",
            "Big Data Dive",
            "UI/UX Crash Course",
        ];

        const users = await User.find({ _id: { $ne: userId } })
            .then((instructors) => {
                return instructors.map((instructor) => ({
                    id: instructor._id,
                    name: `${instructor.firstName} ${instructor.lastName}`,
                    avatar: instructor.avatar,
                    followed: false, // Default value
                }));
            })
            .catch((err) => {
                console.error("Error fetching instructors:", err);
                return [];
            });

        // const courses = await Course.find();

        res.render("forum", {
            user,
            posts,
            users,
        });
    } catch (error) {
        console.error("Error rendering forum page:", error);
        res.status(500).send(error.message);
    }
});

router.post("/post", async (req, res) => {
    // TOOD: Handler post function here
});

router.post("/follow", async (req, res) => {
    //  TODO: Handler follow function here
});

module.exports = router;
