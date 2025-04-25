const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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

//Set up a session
// app.use(
//     session({
//         secret: "yourSecretKey",
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: false },
//     })
// );

// app.use(async (req, res, next) => {
//     const userId = req.cookies.userId;

//     if (userId) {
//         try {
//             const user = await User.findById(userId).lean();
//             res.locals.user = user; // this makes <%= user %> work in views
//         } catch (err) {
//             console.error("Failed to fetch user from cookie:", err);
//             res.locals.user = null;
//         }
//     } else {
//         res.locals.user = null;
//     }

//     next();
// });

// Set up Mongo DB connection
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const forumRoutes = require("./routes/forumRoutes");

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/forum", forumRoutes);

app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});
