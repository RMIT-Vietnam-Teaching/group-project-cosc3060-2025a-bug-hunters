const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { storage } = require("../utils/cloudinary");
const multer = require('multer');
const upload = multer({ storage });

// const{
//   updateUserProfile,
// } = require("../controllers/userSettings/profile");

const {renderUserPreference, renderAccountSecurity, renderAccountBalance,renderDisplay, updateUserPreference, updateUserDisplay, updateUserSecurity, updateUserBalance } = require("../controllers/userSetting");

 


router.get("/profilePreference/:userId", renderUserPreference);
router.post("/profilePreference/update/:userId", upload.single("avatar"), updateUserPreference);


router.get("/display/:userId", renderDisplay);
router.post("/display/update/:userId", updateUserDisplay);

router.get("/security/:userId", renderAccountSecurity);
router.post("/security/update/:userId", updateUserSecurity);

router.get("/balance/:userId", renderAccountBalance);
router.post("/balance/update/:userId", updateUserBalance);







// // userprofile (view by other users)
// router.get("/profile/:userId", getUserProfile);


// // go to messages page
// router.get('/messages/:userId', async (req, res) => {
//   const user = await User.findById(req.params.userId);
//   res.render('message', { user });
// });

module.exports = router;