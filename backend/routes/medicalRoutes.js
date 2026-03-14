const express = require("express");
const {
    addMedicalRecord,
    getMedicalRecords,
    addVaccination,
    getVaccinations,
    getVetMedicalHistory
} = require("../controllers/medicalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/history", protect, getVetMedicalHistory); // For Vet Dashboard
router.post("/pets/:id/medical-history", protect, addMedicalRecord);
router.get("/pets/:id/medical-history", protect, getMedicalRecords);

router.post("/pets/:id/vaccination", protect, addVaccination);

router.get("/pets/:id/vaccinations", protect, getVaccinations);


module.exports = router;