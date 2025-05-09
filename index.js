const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const connectDB = require("./utils/db");
const {
    sessionMiddleware,
    setUserFromCookie,
} = require("./middlewares/setUser");

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

// Middleware to set user from cookie
app.use(sessionMiddleware);
app.use(setUserFromCookie);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const userSettingsRoutes = require("./routes/userSetting");
const adminRoutes = require("./routes/adminRoutes");
const forumRoutes = require("./routes/forumRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const institution = require("./routes/institutionRoutes");
const searchRoutes = require("./routes/searchRoutes");

// const coinPaymentRoutes = require("./routes/coinPayment");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

// Use Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/forum", forumRoutes);
app.use("/userSettings", userSettingsRoutes);
app.use("/userProfile", userProfileRoutes);
app.use("/courses", courseRoutes);
app.use("/search", searchRoutes);

// app.use("/institution", institution);
// app.use("/payment", coinPaymentRoutes);

app.use("/user", userRoutes);
app.use("/api", subscriptionRoutes);

// Start Server
app.listen(port, () => {
    console.log(chalk.green(`Server is running on http://localhost:${port}`));
});
