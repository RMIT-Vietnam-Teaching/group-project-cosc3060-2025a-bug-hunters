const express = require("express");
const User = require("../models/User");
const { get } = require("mongoose");




// const updateDisplayTheme = async (req, res) => {
//   try {
//     const { theme } = req.body;
//     const user = {
//       username: 'joanna',
//       picture: 'images/defaultAvatar.png',
//       theme: 'light',
//       headline: "Hello, I'm Joanna!",
//       about: 'I am a student at the University of Toronto.',

//     };
//     res.render("userprofile/display", {
//   user: req.session.user,
//   pageTitle: "Display Settings"
// });
//     req.session.user = user; 
//     // res.redirect("/profile/profilePreferences");
//   } catch (error) {
//     console.log("Update Theme Error:", error.message);
//     res.status(500).send("Theme update failed.");
//   }
// };


const getProfilePreferences = (req, res) => {
  res.render("/userProfileSettings", { user:  'joanna', picture: 'images/defaultAvatar.png', theme: 'light', headline: "Hello, I'm Joanna!", about: 'I am a student at the University of Toronto.' });
};
const loadDisplayTheme = (req, res) => {
  res.render("userSetTheme", {
    user: req.session.user,
    pageTitle: "Display Settings"
  });

}
const getAccountSecurity = (req, res) => {
  res.render("/userSecurity");
}
const getAccountBalance = (req, res) => {
  res.render("/userBalance");
}
const getUserProfileSettings = (req, res) => {
  const raw = req.params.usernameProfile;
  const username = raw.replace("Profile", "");
  const picture = req.query.picture || "images/defaultAvatar.png";
  try {
    const user = { name: username, picture: picture };
    // console.log("user object:", user);
    res.render("userProfileSettings", { user }); 
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

const getUserProfile = (req, res) => {
  const raw = req.params.usernameProfile;
  const username = raw.replace("Profile", "");
  const picture = req.query.picture || "images/defaultAvatar.png";
  try {
    const user = { name: username, picture: picture };
    res.render("userProfile", { user }); 
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}


module.exports = { 
  getProfilePreferences,
  // getDisplayTheme, 
  loadDisplayTheme,
  // updateDisplayTheme,
  getAccountSecurity,
  getAccountBalance,
  getUserProfileSettings
 };