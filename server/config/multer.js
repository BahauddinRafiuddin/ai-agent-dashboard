import multer from 'multer';

// Configure multer to store files directly in memory
// This makes the file content available in req.file.buffer
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });