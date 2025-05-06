const express = require("express");
const router = express.Router();
const { renderUserProfileByQuery } = require("../controllers/userProfile");

router.get("/", renderUserProfileByQuery);

module.exports = router;