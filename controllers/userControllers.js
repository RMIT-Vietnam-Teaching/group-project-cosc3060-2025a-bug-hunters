const express = require("express");
const User = require("../models/User");




const updateDisplayTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    const user = {
      username: 'joanna',
      picture: 'images/defaultAvatar.png',
      theme: 'light',
      headline: "Hello, I'm Joanna!",
      about: 'I am a student at the University of Toronto.',

    };
    
    req.session.user = user; 
    // res.redirect("/profile/profilePreferences");
  } catch (error) {
    console.log("Update Theme Error:", error.message);
    res.status(500).send("Theme update failed.");
  }
};


const getProfilePreferences = (req, res) => {
  res.render("/profilePreferences", { user:  'joanna', picture: 'images/defaultAvatar.png', theme: 'light', headline: "Hello, I'm Joanna!", about: 'I am a student at the University of Toronto.' });
};
const loadDisplayTheme = (req, res) => {
  res.render("/displayTheme");
}
const getAccountSecurity = (req, res) => {
  res.render("/profilePreferences");
}
const getAccountBalance = (req, res) => {
  res.render("/accountBalance");
}

module.exports = { 
  getProfilePreferences,
  // getDisplayTheme, 
  loadDisplayTheme,
  updateDisplayTheme,
  getAccountSecurity,
  getAccountBalance
 };