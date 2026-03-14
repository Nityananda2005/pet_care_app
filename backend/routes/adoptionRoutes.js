const express = require("express");
const { addAdoption, getAdoption, getAdoptionById, updateAdoption, createAdoptionRequest, getAdoptionRequest, getAdoptionRequestById, getShelterAdoptionRequests, updateAdoptionRequestStatus, getShelterStats, getMyShelterPets, deleteAdoption } = require("../controllers/adoptionController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/add", protect, upload.single('image'), addAdoption);
router.get("/", protect, getAdoption);

// Specific paths first
router.get("/my-pets", protect, getMyShelterPets);
router.get("/my-requests", protect, getShelterAdoptionRequests);
router.get("/shelter-stats", protect, getShelterStats);
router.get("/request", protect, getAdoptionRequest);
router.post("/request", protect, createAdoptionRequest);
router.get("/request/:id", protect, getAdoptionRequestById);

// Dynamic parameters last
router.get("/:id", protect, getAdoptionById);
router.put("/:id", protect, upload.single('image'), updateAdoption);

router.delete("/:id", protect, deleteAdoption);
router.put("/request-status/:id", protect, updateAdoptionRequestStatus);



module.exports = router;