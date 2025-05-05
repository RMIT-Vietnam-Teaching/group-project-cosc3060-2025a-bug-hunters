const Course = require("../models/Course");
const User = require("../models/User");


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
    if (!course) return res.status(404).send("Course not found");
    res.render("institutionEditCourse", { course }); 
  } catch (err) {
    res.status(500).send("Error loading course");
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, price, duration, startDate, endDate } = req.body;

    await Course.findByIdAndUpdate(req.params.id, {
      name: title,
      description,
      price,
      duration,
      startDate,
      endDate
    });

    res.redirect("/institution/manageCourses");
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
        const courses = await Course.find({ author: id });
        if (!user) {
            return res.status(404).send("Tutor not found");
        }
        res.render("institutionTutorDetail", { user, courses });
    }
    catch (error) {
        console.error("Error fetching tutor details:", error);
        res.status(500).send("Internal Server Error");
}};


exports.deleteCourseFromInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) return res.status(404).send("Course not found");
    res.redirect("/institutionTutorDetail");
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).send("Internal Server Error");
  }
};

