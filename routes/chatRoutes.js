const express = require("express");
const router = express.Router();
const upload = require('../middlewares/MessageUpload');
const {
  renderChatPage,
  getMessages,
  sendMessage,
  deleteMessage
} = require("../controllers/MessageControllers");

router.get("/messages", renderChatPage);
router.get("/message/:userId", getMessages);
router.post("/message", sendMessage);
router.delete("/message/:id",deleteMessage);


router.post("/uploads", upload.single("file"), (req, res) => {
  console.log('Uploaded file:', req.file);
  
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Define the fileUrl variable
  const fileUrl = `/uploads/${req.file.filename}`;
  
  // Send only one response
  return res.status(200).json({
    message: 'File uploaded successfully',
    fileUrl: fileUrl
  });
});

module.exports = router;


