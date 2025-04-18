const express = require("express");
const User = require("../models/User");
const { get } = require("mongoose");



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
};


const getUserProfileSettings = (req, res) => {
  res.render("userProfileSettings", { user, activePage: "profileSetting" });
};
const loadDisplayTheme = (req, res) => {
  res.render("userSetTheme", {user, activePage: "theme" });
};
const getAccountSecurity = (req, res) => {
  res.render("userSecurity", {user, activePage: "security" });
};

const getAccountBalance = (req, res) => {
  res.render("userBalance", { user, activePage: "balance" });
}
const mongoose = require("mongoose");


const getUserProfile = (req, res) => {
  res.render("userProfile", { user });
}



//use the code below instead!!
// const getUserProfile = async (req, res) => {
  
//   const { userId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     console.error("Invalid MongoDB ID:", userId);
//     return res.status(400).send("Invalid user ID");
//   }
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.redirect("/login");
//     }
//     res.render("userProfile", { user });
//   } catch (error) {
//     console.error("Error fetching user profile:", error.message);
//     res.status(500).send("Something went wrong");
//   }
// };



module.exports = { 
  getUserProfileSettings,
  loadDisplayTheme,
  getAccountSecurity,
  getAccountBalance,
  getUserProfile,
 };