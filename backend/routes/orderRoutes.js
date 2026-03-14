const express = require('express');
const router = express.Router();
const { createOrder, getSellerOrders, updateOrderStatus, getMyOrders, getSellerStats } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/seller-orders', protect, getSellerOrders); // For Dashboard
router.get('/seller-stats', protect, getSellerStats); // For Dashboard
router.put('/status/:id', protect, updateOrderStatus); // For Dashboard

module.exports = router;
