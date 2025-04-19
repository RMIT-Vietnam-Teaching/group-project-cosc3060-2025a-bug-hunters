const router = require("express").Router();

router.get("/instructorUpload", (req, res) => {
    res.render("instrucPage"); 
});

module.exports = router;