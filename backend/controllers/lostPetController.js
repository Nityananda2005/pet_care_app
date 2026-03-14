const LostPet = require("../models/lostPetModel");

exports.reportLostPet = async (req, res) => {
  try {
    const { petName, species, breed, location, description, image } = req.body;

    const pet = await LostPet.create({
      petName,
      species,
      breed,
      location,
      description,
      image,
      status: "lost",
      owner: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Lost pet reported",
      pet
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLostPets = async (req, res) => {
  try {
    const { species, search } = req.query;
    const query = { status: "lost" };
    if (species && species !== "All") query.species = species;
    if (search) query.petName = { $regex: search, $options: "i" };

    const pets = await LostPet.find(query).populate("owner", "name phone").sort({ createdAt: -1 });

    res.json({ success: true, pets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reportFoundPet = async (req, res) => {
  try {
    const { petName, species, breed, location, description, image } = req.body;

    const pet = await LostPet.create({
      petName,
      species,
      breed,
      location,
      description,
      image,
      status: "found",
      owner: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Found pet reported",
      pet
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFoundPets = async (req, res) => {
  try {
    const { species, search } = req.query;
    const query = { status: "found" };
    if (species && species !== "All") query.species = species;
    if (search) query.petName = { $regex: search, $options: "i" };

    const pets = await LostPet.find(query).populate("owner", "name phone").sort({ createdAt: -1 });

    res.json({ success: true, pets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
