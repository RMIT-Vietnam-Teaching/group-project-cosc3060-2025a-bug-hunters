const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const user = {
        name: "Mark Brand",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
        latestCourses: [
            "Intro to Cybersecurity",
            "Data Science 101",
            "Advanced Physics - C3",
        ],
        enrolledPrograms: [
            "Intro to Cybersecurity",
            "Data Science 101",
            "Advanced Physics - C3",
            "Big Data Dive",
            "UI/UX Crash Course",
        ],
    };

    const posts = [
        {
            user: {
                name: "Bruce Sping",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
            },
            timeAgo: "3h ago",
            content: "Just crushed my first course! 💥",
            image: "data:image/jpeg;base64,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",
            comments: [
                {
                    user: {
                        name: "Alex Robbie",
                        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
                    },
                    text: "Let’s gooo 🚀 Congrats!!",
                },
            ],
        },
        {
            user: {
                name: "Amanda Will",
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
            },
            timeAgo: "3h ago",
            content: "Even got my lil bro learning with me now 😂💻",
            image: "/images/little-brother.jpg",
            comments: [
                {
                    user: {
                        name: "Morgana Stern",
                        avatar: "/images/morgana.jpg",
                    },
                    text: "Wait what course is this? 👀",
                },
            ],
        },
    ];

    const instructors = [
        {
            id: 1,
            name: "Dr. Kim Jones",
            avatar: "https://encrypted-tbn0.gstatic.com/imagesq=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
            followed: true,
        },
        {
            id: 2,
            name: "Dr. Leonard Pines",
            avatar: "https://encrypted-tbn0.gstatic.com/imagesq=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
            followed: false,
        },
    ];

    res.render("forum", { user, posts, instructors });
});

module.exports = router;
