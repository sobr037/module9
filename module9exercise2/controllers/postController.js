const Models = require("../models/post");
const User = require("../models/user");

// Create a new post
    const createPost = (data, res) => {
        new Models(data) // Use Models directly without .Post
        .save()
        .then((post) => res.send({ result: 200, data: post }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
    };

// Like a post
    const likePost = (req, res) => {
        const { postId, userId } = req.params;
    
        Models.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
        )
        .then((post) => res.send({ result: 200, data: post }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
    };
  
  // Comment on a post
    const commentOnPost = (req, res) => {
        const { postId } = req.params;
        const { text, authorId } = req.body;
    
        const comment = { text, author: authorId };
    
        Models.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
        )
        .then((post) => res.send({ result: 200, data: post }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
    };

// Get all posts
    const getAllPosts = (res) => {
        Models.find({})
        .then((posts) => res.send({ result: 200, data: posts }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
    };

module.exports = { createPost, likePost, commentOnPost, getAllPosts };
