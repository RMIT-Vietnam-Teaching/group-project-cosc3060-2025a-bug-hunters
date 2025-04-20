const router = require("express").Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const Course = require("../models/Course");
const User = require("../models/User");

const {
    renderAdminUser,
    renderAdminUserAdd,
    renderAdminUserDetail,
    addNewUser,
    updateUser,
    achiveUser,
    deleteUser,
} = require("../controllers/admin/User");

const {
    renderAdminInstitution,
    renderAdminInstitutionAdd,
    renderAdminInstitutionDetail,
    addNewInstitution,
    updateInsstitution,
    achieveInstitution,
    deleteInstitution,
} = require("../controllers/admin/Institution");

const {
    renderCourse,
    addNewCourse,
    renderCourseAdd,
    updateCourseDetail,
    deleteCourse,
    renderCourseDetail,
} = require("../controllers/admin/Course");

const {
    renderPost,
    achievePost,
    deletePost,
} = require("../controllers/admin/Post");

const posts = [
    {
        id: "p1",
        author: "John Doe",
        time: "15:00",
        content:
            "Exploring the new features of our platform! Excited to share this with you all.",
        media: "https://via.placeholder.com/400x200",
        likes: 10000,
        commentsCount: 99000,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Alice Nguyen",
                text: "This looks amazing!",
            },
        ],
    },
    {
        id: "p2",
        author: "Jane Smith",
        time: "10:30",
        content:
            "Just finished a new tutorial, hope it helps everyone to get started!",
        media: "https://via.placeholder.com/400x200",
        likes: 2500,
        commentsCount: 4500,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Brian Tran",
                text: "Thanks for sharing!",
            },
        ],
    },
    {
        id: "p3",
        author: "Emily Le",
        time: "18:45",
        content: "Teamwork makes the dream work! 🚀",
        media: "https://via.placeholder.com/400x200",
        likes: 7800,
        commentsCount: 3200,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Grace Pham",
                text: "Absolutely agree!",
            },
        ],
    },
];
// Logout Routes
router.get("/logout", (req, res) => {
    // req.logout((err) => {
    //     if (err) {
    //         console.error("Logout error:", err);
    //         return res.status(500).send("Failed to log out.");
    //     }
    //     res.redirect("/");
    // });
    // TODO: Implement logout functionality
});

// User Routes
router.get("/users", renderAdminUser);
router.get("/users/add", renderAdminUserAdd);
router.post("/users/add", upload.single("avatar"), addNewUser);
router.post("/users/update/:userId", upload.single("avatar"), updateUser);
router.post("/users/archive/:userId", achiveUser);
router.post("/users/delete/:userId", deleteUser);
router.get("/users/:userId", renderAdminUserDetail);

// Institution Routes
router.get("/institutions", renderAdminInstitution);
router.get("/institutions/add", renderAdminInstitutionAdd);
router.post("/institutions/add", addNewInstitution);
router.post("/institutions/update/:userId", updateInsstitution);
router.post("/institutions/archive/:userId", achieveInstitution);
router.post("/institutions/delete/:userId", deleteInstitution);
router.get("/institutions/:institutionId", renderAdminInstitutionDetail);

// Course Routes
router.get("/courses", renderCourse);
router.get("/courses/add", renderCourseAdd);
router.post("/courses/add", addNewCourse);
router.post("/courses/update/:courseId", updateCourseDetail);
router.post("/courses/delete/:courseId", deleteCourse);
router.get("/courses/:courseId", renderCourseDetail);

// Posts Routes
router.get("/posts", renderPost);
router.post("/posts/achieve/:postId", achievePost);
router.post("/posts/delete/:postId", deletePost);

module.exports = router;
