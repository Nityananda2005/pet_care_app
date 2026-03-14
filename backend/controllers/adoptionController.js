const Adoption = require("../models/adoptionModel");
const AdoptionRequest = require("../models/adoptionRequest");

exports.addAdoption = async (req, res) => {
    try {
        const { petName, age, gender, breed, description, species } = req.body;

        let imagePath = req.body.image;
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/"); // Normalize windows paths
        }

        const pet = await Adoption.create({
            petName,
            age,
            gender: gender?.toLowerCase(),
            breed,
            description,
            species,
            shelter: req.user.id,
            image: imagePath
        })

        res.status(201).json({
            success: true,
            message: "Pet added for adoption successfully",
            pet,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAdoption = async (req, res) => {
    try {
        const pets = await Adoption.find({ status: "available" }).populate("shelter");
        res.json({
            success: true,
            message: "Pets fetched successfully",
            pets,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAdoptionById = async (req, res) => {
    try {
        const pet = await Adoption.findById(req.params.id).populate("shelter");
        res.json({
            success: true,
            message: "Pet fetched successfully",
            pet,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get pets belonging to the logged-in shelter
exports.getMyShelterPets = async (req, res) => {
    try {
        const pets = await Adoption.find({ shelter: req.user.id });
        res.json({
            success: true,
            count: pets.length,
            pets
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAdoption = async (req, res) => {
    try {
        const pet = await Adoption.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: "Pet not found" });

        // Ownership check
        if (pet.shelter.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized: This pet does not belong to your shelter" });
        }

        const updatedPet = await Adoption.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            success: true,
            message: "Pet updated successfully",
            pet: updatedPet,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteAdoption = async (req, res) => {
    try {
        const pet = await Adoption.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: "Pet not found" });

        // Ownership check
        if (pet.shelter.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Adoption.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Pet listing removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.createAdoptionRequest = async (req, res) => {
    try {
        const { petId } = req.body;
        const request = await AdoptionRequest.create({
            pet: petId,
            user: req.user.id
        })
        res.status(201).json({
            success: true,
            message: "Adoption request sent",
            request,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAdoptionRequest = async (req, res) => {
    try {
        const requests = await AdoptionRequest.find({ user: req.user.id }).populate("pet");
        res.json({
            success: true,
            message: "Adoption requests fetched successfully",
            requests,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAdoptionRequestById = async (req, res) => {
    try {
        const request = await AdoptionRequest.findById(req.params.id).populate("pet");
        res.json({
            success: true,
            message: "Adoption request fetched successfully",
            request,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get all requests for a specific shelter
exports.getShelterAdoptionRequests = async (req, res) => {
    try {
        // Find pets belonging to this shelter
        const pets = await Adoption.find({ shelter: req.user.id });
        const petIds = pets.map(p => p._id);

        // Find requests for those pets
        const requests = await AdoptionRequest.find({ pet: { $in: petIds } })
            .populate("pet")
            .populate("user", "name email phone");

        res.json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update request status (approve/reject)
exports.updateAdoptionRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await AdoptionRequest.findById(req.params.id).populate("pet");

        if (!request) return res.status(404).json({ message: "Request not found" });

        // Ensure requester is the shelter owner of the pet
        if (request.pet.shelter.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        request.status = status;
        await request.save();

        // If approved, mark the pet as adopted
        if (status === 'approved') {
            await Adoption.findByIdAndUpdate(request.pet._id, { status: 'adopted' });
        }

        res.json({ success: true, message: `Request ${status}`, request });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getShelterStats = async (req, res) => {
    try {
        const pets = await Adoption.find({ shelter: req.user.id });
        const petIds = pets.map(p => p._id);

        const requests = await AdoptionRequest.find({ pet: { $in: petIds } });

        const stats = {
            totalPets: pets.length,
            availablePets: pets.filter(p => p.status === 'available').length,
            adoptedPets: pets.filter(p => p.status === 'adopted').length,
            totalRequests: requests.length,
            pendingRequests: requests.filter(r => r.status === 'pending').length
        };

        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



