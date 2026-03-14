const express = require("express");
const {
  reportLostPet,
  getLostPets,
  reportFoundPet,
  getFoundPets
} = require("../controllers/lostPetController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/report", protect, reportLostPet);
router.get("/", getLostPets);

router.post("/found", protect, reportFoundPet);
router.get("/found", getFoundPets);

module.exports = router;
