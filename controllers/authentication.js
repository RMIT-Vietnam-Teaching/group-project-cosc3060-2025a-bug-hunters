const bcrypt = require("bcrypt");
const User = require("../models/User");


exports.registerUser = async (req, res) => {
  try {
    const {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userRole,
      isBot,
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.render("register", {
        error: "Email already registered.",
        formData: req.body,
      });
    }
    
    //Create new user
    const newUser = new User({
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      userRole,
      isBot: true,
    });
    
    console.log("Creating new user...");
    await newUser.save();

    res.redirect("/homepage");
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send("Registration failed.");
  }
};

exports.loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log("Login attempt:", userEmail, userPassword);
  // Add credential validation logic here

  try {
    // Check if user exists
    const user = await User.findOne({userEmail });

    if (!user) {
      return res.render("login", { error: "User not found." });
    }

    // Simple password match check (in real apps, hash this!)
    if (user.userPassword !== userPassword) {
      return res.render("login", { error: "Invalid password." });
    }

    // Successful login
    // You can add session logic here if needed
    console.log("Login successful for:", userEmail);
    res.redirect("/homepage");

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).render("login", { error: "An error occurred during login." });
  }

};


exports.forgetPasswordUser = async (req, res) => {
    const { userEmail } = req.body;

    try {
        // Check if the email exists in the database
        const user = await User.findOne({ userEmail });

        if (!user) {
            // If the email is not found, send an error
            return res.render("forgetPassword", { error: "Email not found." });
        }
        
        // Redirect to reset password page with the email
        req.session.userEmail = userEmail;

    } catch (err) {
        console.error("Error during password reset:", err);
        res.status(500).render("forgetPassword", { error: "An error occurred while processing your forget Password request." });
    }
};

exports.resetPasswordUser = async (req, res) => {
    const { userEmail, newPassword, confirmPassword } = req.body;
    console.log("Email received during reset:", userEmail);

    try {
        const user = await User.findOne({ userEmail });

        if (!user) {
            return res.render("resetPassword", { 
                error: "User not found.", 
                userEmail
            });
        }

        if (newPassword !== confirmPassword) {
            return res.render("resetPassword", { 
                error: "Passwords do not match.", 
                userEmail
            });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.userPassword);
        if (isSamePassword) {
            return res.render("resetPassword", { 
                error: "New password cannot be the same as the current password.", 
                userEmail
            });
        }

 
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
        user.userPassword = hashedPassword;

        // Update password history
        if (!user.passwordHistory) user.passwordHistory = [];
        user.passwordHistory.push(hashedPassword);

        if (user.passwordHistory.length > 5) {
            user.passwordHistory = user.passwordHistory.slice(-5);
        }

        await user.save();

        res.redirect("/auth/login");

    } catch (err) {
        console.error("Error during password reset:", err);
        res.status(500).render("resetPassword", {
            error: "An error occurred while processing your reset password request.",
            userEmail
        });
    }
};