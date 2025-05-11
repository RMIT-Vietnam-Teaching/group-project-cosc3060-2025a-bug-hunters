const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    studentsEnrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        enum: ["Not Started", "On Going", "Finished"],
        default: "Not Started",
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    image: {
        type: String,
        default: "images/defaultCourse.png",
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    category: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
    
});

module.exports = mongoose.model("Course", courseSchema);
