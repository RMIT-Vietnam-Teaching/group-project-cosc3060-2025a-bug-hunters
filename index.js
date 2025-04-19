const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");




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


//Set up a session 
app.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));

app.use((req, res, next) => {
    console.log("res.locals.user set to:", req.session.user);
    res.locals.user = req.session.user || null;
    next();
});




// Set up Mongo DB connection
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");



app.use("/", homeRoutes);
app.use("/auth", authRoutes);





app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});

