const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userControllers");


router.get("/userProfile", (req, res) => { // userprofile
    const raw = req.params.usernameProfile;
    const username = raw.replace("Profile", "");
    const picture = req.query.picture || "images/defaultAvatar.png";
    try {
      const user = { name: username, picture: picture};
      res.render("userProfile", { user }); 
    } catch (error) {
      res.status(500).send("Something went wrong");
  }
  });