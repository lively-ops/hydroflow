// In realtime.js
const { supabase } = require('./app');

// Function to subscribe to real-time changes for a specific table
function subscribeToTableChanges(tableName, callback) {
    const subscription = supabase
        .from(tableName)
        .on('*', (payload) => {
            // Callback function to handle real-time updates
            // You can customize this function to process the changes according to your application's needs
            callback(payload);
        })
        .subscribe();

    // Return the subscription object, which can be used to unsubscribe later if needed
    return subscription;
}

// Export the real-time subscription function to be used in the backend
module.exports = {
    subscribeToTableChanges,
};
