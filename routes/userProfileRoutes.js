const express = require("express");
const router = express.Router();

const{
    renderUserProfile,
  } = require("../controllers/userProfile");


router.get("/:userId", renderUserProfile);

module.exports = router;