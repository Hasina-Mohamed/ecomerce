const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            favorites: user.favorites,
            cart: user.cart
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Add/Remove Favorite
// @route   POST /api/users/favorites/:id
// @access  Private
const toggleFavorite = async (req, res) => {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    if (user) {
        if (user.favorites.includes(productId)) {
            user.favorites = user.favorites.filter(id => id.toString() !== productId);
            await user.save();
            res.json({ message: 'Product removed from favorites', favorites: user.favorites });
        } else {
            user.favorites.push(productId);
            await user.save();
            res.json({ message: 'Product added to favorites', favorites: user.favorites });
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Sync Cart
// @route   POST /api/users/cart
// @access  Private
const syncCart = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.cart = req.body.cart; // Expecting array of { product, qty, size, color }
        await user.save();
        res.json(user.cart);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    toggleFavorite,
    syncCart
};
