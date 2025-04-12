// const mongoose = require("mongoose");


// const userSchema = new mongoose.Schema({
//   userFirstName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   userLastName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   userEmail: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   userPassword: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(password) {
//         // Must be at least 8 characters and match at least two criteria
//         const criteria = [
//           /.{8,}/.test(password),                      // Min 8 chars
//           /[a-z]/.test(password) && /[A-Z]/.test(password),  // Upper and lower
//           /[a-zA-Z]/.test(password) && /\d/.test(password),  // Letters and numbers
//           /[!@#?\]]/.test(password)                    // Special character
//         ];
//         // At least 2 of the 4 criteria must be true
//         return criteria.filter(Boolean).length >= 2;
//       },
//       message:
//         "Password must meet at least 2 of the following: minimum 8 characters, a mix of uppercase and lowercase, a mix of letters and numbers, at least one special character (! @ # ? ])."
//     }
//   },
//   userRole: {
//     type: String,
//     enum: ['Student', 'Instructor'],
//     required: true
//   },
//   isBot: {
//     type: Boolean,
//     default: true
//   },

//   passwordHistory: {
//     type: [String],
//     default: []
//     }

// });

// module.exports = mongoose.model("User", userSchema);
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