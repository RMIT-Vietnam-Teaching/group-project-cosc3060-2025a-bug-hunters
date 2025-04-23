const Post = require("../../models/Post");

const posts = [
    {
        id: "p1",
        author: "John Doe",
        time: "15:00",
        content:
            "Exploring the new features of our platform! Excited to share this with you all.",
        media: "https://via.placeholder.com/400x200",
        likes: 10000,
        commentsCount: 99000,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Alice Nguyen",
                text: "This looks amazing!",
            },
        ],
    },
    {
        id: "p2",
        author: "Jane Smith",
        time: "10:30",
        content:
            "Just finished a new tutorial, hope it helps everyone to get started!",
        media: "https://via.placeholder.com/400x200",
        likes: 2500,
        commentsCount: 4500,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Brian Tran",
                text: "Thanks for sharing!",
            },
        ],
    },
    {
        id: "p3",
        author: "Emily Le",
        time: "18:45",
        content: "Teamwork makes the dream work! 🚀",
        media: "https://via.placeholder.com/400x200",
        likes: 7800,
        commentsCount: 3200,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Grace Pham",
                text: "Absolutely agree!",
            },
        ],
    },
];

exports.renderPost = async (req, res) => {
    // TODO: Fetch posts from the database
    res.render("adminPost", { posts, activePage: "posts" });
};

exports.achievePost = async (req, res) => {
    // TODO achieve post here
};

exports.deletePost = async (req, res) => {
    // TODO delete post here
};
