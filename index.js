const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
<<<<<<< HEAD
const cookieParser = require("cookie-parser");
const User = require("./models/User"); 
const connectDB = require("./utils/db");
const { sessionMiddleware, setUserFromCookie } = require("./middlewares/setUser");

const { port } = require("./configs/keys");


dotenv.config();

//set up view engine
=======
const passport = require("passport");
const connectDB = require("./utils/db");
const { port } = require("./configs/keys");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Set up view engine
>>>>>>> testing-branch
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

// Set up Mongo DB connection
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
const userSettingsRoutes = require("./routes/userSetting");
const adminRoutes = require("./routes/adminRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const institution = require("./routes/institutionRoutes");


// const coinPaymentRoutes = require("./routes/coinPayment");
const courseRoutes = require("./routes/courseRoutes");

// Use Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/userSettings", userSettingsRoutes);
app.use("/userProfile", userProfileRoutes);
app.use("/courses", courseRoutes);
// app.use("/institution", institution);
// app.use("/payment", coinPaymentRoutes);
app.use('/navbar', (req,res) => {
    res.render('partials/navbar');
});
app.get("/set-test-cookie", (req, res) => {
  res.cookie("userId", "681affba12f498fff96735e7", {
    httpOnly: true,
    signed: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24
  });
  res.send("Signed test cookie set.");
});


// Start Server
app.listen(port, () => {
  console.log(chalk.green(`Server is running on http://localhost:${port}`));
});
