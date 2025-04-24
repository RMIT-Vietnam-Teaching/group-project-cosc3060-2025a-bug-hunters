const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { storage } = require("../utils/cloudinary");
const multer = require('multer');
const upload = multer({ storage });

const{
  updateUserProfile,
} = require("../controllers/userSettings/profile");

const {renderUserPreference, renderAccountSecurity, renderAccountBalance,renderDisplay, updateUserPreference, } = require("../controllers/userSetting");

 

//user settings
// router.post("/profileSetting/preferences/update/:userId", upload.single("avatar"), updateUserProfile);
// router.post("/profileSetting/update/:userId", upload.single("avatar"), updateUserProfile);

router.get("/profilePreference/:userId", renderUserPreference);
router.post("/profilePreference/update/:userId", upload.single("avatar"), updateUserPreference);

router.get("/display/:userId", renderDisplay);

router.get("/security/:userId", renderAccountSecurity);

router.get("/balance/:userId", renderAccountBalance);






// // userprofile (view by other users)
// router.get("/profile/:userId", getUserProfile);

// // Change email and password routes
// router.post("/security/change-email", changeEmail);
// router.post("/security/change-password", changePassword);

// // send a message and keep the user on the same page
// router.post('/send-message', async (req, res) => {
//   const { recipientId, message } = req.body;
//   console.log(`Message sent to ${recipientId}: ${message}`);
//   res.redirect('back');
// });

// // go to messages page
// router.get('/messages/:userId', async (req, res) => {
//   const user = await User.findById(req.params.userId);
//   res.render('message', { user });
// });

module.exports = router;