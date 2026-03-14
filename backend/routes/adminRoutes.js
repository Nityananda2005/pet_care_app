const express = require('express');
const router = express.Router();
const { getDashboardStats, getPendingUsers, approveUser, getAllUsers, rejectUser, deleteUser, getRecentActivities } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getDashboardStats);
router.get('/activities', protect, getRecentActivities);
router.get('/users', protect, getAllUsers);
router.get('/pending-users', protect, getPendingUsers);
router.put('/approve/:id', protect, approveUser);
router.delete('/reject/:id', protect, rejectUser);
router.delete('/user/:id', protect, deleteUser);

module.exports = router;
