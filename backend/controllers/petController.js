const Pet = require("../models/Pet");

exports.addPet = async (req, res) => {
    try {
        const { name, species, age, gender, breed, weight, mood, image, bloodGroup, identificationNumber, allergies } = req.body;

        const pet = await Pet.create({
            owner: req.user.id,
            name,
            species,
            age,
            gender,
            breed,
            weight,
            mood,
            image: image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1", // Default image if none provided
            bloodGroup,
            identificationNumber,
            allergies
        });

        res.status(201).json({
            success: true,
            message: "Pet added successfully",
            pet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add pet",
            error: error.message,
        })
    }
}

exports.getMyPets = async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.user.id });

        res.status(200).json({
            success: true,
            count: pets.length,
            pets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({
                message: "Pet not Found"
            });
        }
        res.status(200).json({
            success: true,
            pet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "Pet updated successfully",
            pet
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Pet deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}


exports.getHealthCard = async (req, res) => {
    try {

        const pet = await Pet.findById(req.params.id);

        if (!pet) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }

        const healthCard = {
            petName: pet.name,
            species: pet.species,
            breed: pet.breed,
            bloodGroup: pet.bloodGroup,
            identificationNumber: pet.identificationNumber,
            allergies: pet.allergies
        };

        res.json({
            success: true,
            healthCard
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.searchPet = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Search query required" });

        const pets = await Pet.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { identificationNumber: { $regex: query, $options: 'i' } }
            ]
        }).populate("owner", "name email phone");

        res.json({ success: true, count: pets.length, pets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


