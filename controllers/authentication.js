const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require('axios');

//User register function 
exports.registerUser = async (req, res) => {
  try {
    const {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userRole,
      'g-recaptcha-response': recaptchaToken
    } = req.body;

    //Check CAPTCHA
    if (!recaptchaToken) {
      return res.render("register", {
        error: "Please complete the CAPTCHA.",
        formData: req.body
      });
    }

    //Verify CAPTCHA with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      new URLSearchParams({
        secret: secretKey,
        response: recaptchaToken
      })
    );

    if (!verifyResponse.data.success) {
      return res.render("register", {
        error: "CAPTCHA verification failed. Try again.",
        formData: req.body
      });
    }

    //Check if email already exists
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.render("register", {
        error: "Email already registered.",
        formData: req.body
      });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    //Create and save user
    const newUser = new User({
      userFirstName,
      userLastName,
      userEmail,
      userPassword: hashedPassword,
      userRole,
    });

    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).render("register", { error: "An error occured during Registration", formData: req.body });
  }
};


// User Log In function 
exports.loginUser = async (req, res) => {
    const { 
        userEmail, 
        userPassword, 
        'g-recaptcha-response': recaptchaToken
     } = req.body;

      //Check CAPTCHA
    if (!recaptchaToken) {
        return res.render("login", {
          error: "Please complete the CAPTCHA.",
          formData: req.body
        });
      }

       //Verify CAPTCHA with Google

    console.log("Login attempt:", userEmail);
  
    try {

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const captchaRes = await axios.post(`
            https://www.google.com/recaptcha/api/siteverify`, 
        new URLSearchParams({
            secret: secretKey,
            response: recaptchaToken
        })
        );

        if (!captchaRes.data.success) {
        return res.render("login", {
            error: "CAPTCHA verification failed. Try again.",
            formData: req.body
        });
        }

      //Find user email 
      const user = await User.findOne({ userEmail });
  
      if (!user) {
        return res.render("login", { error: "User not found." });
      }
  
      //Compare hashed password
      const isMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!isMatch) {
        return res.render("login", { error: "Invalid password." });
      }
  
      //Success notification - i put this to debug 
      console.log("Login successful for:", userEmail);

      req.session.user = {
        _id: user._id,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userEmail: user.userEmail,
        userRole: user.userRole
      };

      console.log("Session User:", req.session.user);

      req.session.save(() => {
        res.redirect("/");
      });
  
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).render("login", { error: "An error occurred during login." });
    }
  };



//User forget their password function
exports.forgetPasswordUser = async (req, res) => {
    const { userEmail } = req.body;

    try {
        //Find user email 
        const user = await User.findOne({ userEmail });

        if (!user) {
            // If the email is not found, send an error
            return res.render("forgetPassword", { error: "Email not found." });
        }
        
        // Redirect to reset password page with the email
        req.session.userEmail = userEmail;
        console.log("this is a session:",req.session.userEmail);
        
        res.redirect("/auth/forgetPassword/resetPassword");


    } catch (err) {
        console.error("Error during password reset:", err);
        res.status(500).render("forgetPassword", { error: "An error occurred while processing your forget Password request." });
    }
};


//User reset password 
exports.resetPasswordUser = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const userEmail = req.session.userEmail;
  
    //Find user email
    try {
        const user = await User.findOne({ userEmail });
      //Check if user exist 
        if (!user) {
            return res.render("resetPassword", { 
                error: "User not found.", 
                userEmail
            });
        }

        //Check if the password match 
        if (newPassword !== confirmPassword) {
            return res.render("resetPassword", { 
                error: "Passwords do not match.", 
                userEmail
            });
        }

        //Check if the current password is the same as the previous password
        const isSamePassword = await bcrypt.compare(newPassword, user.userPassword);
        if (isSamePassword) {
            return res.render("resetPassword", { 
                error: "New password cannot be the same as the current password.", 
                userEmail
            });
        }

        // Check against password history
        if (user.passwordHistory) {
            for (let oldHashed of user.passwordHistory) {
                if (await bcrypt.compare(newPassword, oldHashed)) {
                    return res.render("resetPassword", {
                        error: "This password has been used before. Please choose a different password.",
                        userEmail
                    });
                }
            }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Store current password before updating
        if (!user.passwordHistory) user.passwordHistory = [];
        user.passwordHistory.push(user.userPassword);

        // Trim to last 5 passwords
        if (user.passwordHistory.length > 5) {
            user.passwordHistory = user.passwordHistory.slice(-5);
        }

        // Save new password
        user.userPassword = hashedPassword;

        await user.save();
        req.session.userEmail = null;
        
        res.redirect("/auth/login");

    } catch (err) {
        console.error("Error during password reset:", err);
        res.status(500).render("resetPassword", {
            error: "An error occurred while processing your reset password request.",
            userEmail
        });
    }
};
