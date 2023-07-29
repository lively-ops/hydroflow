// middleware/authenticate.js
const { supabase } = require('../app');

function authenticate(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing Authorization header.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify and decode the token here (e.g., using JWT library or Supabase methods)
        // Example with Supabase (using Supabase JWT.verify method):
        const { error, decodedToken } = supabase.auth.api.verify(token);
        if (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }

        // You can also add more checks based on the decodedToken, like checking user roles, etc.
        // Example: if (decodedToken.role !== 'admin') { return res.status(403).json({ message: 'Forbidden' }); }

        // Attach the decodedToken to the request object for use in route handlers
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
}

module.exports = authenticate;
