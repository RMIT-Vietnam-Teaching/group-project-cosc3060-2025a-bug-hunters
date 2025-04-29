const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {getCourses,uploadCourse,updateCourse,deleteCourse} = require('../controllers/CourseController');



//Render and Get Course
router.get('/instructor',getCourses);

//Upload Course
router.post('/submit-course', upload.array('courseMaterials'),uploadCourse);

//Edit course
router.post('/edit-course/:id', upload.array('courseMaterials'),updateCourse);

//Delete course
router.post('/delete-course/:id', deleteCourse);

module.exports = router;