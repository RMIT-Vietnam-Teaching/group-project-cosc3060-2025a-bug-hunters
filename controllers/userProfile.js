const User = require("../models/User");
const Course = require("../models/Course");

exports.renderUserProfile = async (req, res) => {
    try {
        const { userRouteId } = req.params;
        const profileUser = await User.findById(userRouteId).lean();
        if (!profileUser) return res.status(404).send("User not found.");

        const loggedInUserId = req.signedCookies?.userId;
        const loggedInUser = loggedInUserId
            ? await User.findById(loggedInUserId).lean()
            : null;
        const isOwner =
            loggedInUserId && loggedInUserId === profileUser._id.toString();

        // Fetch courses the user has purchased
        const studiedCourses = Array.isArray(profileUser.purchasedCourses)
            ? await Course.find({
                  _id: { $in: profileUser.purchasedCourses },
              }).lean()
            : [];

        const createdCourses = await Course.find({
            author: profileUser._id,
        }).lean();

        res.render("userProfile", {
            user: loggedInUser,
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
