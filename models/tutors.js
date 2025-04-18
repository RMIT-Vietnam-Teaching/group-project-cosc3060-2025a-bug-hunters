const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
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
    imageUrl: {
        type: String,
        default: 'images/defaultTutor.png'
    },
    field: {
        type: [ String ],
        required: true,
        trim: true
    },
    });

    mongoose.model('Tutor', tutorSchema);