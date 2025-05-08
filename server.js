const http = require("http");
const { Server } = require("socket.io");
const chalk = require("chalk");
const app = require("./index");
const { port } = require("./configs/keys");
const socketUtils = require("./utils/socket");
const Message = require("./models/Message");
const path = require("path");
const fs = require("fs");

const server = http.createServer(app);
const io = socketUtils.init(server);

app.set("io", io); // Make io accessible in controllers if needed

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
        
        // Make sure we're sending the attachment URL correctly
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


server.listen(port, () => {
    console.log(chalk.green(`Server running on port ${port}`));
});


