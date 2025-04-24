const express = require("express");
const User = require("../../models/User");
const mongoose = require("mongoose");


exports.randerUserProfileSettings = (req, res) => {
    res.render("/userProfileSettings");
  };
  
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const {
            firstName,
            lastName,
            email,
            role,
            headline,
            description,
          } = req.body;
    
        const updateData = {
            firstName,
            lastName,
            email,
            role,
            headline,
            description,
        };
    
        if (req.file && req.file.path) {
            updateData.avatar = req.file.path; 
        }
    
        await User.findByIdAndUpdate(userId, updateData);
        res.redirect('/settings/profileSetting');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Failed to update user");
    }
    }

    // module.exports = {
    //     updateUserProfile,
    // };