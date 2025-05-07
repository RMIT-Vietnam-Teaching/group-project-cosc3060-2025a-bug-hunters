const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
    try {
        const userId = req.signedCookies.userId;
        let user = null;

        if (userId) {
            user = await User.findById(userId).lean();
        }

router.get("/", (req, res) => {
  const mockCourses = [
    {
      title: "Intro to Web Dev",
      instructor: "John Doe",
      description: "Learn HTML, CSS, and JavaScript.",
      duration: "3h",
      image: "images/course1.jpg",
      rating: 4.8,
    },
    {
      title: "Advanced JS",
      instructor: "Jane Smith",
      description: "Deep dive into JavaScript ES6+",
      duration: "2.5h",
      image: "images/course2.jpg",
      rating: 4.9,
    },
    // add more if needed
  ];

  res.render("homepage", { newCourses: mockCourses });
});


module.exports = router;
