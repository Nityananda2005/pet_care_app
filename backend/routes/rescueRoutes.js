const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { reportRescue, getRescues, updateRescueStatus } = require("../controllers/rescueController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/report", upload.single("image"), reportRescue);
router.get("/", protect, getRescues);
router.patch("/:id/status", protect, updateRescueStatus);

module.exports = router;
