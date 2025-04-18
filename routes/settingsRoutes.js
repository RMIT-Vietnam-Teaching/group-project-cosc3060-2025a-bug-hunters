const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require('multer');
// const upload = multer({ dest: 'public/uploads/' });
const session = require("express-session");


const userController = require("../controllers/userControllers");

// router.use(session({ 
//   // secret: config.sessionSecret,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false }
// }));



router.get("/profileSetting", userController.getUserProfileSettings);
router.get("/security", userController.getAccountSecurity);
router.get("/balance", userController.getAccountBalance);
router.get("/theme", userController.loadDisplayTheme);
router.get("/profile/:userId", userController.getUserProfile);

// send a message and keep the user on the same page
router.post('/send-message', async (req, res) => {
  const { recipientId, message } = req.body;
  console.log(`Message sent to ${recipientId}: ${message}`);
  res.redirect('back');
});

//go to messages page
router.get('/messages/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.render('message', { user }); 
});

module.exports = router;