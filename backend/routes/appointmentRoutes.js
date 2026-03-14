const express = require("express");

const { bookAppointment, getMyAppointments, getVetAppointments, updateAppointmentStatus, getVetStats } = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/vet", protect, getVetAppointments);
router.get("/vet-stats", protect, getVetStats);
router.put("/status/:id", protect, updateAppointmentStatus);

module.exports = router;
