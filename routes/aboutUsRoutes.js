const express = require("express");
const router = express.Router();
const {renderAboutUsPage} = require("../controllers/aboutUsController");

router.get("/about-us", renderAboutUsPage);

module.exports = router;
