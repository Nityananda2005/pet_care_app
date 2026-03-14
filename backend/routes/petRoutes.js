const express = require("express");
const { addPet, getMyPets, getPetById, updatePet, deletePet, getHealthCard, searchPet } = require("../controllers/petController");
const { protect } = require("../middleware/authMiddleware")

const router = express.Router();

router.get("/search", protect, searchPet); // For Vets/Admins
router.post("/add", protect, addPet);
router.get("/my-pets", protect, getMyPets);
router.get("/:id", protect, getPetById);
router.put("/:id", protect, updatePet);
router.delete("/:id", protect, deletePet);
router.get("/:id/health-card", protect, getHealthCard);

module.exports = router;