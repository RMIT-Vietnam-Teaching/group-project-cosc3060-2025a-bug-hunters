const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/User"); 
const connectDB = require("./utils/db");

const { port } = require("./configs/keys");


dotenv.config();

//set up view engine
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Middleware to set user from cookie
const { sessionMiddleware, setUserFromCookie } = require("./middlewares/setUser");

app.use(sessionMiddleware);
app.use(setUserFromCookie);

// Set up Mongo DB connection
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const userSettingsRoutes = require("./routes/userSetting");
const adminRoutes = require("./routes/adminRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const institution = require("./routes/institutionRoutes");


// const coinPaymentRoutes = require("./routes/coinPayment");

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/userSettings", userSettingsRoutes);
app.use("/userProfile", userProfileRoutes);
// app.use("/institution", institution);
// app.use("/payment", coinPaymentRoutes);
app.use('/navbar', (req,res) => {
    res.render('partials/navbar');
});

app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});
