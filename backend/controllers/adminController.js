const User = require('../models/User');
const Pet = require('../models/Pet');
const Appointment = require('../models/appointment');
const Order = require('../models/orderModel');
const Adoption = require('../models/adoptionModel');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const petCount = await Pet.countDocuments();
        const appointmentCount = await Appointment.countDocuments();
        const orderCount = await Order.countDocuments();
        const adoptionCount = await Adoption.countDocuments();

        res.status(200).json({
            users: userCount,
            pets: petCount,
            appointments: appointmentCount,
            orders: orderCount,
            adoptions: adoptionCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all pending users
// @route   GET /api/admin/pending-users
// @access  Private/Admin
const getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ status: 'pending' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve a user
// @route   PUT /api/admin/approve/:id
// @access  Private/Admin
const approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.status = 'active';
            await user.save();
            res.status(200).json({ message: 'User approved' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reject/Delete a pending user
// @route   DELETE /api/admin/reject/:id
// @access  Private/Admin
const rejectUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User rejected and deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/user/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get recent activities
// @route   GET /api/admin/activities
// @access  Private/Admin
const getRecentActivities = async (req, res) => {
    try {
        // Fetching recent updates from various models as "activities"
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
        const recentAppointments = await Appointment.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name');

        const activities = [
            ...recentUsers.map(u => ({ type: 'user', message: `New user: ${u.name}`, date: u.createdAt })),
            ...recentAppointments.map(a => ({ type: 'appointment', message: `New appointment: ${a.reason}`, date: a.createdAt }))
        ].sort((a, b) => b.date - a.date).slice(0, 10);

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getPendingUsers,
    approveUser,
    getAllUsers,
    rejectUser,
    deleteUser,
    getRecentActivities
};
