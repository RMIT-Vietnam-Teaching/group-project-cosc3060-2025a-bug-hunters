const express = require("express");
const path = require('path');
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./utils/db");
const { port } = require("./configs/keys");

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


connectDB();

const instructRoutes = require("./routes/instructRoutes");

app.use("/", instructRoutes);

app.listen(port, () => {
    console.log(chalk.green(`Server is running on port ${port}`));
});
