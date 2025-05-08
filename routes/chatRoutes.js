const express = require("express");
const router = express.Router();
const upload = require('../middlewares/MessageUpload');
const Message = require('../models/Message');
const {
  renderChatPage,
  getMessages,
  sendMessage,
  deleteChat
} = require("../controllers/MessageControllers");

router.get("/messages", renderChatPage);
router.get("/message/:userId", getMessages);
router.post("/message", sendMessage);
router.delete("/chat/:contactId", deleteChat);


module.exports = router;


