const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["Student", "Instructor", "Institution", "Admin"],
        required: true,
        default: "Student",
    },

    headline: {
        type: String,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },

    avatar: {
        type: String, // URL to avatar image (e.g., Cloudinary or local path)
        default:
            "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg",
    },

    dateJoined: {
        type: Date,
        default: Date.now,
    },
    headline: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    coin: {
        type: Number,
        default: 0,
    },
    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
    },
    SearchingHistory: [String],
    cardPaymentInfo: {
        cardNumber: {
            type: String,
            required: true,
        },
        cardHolderName: {
            type: String,
            required: true,
        },
        expirationDate: {
            type: String,
            required: true,
        },
        cvv: {
            type: String,
            required: true,
        },
    },
});

module.exports = mongoose.model("User", userSchema);