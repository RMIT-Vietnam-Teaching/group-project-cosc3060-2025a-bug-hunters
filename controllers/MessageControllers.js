const Message = require('../models/Message');
const User = require("../models/User");

exports.renderChatPage = async (req, res) => {
    const currentUserId = req.user?._id;

    if (!currentUserId) {
        return res.status(401).json({ redirect: "/auth/login" });
    }

    const currentUser = await User.findById(currentUserId).populate('following', 'email');
    const rawContacts = currentUser.following;

    const contactId = req.query.contactId;

    let selectedContact = null;
    let messages = [];

    const contacts = await Promise.all(
        rawContacts.map(async (contact) => {
            const lastMsg = await Message.findOne({
                $or: [
                    { sender: currentUserId, recipient: contact._id },
                    { sender: contact._id, recipient: currentUserId }
                ]
            }).sort({ createdAt: -1 });

            return {
                ...contact.toObject(),
                lastMessage: lastMsg 
                ? (lastMsg.text || (lastMsg.attachment ? `Sent a file: ${lastMsg.attachment.split('/').pop()}` : null)) 
                : null,
            lastMessageTime: lastMsg ? lastMsg.createdAt : new Date(0)
            };
        })
    );

    // Sort contacts by latest message time (descending)
    contacts.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    if (contactId) {
        selectedContact = await User.findById(contactId);
        messages = await Message.find({
            $or: [
                { sender: currentUserId, recipient: contactId },
                { sender: contactId, recipient: currentUserId }
            ]
        }).sort({ createdAt: 1 });
    }

    res.render('message', {
        contacts,
        selectedContact,
        messages,
        currentUserId
    });
};

exports.getMessages = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.signedCookies.userId;

    try {
        const messages = await Message.find({
            $or: [
                { sender: currentUserId, recipient: userId },
                { sender: userId, recipient: currentUserId }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

exports.sendMessage = async (req, res) => {
    const { recipientId, text } = req.body;
    const senderId = req.signedCookies.userId;

    let attachmentUrl = null;
    if (req.file) {
        attachmentUrl = `/uploads/${req.file.filename}`;
    }

    try {
        const message = new Message({
            sender: senderId,
            recipient: recipientId,
            text: text,
            attachment: attachmentUrl
        });

        await message.save();
        res.status(200).json(message);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send message" });
    }
};


exports.deleteMessage = async (req, res) => {
    const messageId = req.params.id;
    const currentUserId = req.signedCookies.userId;

    try {
        const message = await Message.findById(messageId);


        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        // Only allow sender to delete their message
        if (message.sender.toString() !== currentUserId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await Message.findByIdAndDelete(messageId);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete message" });
    }
};
