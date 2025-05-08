const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to explore users and see who to follow
router.get('/explore', async (req, res) => {
    if (!req.user) return res.redirect('/auth/login');

    const currentUser = await User.findById(req.user._id);
    const users = await User.find({ _id: { $ne: req.user._id } });

    const userList = users.map(user => ({
        _id: user._id,
        email: user.email,
        isFollowing: currentUser.following.includes(user._id)
    }));

    res.render('explore_test_only', {
        userList,
        currentUser
    });
});

// Route to follow a user
router.post('/follow/:contactId', async (req, res) => {
    const currentUserId = req.user._id;
    const contactId = req.params.contactId;

    try {
        const currentUser = await User.findById(currentUserId);
        const contact = await User.findById(contactId);

        // Check if already following
        if (currentUser.following.includes(contactId)) {
            return res.status(400).json({ message: 'Already following this user', following: true });
        }

        // Add contact to following list
        currentUser.following.push(contactId);
        await currentUser.save();

        // Add currentUser to contact's followers list
        contact.followers.push(currentUserId);
        await contact.save();

        res.json({ message: 'Followed successfully!', following: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


// Route to unfollow a user (optional)
router.post('/unfollow/:contactId', async (req, res) => {
    const currentUserId = req.user._id;
    const contactId = req.params.contactId;

    try {
        const currentUser = await User.findById(currentUserId);
        const contact = await User.findById(contactId);

        // Check if already not following
        if (!currentUser.following.includes(contactId)) {
            return res.status(400).json({ message: 'You are not following this user', following: false });
        }

        // Remove contact from following list
        currentUser.following = currentUser.following.filter(id => id.toString() !== contactId);
        await currentUser.save();

        // Remove currentUser from contact's followers list
        contact.followers = contact.followers.filter(id => id.toString() !== currentUserId);
        await contact.save();

        res.json({ message: 'Unfollowed successfully!', following: false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
