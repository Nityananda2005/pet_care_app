const User = require("../models/User");

exports.getNearbyVets = async (req, res) => {
    try {
        const { longitude, latitude } = req.query;

        console.log("Searching for vets near:", { longitude, latitude });

        let query = { role: "vet", status: "active" };

        if (longitude && latitude && longitude !== "undefined" && latitude !== "undefined") {
            const lon = parseFloat(longitude);
            const lat = parseFloat(latitude);

            if (!isNaN(lon) && !isNaN(lat)) {
                query.location = {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lon, lat]
                        },
                        $maxDistance: 50000 // Increased to 50km radius for better results
                    }
                };
            }
        }

        let vets = await User.find(query).select("name email phone location status").limit(10);

        // Fallback: If no vets found nearby, just show any active vets
        if (vets.length === 0) {
            console.log("No vets found nearby, falling back to all active vets");
            vets = await User.find({ role: "vet", status: "active" }).select("name email phone location status").limit(10);
        }

        res.json({
            success: true,
            count: vets.length,
            vets
        });

    } catch (error) {
        console.error("Error in getNearbyVets:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

