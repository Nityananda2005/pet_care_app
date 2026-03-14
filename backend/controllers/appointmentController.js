
const Appointment = require("../models/appointment");

exports.bookAppointment = async (req, res) => {
    try {
        const { pet, vet, date, reason } = req.body;
        const appointment = await Appointment.create({
            pet, vet, date, reason, owner: req.user.id
        })
        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.getMyAppointments = async (req, res) => {
    try {
        console.log("Fetching appointments for user ID:", req.user.id);
        const appointments = await Appointment.find({ owner: req.user.id })
            .populate("pet")
            .populate({ path: 'vet', select: 'name email phone' })
            .sort({ date: -1 });

        console.log(`Found ${appointments.length} appointments`);
        res.status(200).json({
            success: true,
            appointments
        })
    } catch (error) {
        console.error("Error in getMyAppointments:", error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getVetAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            vet: req.user.id
        }).populate("pet owner");
        res.status(201).json({
            success: true,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        // Ensure requester is the vet assigned
        if (appointment.vet.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        appointment.status = status;
        await appointment.save();

        res.json({ success: true, message: `Appointment ${status}`, appointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVetStats = async (req, res) => {
    try {
        const appointments = await Appointment.find({ vet: req.user.id });

        const stats = {
            totalAppointments: appointments.length,
            pendingAppointments: appointments.filter(a => a.status === 'pending').length,
            completedAppointments: appointments.filter(a => a.status === 'completed' || a.status === 'approved').length,
            uniquePatients: [...new Set(appointments.map(a => a.pet.toString()))].length
        };

        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

