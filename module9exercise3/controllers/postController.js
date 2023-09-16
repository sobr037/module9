const sequelize = require('../dbConnect').Sequelize;
const { DataTypes } = require('sequelize');

const User = require('../models/user');
const Post = require('../models/post');


const createPost = async (data, res) => {
  try {
    const post = await Post.create(data);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const likePost = async (req, res) => {
  const { postId, userId } = req.params;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.addUser(userId, { through: 'likes' });
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const commentOnPost = async (req, res) => {
  const { postId } = req.params;
  const { text, authorId } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = {
      text,
      userId: authorId,
    };


    const Comment = sequelize.define('Comment', {
      text: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    });

    const newComment = await Comment.create(comment);
    await post.addComment(newComment);

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllPosts = async (res) => {
  try {
    const posts = await Post.findAll({
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPost, likePost, commentOnPost, getAllPosts };
