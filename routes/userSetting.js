const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { storage } = require("../utils/cloudinary");
const multer = require('multer');
const upload = multer({ storage });

const {renderUserPreference, renderAccountSecurity, renderAccountBalance, renderDisplay, updateUserPreference, } = require("../controllers/userSetting");

 



router.get("/profilePreference/:userId", renderUserPreference);
router.post("/profilePreference/update/:userId", upload.single("avatar"), updateUserPreference);

router.get("/display/:userId", renderDisplay);

router.get("/security/:userId", renderAccountSecurity);

router.get("/balance/:userId", renderAccountBalance);








module.exports = router;