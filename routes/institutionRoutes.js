const router = require("express").Router();

const {
  renderCourses,
  renderCourseDetail,
  renderEditCoursePage,
  updateCourse,
  deleteCourseFromManageCourse,
  renderTutors,
  renderTutorDetail,
  deleteCourseFromInstitution,
  deleteTutorFromInstitution,
  renderAddTutorForm,
  createTutor,
  renderCourseFeedbackPage,
  addStudentToCourse,
  removeStudentFromCourse,
  createCourse,
  addCourseForTutor,
  uploadCourseImage,
} = require("../controllers/institution");

router.get("/manageCourses", renderCourses);
router.get("/viewCourse/:id", renderCourseDetail);
router.get("/editCourse/:id", renderEditCoursePage);
router.get("/courseFeedback/:id", renderCourseFeedbackPage);
router.post("/createCourse", createCourse);
router.post("/deletCourses/:id", deleteCourseFromManageCourse);
router.post("/editCourse/:id", uploadCourseImage, updateCourse);
router.post("/addStudentToCourse/:courseId", addStudentToCourse);
router.post("/removeStudentFromCourse/:courseId", removeStudentFromCourse);



router.get("/manageTutors", renderTutors);
router.get("/addTutor", renderAddTutorForm);
router.get("/tutorDetail/:id", renderTutorDetail);
router.post("/addTutor", createTutor);
router.post("/deleteCourse/:id", deleteCourseFromInstitution);
router.post('/addCourse', addCourseForTutor);
// router.post("/deleteInstitutionTutor/:id", deleteTutorFromInstitution);



module.exports = router;