const Notification = require("../models/Notification");
const Vaccination = require("../models/vaccinationModel");
const Pet = require("../models/Pet");

exports.getNotifications = async (req, res) => {
    try {
        let notifications = await Notification.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20);

        // Convert mongoose documents to plain objects so we can mix them safely
        notifications = notifications.map(n => n.toObject());

        // Fetch user's pets to get upcoming vaccinations
        const pets = await Pet.find({ owner: req.user.id }).select('_id name');
        const petIds = pets.map(p => p._id);

        // Date range: from today up to next 30 days
        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);

        const upcomingVaccinations = await Vaccination.find({
            pet: { $in: petIds },
            dueDate: { $gte: today, $lte: next30Days }
        }).populate('pet', 'name');

        const vaccinationAlerts = upcomingVaccinations.map(v => ({
            _id: `vac_${v._id}`,
            title: "Vaccination Reminder",
            message: `${v.pet.name} is due for ${v.vaccineName} vaccine on ${new Date(v.dueDate).toLocaleDateString()}. Please schedule an appointment.`,
            type: "vaccination",
            read: false, // Usually these stay unread until dismissed or due date passes
            createdAt: v.createdAt || new Date()
        }));

        res.json({
            success: true,
            notifications: [...vaccinationAlerts, ...notifications]
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        // Virtual notification (like vaccination reminder) can't be marked read in the generic Notification collection
        if (req.params.id && req.params.id.startsWith("vac_")) {
            return res.json({
                success: true,
                message: "Reminder dismissed"
            });
        }

        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({
            success: true,
            message: "Notification marked as read"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
