const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    theme: {
        type: String,
        default: 'light',
    },
    picture: {
        type: String,
        default: 'images/defaultAvatar.png',
    },
    role: {
        user: {
            type: String,
            default: 'Student',
        },
    },
    headline: {
        type: String,
    },
    about: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

    module.exports = mongoose.model('User', user);