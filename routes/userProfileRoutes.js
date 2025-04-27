const express = require("express");
const router = express.Router();

const{
    renderUserProfile,
  } = require("../controllers/userProfile");


  router.get('/get-cookie', (req, res) => {
    const userCookie = req.cookies.user; 
    if (userCookie) {
        res.send(`Cookie Value: ${userCookie}`);
    } else {
        res.send('Cookie not found');
    }
});
router.get("/:userId", renderUserProfile);

module.exports = router;