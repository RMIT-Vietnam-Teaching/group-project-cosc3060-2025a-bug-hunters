const router = require("express").Router();

// Server-side rendering
router.get("/", (req, res) => {
    res.render("authentication");
});

router.get("/register", (req, res) => {
    res.json({ message: "Register page" });
});

router.post("/login", (req, res) => {
    // Handle login logic here
    const { username, password } = req.body;
    // Validate credentials and set session or token
    console.log("Login attempt:", username, password);
});

module.exports = router;
