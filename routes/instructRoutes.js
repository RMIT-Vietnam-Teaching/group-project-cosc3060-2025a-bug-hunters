const router = require("express").Router();
const multer = require("multer");

router.get("/instructorUpload", (req, res) => {
    res.render("instrucPage"); // ← this is key
});

module.exports = router;
