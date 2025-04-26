const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./utils/db");
const { port } = require("./configs/keys");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Set up view engine
app.set("view engine", "ejs");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up session
app.use(
  session({
    secret: "yourSecretKey", // ideally store this in .env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production with HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Make session user available in all views
app.use((req, res, next) => {
  console.log("res.locals.user set to:", req.session.user);
  res.locals.user = req.session.user || null;
  next();
});

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Use Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/courses", courseRoutes);

// Start Server
app.listen(port, () => {
  console.log(chalk.green(`Server is running on http://localhost:${port}`));
});
