const Product = require('../models/productModel');

// Add a new product to inventory
exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, stock } = req.body;

        // Ensure user is a seller
        if (req.user.role !== 'seller' && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only sellers can add products" });
        }

        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            stock,
            seller: req.user.id
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products belonging to the logged-in seller
exports.getMyInventory = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id });
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product details
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        // Check ownership
        if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products (Public Storefront)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'name email');
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
