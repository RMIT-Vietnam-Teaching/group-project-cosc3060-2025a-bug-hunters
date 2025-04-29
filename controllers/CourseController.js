const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');



// Create Course
exports.uploadCourse = async (req, res) => {
    try {
        const { title, category, enrollments, rating, reviewCount } = req.body;
        const files = req.files.map(file => file.filename); 

        const newCourse = new Course({
            title,
            category,
            enrollments,
            rating,
            reviewCount,
            files,  
            updatedAt: Date.now()
        });

        await newCourse.save();
        res.redirect('/instructor'); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Course upload failed.");
    }
};


// Get all the courses 
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();      
        res.render('instrucPage', { courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load courses');
    }
};


// Update courses 
exports.updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, category, enrollments, rating, reviewCount } = req.body;
  
      console.log("updateCourse called with id:", id);
      console.log("Request body:", req.body);
  
      // If new files uploaded, use them; otherwise keep old ones
      let updatedFields = {
        title,
        category,
        enrollments,
        rating,
        reviewCount,
        updatedAt: Date.now()
      };
  
      if (req.files && req.files.length > 0) {
        updatedFields.files = req.files.map(file => file.filename);
      }
  
      await Course.findByIdAndUpdate(id, updatedFields);
  
      res.redirect('/instructor');  
    } catch (err) {
      console.error('Failed to update course:', err);
      res.status(500).send('Failed to update course');
    }
  };
  

// Delete courses 
exports.deleteCourse = async (req, res) => {
  try {
      console.log('Trying to delete course with ID:', req.params.id);
      const course = await Course.findById(req.params.id);
      
      if (!course) {
          console.log('Course not found.');
          return res.status(404).send('Course not found');
      }

      // Safely try deleting each file
      course.files.forEach(file => {
          const filePath = path.join(__dirname, '..', 'uploads', file);
          try {
              fs.unlinkSync(filePath);
              console.log('Deleted file:', filePath);
          } catch (fileErr) {
              console.error('Error deleting file:', filePath, fileErr.message);
          }
      });

      await Course.findByIdAndDelete(req.params.id);
      console.log('Course deleted from DB');
      res.redirect('/instructor');

  } catch (err) {
      console.error('Error deleting course:', err);
      res.status(500).send('Failed to delete course');
  }
};