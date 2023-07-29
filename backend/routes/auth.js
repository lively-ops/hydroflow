// In routes/auth.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../app');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/auth');

// Route for user registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await registerUser(email, password);
        res.json({ user, message: 'User registration successful.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginUser(email, password);
        res.json({ user, message: 'User login successful.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Route for user logout
router.post('/logout', async (req, res) => {
    try {
        await logoutUser();
        res.json({ message: 'User logout successful.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for getting the current user
router.get('/me', async (req, res) => {
    const user = getCurrentUser();
    res.json({ user });
});

// Route for password reset
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
            throw new Error('Password reset request failed. Please try again.');
        }
        res.json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for account verification
router.post('/verify-account', async (req, res) => {
    const { email } = req.body;

    try {
        const { error } = await supabase.auth.api.verifyEmailForSignup(email);
        if (error) {
            throw new Error('Account verification request failed. Please try again.');
        }
        res.json({ message: 'Account verification email sent successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
