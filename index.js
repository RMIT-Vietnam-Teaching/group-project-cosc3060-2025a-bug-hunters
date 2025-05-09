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

// Set up Mongo DB connection
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
// const { session } = require("passport");
const cartRoutes = require('./routes/cartRoutes'); 
const paymentRoutes = require('./routes/paymentRoutes');
// const coinPayment = require("./routes/coinPayment");

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
  }));

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/settings", settingsRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
// app.use("/checkout", coinPayment);



// app.use("/user", userRoutes);







app.use('/navbar', (req,res) => {
    res.render('partials/navbar');
});


app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});


