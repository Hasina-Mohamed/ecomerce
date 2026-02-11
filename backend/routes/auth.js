const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

module.exports = router;
