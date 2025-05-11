const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {             
    type: String,
    required: true
  },
  price: {                   
    type: Number,
    required: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  students: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: 'images/defaultCourse.png'
  }
});



module.exports = mongoose.model('Course', courseSchema);