const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.renderUserPreference = async (req, res) => {
  const loggedInUserId = res.locals.user?._id?.toString(); 
  const routeUserId = req.params.userId;

 

  if (!loggedInUserId || loggedInUserId !== routeUserId) {
    return res.status(403).send("Unauthorized access.");
  }

  try {
    const user = await User.findById(routeUserId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const success = req.query.success;

    res.render("userSettingProfilePreference", {
      user,
      activePage: "profileSetting",
      success,
    });
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};

exports.updateUserPreference = async (req, res) => {
  try {
    const { userId } = req.params;

    const { firstName, lastName, email, headline, description } = req.body;
    const updateData = {
      firstName,
      lastName,
      email,

      headline,
      description,
    };

    // Handle uploaded avatar
    if (req.file) {
      updateData.avatar = req.file.path; 
    }

    await User.findByIdAndUpdate(userId, updateData);
    res.redirect(`/userSettings/profilePreference/${userId}?success=1`);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Failed to update user");
  }
};

exports.renderDisplay = async (req, res) => {
  const loggedInUserId = res.locals.user?._id?.toString(); 
  const routeUserId = req.params.userId;
  if (!loggedInUserId || loggedInUserId !== routeUserId) {
    return res.status(403).send("Unauthorized access.");
  }

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

exports.renderAccountSecurity = async (req, res) => {
  const loggedInUserId = res.locals.user?._id?.toString(); 
  const routeUserId = req.params.userId;
  console.log("signedCookies =", req.signedCookies);
  console.log("userId from cookie:", req.signedCookies.userId);
  console.log("🔑 loggedInUserId:", loggedInUserId);
  console.log("📍 routeUserId:", routeUserId);
  if (!loggedInUserId || loggedInUserId !== routeUserId) {
    return res.status(403).send("Unauthorized access.");
  }

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("userSettingSecurity", {
      user,
      activePage: "security",
      success: req.query.success === '1' || req.query.success === 'true',
      error: req.query.error || null
    });
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};

exports.renderAccountBalance = async (req, res) => {
  const loggedInUserId = res.locals.user?._id?.toString(); 
  const routeUserId = req.params.userId;

  console.log("🔑 loggedInUserId:", loggedInUserId);
  console.log("📍 routeUserId:", routeUserId);
  if (!loggedInUserId || loggedInUserId !== routeUserId) {
    return res.status(403).send("Unauthorized access.");
  }

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("userSettingBalance", { user, activePage: "balance", success: req.query.success, });
  } catch (error) {
    console.error("Error rendering user profile settings:", error);
    res.status(500).send("Failed to render user profile settings");
  }
};

exports.updateUserDisplay = async (req, res) => {
  try {
    const { userId } = req.params;
    const theme = req.body.theme || req.body?.theme; 

    await User.findByIdAndUpdate(userId, { theme }, { runValidators: true });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating user display settings:", error);
    res.status(500).json({ success: false });
  }
};



exports.updateUserSecurity = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const { newEmail, oldPassword, newPassword, confirmPassword } = req.body;

    // Update email if changed
    if (newEmail && newEmail !== user.email) {
      user.email = newEmail;
    }

    // Handle password update
    if (oldPassword || newPassword || confirmPassword) {
      // All fields must be filled
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.redirect(`/userSettings/security/${userId}?error=Please+fill+all+password+fields`);
      }

      // Check if old password matches the stored one
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordMatch) {
        return res.redirect(`/userSettings/security/${userId}?error=Old+password+is+incorrect`);
      }

      // Check if new passwords match
      if (newPassword !== confirmPassword) {
        return res.redirect(`/userSettings/security/${userId}?error=Passwords+do+not+match`);
      }

      const isSameAsOld = await bcrypt.compare(newPassword, user.password);
      if (isSameAsOld) {
        return res.redirect(`/userSettings/security/${userId}?error=New+password+must+be+different+from+old+password`);
      }

      // Hash new password and assign
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
    }

    await user.save({ validateModifiedOnly: true });

    res.redirect(`/userSettings/security/${userId}?success=1`);
  } catch (error) {
    console.error("Error updating user security settings:", error);
    res.status(500).send("Failed to update user security settings");
  }
};


exports.updateUserBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cardNumber, expirationDate, cvv, cardHolderName } = req.body;
    const sanitizedCardNumber = cardNumber.replace(/\s/g, "");
    const last4 = sanitizedCardNumber.slice(-4);

    console.log("Form data received:", req.body);

    const updatedFields = {
      cardPaymentInfo: {
        cardNumber: `**** **** **** ${last4}`,
        expirationDate,
        cvv,
        cardHolderName,
      },
    };

    await User.findByIdAndUpdate(userId, updatedFields, { runValidators: true });

    res.redirect(`/userSettings/balance/${userId}?success=1`);
  } catch (error) {
    console.error("Error updating user card info:", error);
    res.status(500).send("Failed to update card info");
  }
};

