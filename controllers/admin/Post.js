const Post = require("../../models/Post");

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
