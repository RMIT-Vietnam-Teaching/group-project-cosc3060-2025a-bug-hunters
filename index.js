const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const path = require("path");

const connectDB = require("./utils/db");

const { port } = require("./configs/keys");

dotenv.config();

const app = express();

//set up view engine
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.use(async (req, res, next) => {
    const userId = req.signedCookies.userId;

    if (userId) {
        try {
            const user = await User.findById(userId).lean();
            req.user = user;
            res.locals.user = user; // makes <%= user %> work in views
        } catch (err) {
            console.error("Error loading user from cookie:", err);
            req.user = null;
            res.locals.user = null;
        }
    } else {
        req.user = null;
        res.locals.user = null;
    }

    next();
});

// Set up Mongo DB connection
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require('./routes/user_test_purpose');
const uploadRoutes = require('./routes/uploadRoutes');

// Use the upload route
app.use("/uploads", uploadRoutes);
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/", chatRoutes);
app.use('/user', userRoutes);

 
module.exports = app;
