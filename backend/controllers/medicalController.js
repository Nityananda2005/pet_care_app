const MedicalRecord = require("../models/medicalRecordModel");
const Vaccination = require("../models/vaccinationModel");
const Pet = require("../models/Pet");

exports.addMedicalRecord = async (req, res) => {
  try {
    // Check if the pet exists and belongs to the user (if not vet/admin)
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const userId = (req.user?.id || req.user?._id)?.toString();
    const petOwnerId = pet.owner?.toString();
    const isVet = req.user?.role === 'vet' || req.user?.role === 'admin';

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!isVet && petOwnerId !== userId) {
      return res.status(403).json({ message: "You can only add medical records for your own pets" });
    }

    const { diagnosis, prescription, visitDate } = req.body;

    const record = await MedicalRecord.create({
      pet: req.params.id,
      vet: req.user.role === 'vet' || req.user.role === 'admin' ? req.user.id : null,
      diagnosis,
      prescription,
      visitDate
    });

    res.status(201).json({
      success: true,
      message: "Medical record added successfully",
      record
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ pet: req.params.id })
      .populate("vet", "name")
      .sort({ visitDate: -1 });

    res.json({
      success: true,
      records
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addVaccination = async (req, res) => {
  try {
    // Check if the pet exists and belongs to the user (if not vet/admin)
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const userId = (req.user?.id || req.user?._id)?.toString();
    const petOwnerId = pet.owner?.toString();
    const isVet = req.user?.role === 'vet' || req.user?.role === 'admin';

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!isVet && petOwnerId !== userId) {
      return res.status(403).json({ message: "You can only add vaccinations for your own pets" });
    }

    const { vaccineName, dateGiven, dueDate, notes } = req.body;

    const vaccine = await Vaccination.create({
      pet: req.params.id,
      vaccineName,
      dateGiven,
      dueDate,
      vet: req.user.role === 'vet' || req.user.role === 'admin' ? req.user.id : null,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Vaccination added successfully",
      vaccine
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVaccinations = async (req, res) => {
  try {
    const vaccines = await Vaccination.find({ pet: req.params.id }).populate('vet', 'name');
    res.json({
      success: true,
      vaccines
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all records issued by the logged-in vet
exports.getVetMedicalHistory = async (req, res) => {
  try {
    const [records, vaccinations] = await Promise.all([
      MedicalRecord.find({ vet: req.user.id }).populate('pet', 'name species breed'),
      Vaccination.find({ vet: req.user.id }).populate('pet', 'name species breed')
    ]);

    res.json({
      success: true,
      history: {
        records,
        vaccinations
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
