const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userControllers");



router.route("profilePreferences").get(userController.getProfilePreferences);
router.route("displayTheme").get(userController.loadDisplayTheme);
router.route("accountSecurity").get(userController.getAccountSecurity);
router.route("accountBalance").get(userController.getAccountBalance);



router.get("/displayTheme", (req, res) => { //link theme
  const user = {
    username: "joanna",
    picture: "images/defaultAvatar.png",
    theme: "light",
    headline: "Hello, I'm Joanna!",
    about: "I am a student at the University of Toronto.",
  };
  res.render("displayTheme", { user });
});

router.get("/accountSecurity", (req, res) => { //link accsecurity
  const user = {
    username: "joanna",
    picture: "images/defaultAvatar.png",
    theme: "light",
    headline: "Hello, I'm Joanna!",
    about: "I am a student at the University of Toronto.",
  };
  res.render("accountSecurity", { user });
}
);

router.get("/accountBalance", (req, res) => { // accbalance
  const user = {
    username: "joanna",
    picture: "images/defaultAvatar.png",
    theme: "light",
    headline: "Hello, I'm Joanna!",
    about: "I am a student at the University of Toronto.",
  };
  res.render("accountBalance", { user });
}
);

router.get("/:usernameProfile", async (req, res) => { // userprofile
  const raw = req.params.usernameProfile;
  const username = raw.replace("Profile", "");
  const picture = req.query.picture || "images/defaultAvatar.png";
  try {
    const user = { name: username, picture: picture};
    // console.log("user object:", user);
    res.render("profilePreferences", { user }); //important
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;