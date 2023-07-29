// In controllers/storefrontsController.js
const {
    createStorefront,
    getAllStorefronts: fetchAllStorefronts,
    getStorefrontById: fetchStorefrontById,
    updateStorefront: modifyStorefront,
    deleteStorefront: removeStorefront,
} = require('../services/database');

// Route handler to get all storefronts
async function getAllStorefronts(req, res) {
    try {
        const storefronts = await fetchAllStorefronts();
        res.json(storefronts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Route handler to get a storefront by ID
async function getStorefrontById(req, res) {
    const storefrontId = req.params.id;

    try {
        const storefront = await fetchStorefrontById(storefrontId);
        if (!storefront) {
            return res.status(404).json({ message: 'Storefront not found.' });
        }
        res.json(storefront);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Route handler to create a new storefront
async function createNewStorefront(req, res) {
    const { name, description, ownerId, config } = req.body;

    try {
        const newStorefront = await createStorefront(name, description, ownerId, config);
        res.status(201).json(newStorefront);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Route handler to update a storefront by ID
async function updateStorefront(req, res) {
    const storefrontId = req.params.id;
    const { name, description, config } = req.body;

    try {
        const updatedStorefront = await modifyStorefront(storefrontId, name, description, config);
        if (!updatedStorefront) {
            return res.status(404).json({ message: 'Storefront not found.' });
        }
        res.json(updatedStorefront);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Route handler to delete a storefront by ID
async function deleteStorefront(req, res) {
    const storefrontId = req.params.id;

    try {
        const deletedStorefront = await removeStorefront(storefrontId);
        if (!deletedStorefront) {
            return res.status(404).json({ message: 'Storefront not found.' });
        }
        res.json({ message: 'Storefront deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllStorefronts,
    getStorefrontById,
    createNewStorefront,
    updateStorefront,
    deleteStorefront,
};
