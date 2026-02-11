const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getUserProfile,
    updateUserProfile,
    toggleFavorite,
    syncCart
} = require('../controllers/userController');

// Profile
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Favorites
router.post('/favorites/:id', protect, toggleFavorite);

// Cart
router.post('/cart', protect, syncCart);

module.exports = router;
