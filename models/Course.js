
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    category: {
        type: String,
        enum: ['Development', 'Design', 'Marketing', 'Business', 'CyberSecurity'], //Sample this can be replaced by any type 
        required: true
      },
    enrollments: Number,
    rating: Number,
    reviewCount: Number,
    image: String,
    files: {
        type: [String],
        default: []  
    },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);