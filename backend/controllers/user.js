// In auth.js
const { supabase } = require('./app');

// User Registration
async function registerUser(email, password) {
    try {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            throw new Error(error.message);
        }
        return user;
    } catch (error) {
        throw new Error('User registration failed. Please try again.');
    }
}

// User Login
// User Login
async function loginUser(email, password) {
    try {
        const { user, session, error } = await supabase.auth.signIn({ email, password });
        if (error) {
            throw new Error(error.message);
        }

        if (!session?.access_token) {
            throw new Error('Access token not provided in the login response.');
        }

        return { user, access_token: session.access_token }; // Return both user object and access token
    } catch (error) {
        throw new Error('Invalid credentials. Please check your email and password.');
    }
}

// User Logout
async function logoutUser() {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        throw new Error('Logout failed. Please try again.');
    }
}

// Get Current User
function getCurrentUser() {
    return supabase.auth.user();
}

// Export auth functions for use in the routes or controllers
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
};
