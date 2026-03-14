const Rescue = require('../models/rescueModel');

exports.reportRescue = async (req, res) => {
    try {
        const { location, condition, description } = req.body;
        let image = null;

        if (req.file) {
            image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const newRescue = new Rescue({
            reporter: req.user ? req.user._id : null,
            location,
            condition,
            description,
            image
        });

        await newRescue.save();

        res.status(201).json({
            success: true,
            message: 'Your rescue alert has been sent successfully! A nearby rescue team will respond shortly.',
            rescue: newRescue
        });
    } catch (error) {
        console.error("Error reporting rescue:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.getRescues = async (req, res) => {
    try {
        // Fetch all rescues, recent first
        const rescues = await Rescue.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: rescues.length, rescues });
    } catch (error) {
        console.error("Error fetching rescues:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateRescueStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const rescue = await Rescue.findById(id);

        if (!rescue) {
            return res.status(404).json({ success: false, message: 'Rescue not found' });
        }

        rescue.status = status;
        await rescue.save();

        res.status(200).json({ success: true, message: 'Rescue status updated', rescue });
    } catch (error) {
        console.error("Error updating rescue:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
