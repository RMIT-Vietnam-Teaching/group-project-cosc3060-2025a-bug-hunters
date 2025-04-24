const User = require("../models/User");

const renderUserPreference = async (req, res) => {
  const tempUserId  = "68084f433822e88df6ec532f";

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const success = req.query.success;

    res.render("userSettingProfilePreference", { user, activePage: "profileSetting", success });
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};

const updateUserPreference = async (req, res) => {
  try {
    const {userId} = req.params;

    const {
        firstName,
        lastName,
        email,
        headline,
        description,
    } = req.body;
    const updateData = {
        firstName,
        lastName,
        email,
   
        headline,
        description,
    };

    // Handle uploaded avatar
    if (req.file) {
      updateData.avatar = req.file.path; // if using cloudinary, you can also use req.file.secure_url
    }

    await User.findByIdAndUpdate(userId, updateData);
    res.redirect(`/userSettings/profilePreference/${userId}?success=1`);

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Failed to update user");
  }
}

// const getUserProfileSettings = async (req, res) => {
//   try {
//     // const { userId } = req.params;
//     const userId  = "68084f433822e88df6ec532f";
//     const {
//         firstName,
//         lastName,
//         email,
//         role,
//         headline,
//         description,
//     } = req.body;

//     const updateData = {
//         firstName,
//         lastName,
//         email,
//         role,
//         headline,
//         description,
//     };
//     console.log(updateData.firstName);

//     if (req.file && req.file.path) {
//         updateData.avatar = req.file.path; 
//     }

//     console.log( await User.findByIdAndUpdate(userId, updateData));
//     res.redirect("/settings/profileSetting/preferences/${userId}?success=Profile+updated");
// } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).send("Failed to update user");
// }
// };


const renderDisplay = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("userSettingDisplay", { user, activePage: "display" });
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};

const renderAccountSecurity = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
  
    res.render("userSettingSecurity", { user, activePage: "security"});
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};

const renderAccountBalance = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
  
    res.render("userSettingBalance", { user, activePage: "balance"});
    
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};










const getUserProfile = async (req, res) => {
  const user = await User.find();
  res.render("userProfile", { user });
};


const changeEmail = async (req, res) => {
  const user = await User.find();
  const { newEmail } = req.body;
  try {
    user.email = newEmail;
    res.redirect("/settings/security?success=Email+updated+to+" + encodeURIComponent(newEmail));
  } catch (error) {
    res.status(500).send("Error updating email");
  }
};


const changePassword = async (req, res) => {
  const user = await User.find()
  const { oldPassword, newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword) {
      return res.redirect("/settings/security?error=Passwords+do+not+match");
    }
    
    if (oldPassword !== user.password) {
      return res.redirect("/settings/security?error=Old+password+is+incorrect");
    }
    
    if (newPassword === user.password) {
      return res.redirect("/settings/security?error=New+password+must+be+different+from+old+password");
    }
  
    user.password = newPassword;
    res.redirect("/settings/security?success=Password+successfully+changed");
  } catch (error) {
    res.status(500).send("Error changing password");
  }
};

module.exports = {
  renderUserPreference,
  updateUserPreference,
  renderDisplay,
  renderAccountSecurity,
  renderAccountBalance,
};