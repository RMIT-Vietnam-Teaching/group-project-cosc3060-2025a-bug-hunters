const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");

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
