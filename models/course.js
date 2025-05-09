// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     instructor: {
//         type: String,
//         required: true,
//     },
//     imageUrl: {
//         type: String,
//         default: "images/course-placeholder.jpg",
//     },
//     category: {
//         type: String,
//         required: true,
//         enum: [
//             "Web Development",
//             "Data Science",
//             "Design",
//             "Marketing",
//             "Cybersecurity",
//             "Business",
//         ],
//     },
//     duration: {
//         type: String,
//         required: true,
//     },
//     rating: {
//         type: Number,
//         default: 0,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;
