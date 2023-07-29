// In fileStorage.js
const { supabase } = require('./app');

// Function to upload a file to the file storage
async function uploadFile(bucketName, file, options = {}) {
    try {
        const { data, error } = await supabase.storage.from(bucketName).upload(file.name, file, options);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to upload file. Please try again.');
    }
}

// Function to generate a file URL for download
function getFileURL(bucketName, fileName) {
    return supabase.storage.from(bucketName).getPublicUrl(fileName);
}

// Function to delete a file from the file storage
async function deleteFile(bucketName, fileName) {
    try {
        const { data, error } = await supabase.storage.from(bucketName).remove([fileName]);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to delete file. Please try again.');
    }
}

// Function to get file metadata (size, type, etc.) from the file storage
async function getFileMetadata(bucketName, fileName) {
    try {
        const { data, error } = await supabase.storage.from(bucketName).getMetadata([fileName]);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    } catch (error) {
        throw new Error('Failed to get file metadata. Please try again.');
    }
}

// Function to list all files in a bucket from the file storage
async function listFiles(bucketName) {
    try {
        const { data, error } = await supabase.storage.from(bucketName).list();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (error) {
        throw new Error('Failed to list files. Please try again.');
    }
}

// Export the file storage functions to be used in the backend
module.exports = {
    uploadFile,
    getFileURL,
    deleteFile,
    getFileMetadata,
    listFiles,
};
