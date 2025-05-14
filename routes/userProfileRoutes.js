const express = require("express");
const router = express.Router();
const { renderUserProfile } = require("../controllers/userProfile");
const { requireOwnUserAccess } = require("../middlewares/auth");

router.get("/:userRouteId", renderUserProfile);

module.exports = router;