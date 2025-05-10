const express = require("express");
const router = express.Router();
const { renderUserProfile } = require("../controllers/userProfile");

router.get("/:userRouteId", renderUserProfile);

module.exports = router;