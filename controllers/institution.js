const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


exports.renderCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    console.log("Courses fetched:", courses); 
    res.render("institutionCourses", { courses });
  } catch (error) {
    console.error("Error creating or fetching courses:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.renderCourseDetail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send("Course not found");
    res.render("institutionViewCourse", { course }); 
  } catch (err) {
    console.error("Error fetching course detail:", err);
    res.status(500).send("Internal Server Error");
  }
};
exports.renderEditCoursePage = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const returnTo = req.query.returnTo || '/institution/manageCourses';

    res.render('institutionEditCourse', { course, returnTo });
  } catch (error) {
    console.error("Error rendering course edit page:", error);
    res.status(500).send("Failed to load course edit page.");
  }
};

exports.renderTutors = async (req, res) => {
  try {
      const user = await User.find({ role: "Instructor" });
      res.render("institutionTutor", { user });
  }
  catch (error) {
      console.error("Error fetching tutors:", error);
      res.status(500).send("Internal Server Error");
}};

exports.renderTutorDetail = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findById(id);
      const courses = await Course.find({ author: id }).lean();
      if (!user) {
          return res.status(404).send("Tutor not found");
      }
      res.render("institutionTutorDetail", { user, courses });
  }
  catch (error) {
      console.error("Error fetching tutor details:", error);
      res.status(500).send("Internal Server Error");
}};

exports.renderAddTutorForm = (req, res) => {
  res.render("institutionAddTutor");
};

exports.renderCourseFeedbackPage = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render("institutionCourseFeedback", { course });
};

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const returnTo = req.query.returnTo || '/institution/manageCourses';

    const { title, description, price, duration, startDate, endDate } = req.body;

    await Course.findByIdAndUpdate(id, {
      name: title,
      description,
      price,
      duration,
      startDate,
      endDate
    });

    res.redirect(returnTo);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).send("Error updating course");
  }
};

exports.deleteCourseFromManageCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) return res.status(404).send("Course not found");
    res.redirect("/institution/manageCourses");
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteCourseFromInstitution = async (req, res) => {
  try {
    console.log("DELETE request received for course:", req.params.id);

    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      console.log("Course not found");
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTutorFromInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting tutor with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid tutor ID" });
    }

    const deletedTutor = await User.findByIdAndDelete(id);
    if (!deletedTutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    res.redirect("/institution/manageTutors");
  } catch (error) {
    console.error("Error deleting tutor:", error.message, error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.createTutor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, headline, description } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send("Missing required fields");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      headline,
      description,
      role: "Instructor",
      cardPaymentInfo: {
        cardNumber: "0000000000000000",
        cardHolderName: "N/A",
        expirationDate: "01/30",
        cvv: "000",
      }
    });

    res.redirect("/institution/manageTutors");
  } catch (err) {
    console.error("Error creating tutor:", err);
    res.status(500).send("Internal Server Error");
  }
};
