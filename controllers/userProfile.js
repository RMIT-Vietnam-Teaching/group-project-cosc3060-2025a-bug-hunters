const User = require("../models/User");
const Course = require("../models/Course");

exports.renderUserProfile = async (req, res) => {
    try {
      const { userRouteId } = req.params;
      const profileUser = await User.findById(userRouteId).lean();
      if (!profileUser) return res.status(404).send("User not found.");

      const loggedInUserId = req.signedCookies?.userId;
      const loggedInUser   = loggedInUserId
        ? await User.findById(loggedInUserId).lean()
        : null;
      const isOwner = loggedInUserId === profileUser._id.toString();
  
      let studiedCourses = [];
      if (Array.isArray(profileUser.purchasedCourses) && profileUser.purchasedCourses.length) {
        studiedCourses = await Course.find({
          _id: { $in: profileUser.purchasedCourses }
        })
          .populate("author", "firstName lastName")
          .lean();
      } else {
        studiedCourses = await Course.find({
          studentsEnrolled: profileUser._id
        })
          .populate("author", "firstName lastName")
          .lean();
      }
  
      // the ones they created
      const createdCourses = await Course.find({
        author: profileUser._id
      })
        .populate("author", "firstName lastName")
        .lean();
  
      res.render("userProfile", {
        user:          loggedInUser,
        profileUser,
        isOwner,
        studiedCourses,
        createdCourses,
      });
    } catch (err) {
      console.error("Error loading user profile:", err);
      res.status(500).send("Server error.");
    }
  };

