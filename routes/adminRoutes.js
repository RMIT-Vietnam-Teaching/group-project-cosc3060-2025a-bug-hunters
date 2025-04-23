const router = require("express").Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });


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
