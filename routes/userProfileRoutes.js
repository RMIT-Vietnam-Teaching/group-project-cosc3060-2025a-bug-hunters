const express = require("express");
const router = express.Router();
const { renderUserProfileByQuery, renderUserProfileByParam } = require("../controllers/userProfile");

router.get("/", renderUserProfileByQuery);
router.get("/:id", renderUserProfileByParam);

module.exports = router;