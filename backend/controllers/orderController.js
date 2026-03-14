const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create a new order (for Pet Owner app)
exports.createOrder = async (req, res) => {
    try {
        const { products, shippingAddress, totalAmount } = req.body;

        const order = new Order({
            customer: req.user.id,
            products,
            shippingAddress,
            totalAmount
        });

        await order.save();

        // Optionally decrease stock
        for (const item of products) {
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get orders for a Seller (to see which products of theirs were sold)
exports.getSellerOrders = async (req, res) => {
    try {
        // This is a bit complex as an order can have products from multiple sellers.
        // For simplicity, we find all products belong to the seller.
        const sellerProducts = await Product.find({ seller: req.user.id });
        const productIds = sellerProducts.map(p => p._id.toString());

        // Find orders containing any of these products
        const orders = await Order.find({ "products.product": { $in: productIds } })
            .populate('customer', 'name email phone')
            .populate('products.product', 'name price image');

        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status (Seller/Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Security Check
        if (req.user.role !== 'admin') {
            const sellerProducts = await Product.find({ seller: req.user.id });
            const productIds = sellerProducts.map(p => p._id.toString());

            const hasSellerProduct = order.products.some(item => productIds.includes(item.product.toString()));

            if (!hasSellerProduct) {
                return res.status(403).json({ message: "Unauthorized: None of your products are in this order" });
            }
        }

        order.status = status;
        await order.save();

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get my orders (Pet Owner view)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).populate('products.product');
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get stats for Seller Dashboard
exports.getSellerStats = async (req, res) => {
    try {
        const sellerProducts = await Product.find({ seller: req.user.id });
        const productIds = sellerProducts.map(p => p._id.toString());

        const orders = await Order.find({ "products.product": { $in: productIds } });

        const stats = {
            totalProducts: productIds.length,
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, order) => {
                // Only count the revenue from the seller's products in that order
                const sellerPart = order.products
                    .filter(item => productIds.includes(item.product.toString()))
                    .reduce((s, item) => s + (item.quantity * (sellerProducts.find(p => p._id.toString() === item.product.toString())?.price || 0)), 0);
                return sum + sellerPart;
            }, 0),
            pendingOrders: orders.filter(o => o.status === 'Pending').length,
            lowStock: sellerProducts.filter(p => p.stock < 5).length
        };

        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
