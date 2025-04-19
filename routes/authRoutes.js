const express = require("express");
const router = express.Router();
const {loginUser,registerUser,forgetPasswordUser,resetPasswordUser} = require("../controllers/authentication");

// Render registration page
router.get("/register", (req, res) => {
    res.render("register");
});

// Handle registration
router.post("/register",registerUser);

// Render Login page
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle login
router.post("/login", loginUser);


// Render forget password page
router.get("/forgetPassword", (req, res) => {
    res.render("forgetPassword");
});

// Handle forget password
router.post("/forgetPassword", forgetPasswordUser);

// Render reset password page
router.get("/forgetPassword/resetPassword", (req, res) => {
    res.render("resetPassword", {
        userEmail: req.session.userEmail
    });
});

// Handle reset password
router.post("/forgetPassword/resetPassword",resetPasswordUser);



module.exports = router;
