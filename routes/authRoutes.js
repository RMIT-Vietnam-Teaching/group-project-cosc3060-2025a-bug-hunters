const express = require("express");
const router = express.Router();
const {loginUser,registerUser,forgetPasswordUser,resetPasswordUser} = require("../controllers/authentication");
const {renderRegisterPage,renderLoginPage,renderForgetPasswordPage,renderResetPasswordPage} = require("../controllers/authentication");

// Render registration page
router.get("/register", renderRegisterPage);

// Handle registration
router.post("/register",registerUser);

// Render Login page
router.get("/login", renderLoginPage);

// Handle login
router.post("/login", loginUser);


// Render forget password page
router.get("/forgetPassword", renderForgetPasswordPage);

// Handle forget password
router.post("/forgetPassword", forgetPasswordUser);

// Render reset password page
router.get("/forgetPassword/resetPassword", renderResetPasswordPage);

// Handle reset password
router.post("/forgetPassword/resetPassword",resetPasswordUser);



module.exports = router;
