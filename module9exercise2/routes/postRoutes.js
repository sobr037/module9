const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController"); 

// Create a new post
router.post('/create', (req, res) => {
  postController.createPost(req.body, res);
});

// Like a post
router.post('/:postId/like/:userId', (req, res) => {
  const { postId, userId } = req.params;
  postController.likePost({ params: { postId, userId } }, res);
});

// Comment on a post
router.post('/:postId/comment', (req, res) => {
  const { postId } = req.params;
  postController.commentOnPost({ params: { postId }, body: req.body }, res);
});

// Get all posts
    router.get("/", (req, res) => {
        postController.getAllPosts(res);
    });

module.exports = router;
