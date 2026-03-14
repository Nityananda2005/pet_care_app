const Comment = require("../models/commentModel");

exports.addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const comment = await Comment.create({
      post: postId,
      user: req.user.id,
      text
    });
    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      comments
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};