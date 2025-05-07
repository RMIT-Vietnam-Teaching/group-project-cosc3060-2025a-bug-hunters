const express = require("express");
const router = express.Router();
const { renderUserProfileByParam, renderUserProfileByQuery } = require("../controllers/userProfile");

router.get("/", renderUserProfileByQuery);
router.get("/:userId", renderUserProfileByParam); 

module.exports = router;