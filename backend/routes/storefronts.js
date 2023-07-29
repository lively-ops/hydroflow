// routes/storefronts.js
const express = require('express');
const router = express.Router();
const { supabase } = require('../app');
const authenticate = require('../middleware/authenticate');
const storefrontsController = require('../controllers/storefrontsController');

// Apply the authentication middleware to protect the routes
router.use(authenticate);

// Routes for storefronts
router.get('/', storefrontsController.getAllStorefronts);
router.get('/:id', storefrontsController.getStorefrontById);
router.post('/', storefrontsController.createStorefront);
router.put('/:id', storefrontsController.updateStorefront);
router.delete('/:id', storefrontsController.deleteStorefront);

module.exports = router;
