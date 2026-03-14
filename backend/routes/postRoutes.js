const express = require("express");
const {
  createPost,
  getPosts,
  toggleLike,
  deletePost
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createPost);

router.get("/", getPosts);

router.put("/like/:id", protect, toggleLike);

router.delete("/:id", protect, deletePost);

module.exports = router;
