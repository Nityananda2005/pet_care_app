const express = require('express');
const router = express.Router();
const { addProduct, getMyInventory, updateProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/public', getAllProducts); // Public view
router.get('/my-inventory', protect, getMyInventory); // Seller view
router.post('/add', protect, addProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
