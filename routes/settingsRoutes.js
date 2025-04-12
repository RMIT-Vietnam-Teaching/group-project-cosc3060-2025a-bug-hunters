const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const userController = require("../controllers/userControllers");



// router.route("userProfileSettings").get(userController.getProfilePreferences);
// router.route("userSetTheme").get(userController.loadDisplayTheme);
// router.route("userSecurity").get(userController.getAccountSecurity);
// router.route("userBalance").get(userController.getAccountBalance);



router.get("/theme", (req, res) => { //link theme
  const user = {
    username: "joanna",
    picture: "images/defaultAvatar.png",
    theme: "light",
    headline: "Hello, I'm Joanna!",
    about: "I am a student at the University of Toronto.",
  };
  res.render("userSetTheme", { user });
});

router.get("/security", (req, res) => { //link accsecurity
  const user = {
    username: "joanna",
    picture: "images/defaultAvatar.png",
    theme: "light",
    headline: "Hello, I'm Joanna!",
    about: "I am a student at the University of Toronto.",
  };
  res.render("userSecurity", { user });
}
);

router.get("/balance", (req, res) => { // accbalance
  const user = {
    username: "joanna",
    picture: "images/defaultAvatar.png",
    theme: "light",
    headline: "Hello, I'm Joanna!",
    about: "I am a student at the University of Toronto.",
  };
  res.render("userBalance", { user });
}
);
router.get("/myProfile", (req, res) => { // userprofile
    res.render("userProfile", { user: "joanna" }); 
  });

router.get("/:usernameProfile", async (req, res) => { //user settings
  const raw = req.params.usernameProfile;
  const username = raw.replace("Profile", "");
  const picture = req.query.picture || "images/defaultAvatar.png";
  try {
    const user = { name: username, picture: picture};
    // console.log("user object:", user);
    res.render("userProfileSettings", { user }); //important
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;