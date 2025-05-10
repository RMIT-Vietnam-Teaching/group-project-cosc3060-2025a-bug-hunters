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
  createCourse
} = require("../controllers/institution");

router.get("/manageCourses", renderCourses);
router.get("/viewCourse/:id", renderCourseDetail);
router.post("/createCourse", createCourse);
router.post("/deletCourses/:id", deleteCourseFromManageCourse);
router.get("/editCourse/:id", renderEditCoursePage);
router.post('/editCourse/:id', updateCourse); 
router.post("/addStudentToCourse/:courseId", addStudentToCourse);
router.post("/removeStudentFromCourse/:courseId", removeStudentFromCourse);


router.get("/manageTutors", renderTutors);
router.get("/tutorDetail/:id", renderTutorDetail);
router.post("/deleteInstitutionCourses/:id", deleteCourseFromInstitution);
// router.post("/deleteInstitutionTutor/:id", deleteTutorFromInstitution);

router.get("/addTutor", renderAddTutorForm);
router.post("/addTutor", createTutor);
router.get("/courseFeedback/:id", renderCourseFeedbackPage);


module.exports = router;