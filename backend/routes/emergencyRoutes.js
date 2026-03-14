const express = require("express");
const { getNearbyVets } = require("../controllers/emergencyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/nearby-vets", protect, getNearbyVets);

module.exports = router;
