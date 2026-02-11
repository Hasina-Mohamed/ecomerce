const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getDashboardStats,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderToDelivered
} = require('../controllers/adminController');

// Dashboard stats
router.get('/stats', protect, admin, getDashboardStats);

// Users
router.get('/users', protect, admin, getUsers);
router.post('/users', protect, admin, createUser);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

// Products
router.get('/products', protect, admin, getProducts);
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

// Orders
router.get('/orders', protect, admin, getOrders);
router.post('/orders', protect, admin, createOrder);
router.put('/orders/:id', protect, admin, updateOrder);
router.delete('/orders/:id', protect, admin, deleteOrder);
router.put('/orders/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
