const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");

const user = {
  id: "123",
  firstName: "paddy",
  lastName: "Smith",
  picture: "images/defaultAvatar.png",
  theme: "light",
  email: "paddy123@gmail.com",
  phone: "1234567890",
  major: "Computer Science",
  joinDate: "2023-10-01",
  headline: "Hello, I'm paddy!!",
  about: "I am a student at the University of Toronto.",
  password: "oldpassword",
};

const getUserProfileSettings = (req, res) => {
  res.render("userProfileSettings", { user, activePage: "profileSetting" });
};

const loadDisplayTheme = (req, res) => {
  res.render("userSetTheme", { user, activePage: "theme" });
};

const getAccountSecurity = (req, res) => {
  const { success, error } = req.query;
  res.render("userSecurity", { user, activePage: "security", success, error });
};

const getAccountBalance = (req, res) => {
  res.render("userBalance", { user, activePage: "balance" });
};

const getUserProfile = (req, res) => {
  res.render("userProfile", { user });
};

// changing email
const changeEmail = async (req, res) => {
  const { newEmail } = req.body;
  try {
    user.email = newEmail;
    res.redirect("/settings/security?success=Email+updated+to+" + encodeURIComponent(newEmail));
  } catch (error) {
    res.status(500).send("Error updating email");
  }
};

//changing password
const changePassword = async (req, res) => {
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
  getUserProfileSettings,
  loadDisplayTheme,
  getAccountSecurity,
  getAccountBalance,
  getUserProfile,
  changeEmail,
  changePassword
};