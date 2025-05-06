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
} = require("../controllers/institution");

router.get("/manageCourses", renderCourses);
router.get("/viewCourse/:id", renderCourseDetail);
router.post("/deletCourses/:id", deleteCourseFromManageCourse);
router.get("/editCourse/:id", renderEditCoursePage);
router.post('/editCourse/:id', updateCourse); 

router.get("/manageTutors", renderTutors);
router.get("/tutorDetail/:id", renderTutorDetail);
router.post("/deleteInstitutionCourses/:id", deleteCourseFromInstitution);
router.post("/deleteInstitutionTutor/:id", deleteTutorFromInstitution);



module.exports = router;