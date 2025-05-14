const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

const app = express();
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const path = require("path");

const connectDB = require("./utils/db");
const {
    sessionMiddleware,
    setUserFromCookie,
} = require("./middlewares/setUser");
const cartCountMiddleware = require("./middlewares/cart");

const { port } = require("./configs/keys");
const passport = require("passport");

dotenv.config();

// Set up view engine
app.set("view engine", "ejs");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to set user from cookie
app.use(sessionMiddleware);
app.use(setUserFromCookie);
app.use(cartCountMiddleware);

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB

// app.use(async (req, res, next) => {
//     const userId = req.signedCookies.userId;

//     if (userId) {
//         try {
//             const user = await User.findById(userId).lean();
//             req.user = user;
//             res.locals.user = user;
//         } catch (err) {
//             console.error("Error loading user from cookie:", err);
//             req.user = null;
//             res.locals.user = null;
//         }
//     } else {
//         req.user = null;
//         res.locals.user = null;
//     }

//     next();
// });

// Set up Mongo DB connection
connectDB();

// Import Routes
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const userSettingsRoutes = require("./routes/userSettingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const forumRoutes = require("./routes/forumRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const institutionRoutes = require("./routes/institutionRoutes");
const searchRoutes = require("./routes/searchRoutes");
const aboutUsRoutes = require("./routes/aboutUsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const chatRoutes = require("./routes/chatRoutes");
// const userRoutes = require("./routes/user_test_purpose");
const uploadRoutes = require("./routes/uploadRoutes");

// const coinPaymentRoutes = require("./routes/coinPayment");
const sitemapRoutes = require("./routes/sitemapRoutes");

// Use Routes

// Use the upload route
app.use("/", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/uploads", uploadRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/userSettings", userSettingsRoutes);
app.use("/userProfile", userProfileRoutes);
app.use("/courses", courseRoutes);
app.use("/institution", institutionRoutes);
app.use("/forum", forumRoutes);
app.use("/search", searchRoutes);
app.use("/about-us", aboutUsRoutes);
app.use("/user", userRoutes);
app.use("/api", subscriptionRoutes);
app.use("/", chatRoutes);
// app.use("/payment", coinPaymentRoutes);
app.use("/sitemap", sitemapRoutes);

// app.use("/institution", institution);

// Start Server
app.listen(port, () => {
    console.log(chalk.green(`Server is running on http://localhost:${port}`));
});

module.exports = app;
