const express = require("express");
const router = express.Router();
const { renderUserProfileByParam, renderUserProfileByQuery } = require("../controllers/userProfile");

router.get("/", renderUserProfileByQuery);
router.get("/", renderUserProfileByParam);

module.exports = router;