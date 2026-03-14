const Post = require("../models/postModel");

exports.createPost = async (req, res) => {

  try {

    const { content, image } = req.body;

    const post = await Post.create({
      user: req.user.id,
      content,
      image
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      posts
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.toggleLike = async (req, res) => {
  try {

    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const userId = req.user.id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {

      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );

    } else {

      // Like
      post.likes.push(userId);

    }

    await post.save();

    res.json({
      success: true,
      likesCount: post.likes.length
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.deletePost = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    // Check if the logged-in user is the post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this post"
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};