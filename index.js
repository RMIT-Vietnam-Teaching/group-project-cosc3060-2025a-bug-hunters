// index.js
const express = require("express");
const http = require("http");
const chalk = require("chalk");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const Message = require("./models/Message");

const path = require("path");

const connectDB = require("./utils/db");
const {
  sessionMiddleware,
  setUserFromCookie,
} = require("./middlewares/setUser");

const { port } = require("./configs/keys");
const passport = require("passport");
const socketUtils = require("./utils/socket"); // Import socketUtils

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

app.use((req, res, next) => {
    res.locals.cartCount = req.session.cart ? req.session.cart.length : 0;
    next();
  });

// Set up Mongo DB connection
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const userSettingsRoutes = require("./routes/userSettingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const forumRoutes = require("./routes/forumRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const institution = require("./routes/institutionRoutes");
const searchRoutes = require("./routes/searchRoutes");

// const coinPaymentRoutes = require("./routes/coinPayment");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
// const coinPaymentRoutes = require("./routes/coinPayment");
const sitemapRoutes = require("./routes/sitemapRoutes");
const aboutUsRoutes = require("./routes/aboutUsRoutes");

// Use Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/forum", forumRoutes);
app.use("/userSettings", userSettingsRoutes);
app.use("/userProfile", userProfileRoutes);
app.use("/courses", courseRoutes);
app.use("/search", searchRoutes);
app.use("/about-us", aboutUsRoutes);
app.use("/user", userRoutes);
app.use("/api", subscriptionRoutes);
app.use("/", chatRoutes);
app.use("/contact", contactRoutes);


  

// app.use("/payment", coinPaymentRoutes);
app.use("/sitemap", sitemapRoutes);

// Create HTTP server with Express app
const server = http.createServer(app);

// Initialize Socket.io
const io = socketUtils.init(server);

// Make io accessible in controllers
app.set("io", io);

// Socket.io connection
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
    });

    socket.on('sendMessage', async ({ senderId, recipientId, text, attachment }) => {
        try {
            console.log("Received message with attachment:", attachment);

            const message = new Message({
                sender: senderId,
                recipient: recipientId,
                text,
                attachment: attachment || null  
            });

            await message.save();

            io.to(recipientId).emit("receiveMessage", {
                senderId,
                text,
                attachment: attachment || null,
                timestamp: message.timestamp
            });

            console.log("Message sent to recipient with attachment:", attachment);
        } catch (err) {
            console.error("Error saving/sending message:", err);
            socket.emit("messageError", "Failed to save message");
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Start server
server.listen(port, () => {
    console.log(chalk.green(`Server is running on http://localhost:${port}`));
});
