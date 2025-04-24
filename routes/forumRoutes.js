const router = require("express").Router();
const User = require("../models/User");
const Course = require("../models/Course");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const Post = require("../models/Post");

// Example dummy data
const user = {
    name: "Mark Brand",
    avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
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

const instructors = [
    {
        id: 1,
        name: "Dr. Kim Jones",
        avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        followed: true,
    },
    {
        id: 2,
        name: "Dr. Leonard Pines",
        avatar: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        followed: false,
    },
];

router.get("/", async (req, res) => {
    try {
        const instructors = await User.find({ role: "Instructor" })
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

        const courses = await Course.find();

        res.render("forum", {
            user,
            posts,
            instructors,
        });
    } catch (error) {
        console.error("Error rendering forum page:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/post", async (req, res) => {
    // TOOD: Handler post function here
});


router.post("/follow", async (req, res) => {
    const { instructorId } = req.body;

    try {
        // Get current user from session or authentication
        const currentUserId = req.user._id;

        // Find both users
        const currentUser = await User.findById(currentUserId);
        const instructor = await User.findById(instructorId);

        if (!instructor || instructor.role !== "Instructor") {
            return res.status(404).json({ message: "Instructor not found" });
        }

        // Check if already followed
        const isFollowing = currentUser.following.includes(instructorId);

        if (isFollowing) {
            // Unfollow
            currentUser.following.pull(instructorId);
            await currentUser.save();
            return res
                .status(200)
                .json({ message: "Unfollowed successfully", followed: false });
        } else {
            // Follow
            currentUser.following.push(instructorId);
            await currentUser.save();
            return res
                .status(200)
                .json({ message: "Followed successfully", followed: true });
        }
    } catch (error) {
        console.error("Error updating follow status:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
