// In database.js
const { supabase } = require('./app');

// Function to create 'storefronts' table
async function createStorefrontsTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS storefronts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
      config JSONB
    );
  `;

    try {
        const { error } = await supabase.rpc('query', { sql: query });
        if (error) {
            throw new Error(error.message);
        }

        console.log('Storefronts table created.');
    } catch (error) {
        throw new Error('Failed to create storefronts table. Please check your Supabase configuration.');
    }
}

// Function to create a new storefront
async function createStorefront(name, description, ownerId, config) {
    try {
        const { data, error } = await supabase.from('storefronts').insert({ name, description, owner_id: ownerId, config });
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    } catch (error) {
        throw new Error('Failed to create storefront. Please try again.');
    }
}

// Function to get a storefront by ID
async function getStorefrontById(id) {
    try {
        const { data, error } = await supabase.from('storefronts').select('*').eq('id', id).single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to fetch storefront. Please check the storefront ID.');
    }
}

// Function to update a storefront by ID
async function updateStorefront(id, name, description, config) {
    try {
        const { data, error } = await supabase.from('storefronts').update({ name, description, config }).eq('id', id).single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to update storefront. Please try again.');
    }
}

// Function to delete a storefront by ID
async function deleteStorefront(id) {
    try {
        const { data, error } = await supabase.from('storefronts').delete().eq('id', id).single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to delete storefront. Please check the storefront ID.');
    }
}

// Function to get all storefronts
async function getAllStorefronts() {
    try {
        const { data, error } = await supabase.from('storefronts').select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to fetch storefronts. Please try again.');
    }
}

// Function to set up the entire database schema
async function setupDatabase() {
    try {
        await createStorefrontsTable();

        console.log('Database setup completed.');
    } catch (error) {
        console.error(error.message);
        process.exit(1); // Exit the process in case of database setup failure
    }
}



// Export the setup function and other storefront functions to be used in the backend
module.exports = {
    createStorefrontsTable,
    getAllStorefronts,
    createStorefront,
    getStorefrontById,
    updateStorefront,
    deleteStorefront,
    setupDatabase,
};
