import express from 'express'
import { authUser } from '../../middlewares/authUser.js';
import { upload } from '../../config/multer.js';
import fs from 'fs';
import pdfParse from 'pdf-parse'; 
import pdfSummarizerAgent from '../../agents/pdfAgent/pdfSummarizerAgent.js';
import PdfSummaryLog from '../../models/PdfSummaryLog.js';

const pdfRouter = express.Router()

pdfRouter.post('/summary', authUser, upload.single('file'), async (req, res) => {
    const userId = req.user.id
    const file = req.file

    if (!file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    // console.log("File",file)
    try {
        const { text } = await pdfParse(file.buffer)
        fs.unlinkSync(file.path);
        const trimmedText = text.slice(0, 3000); // To avoid model overflow

        const summary = await pdfSummarizerAgent(trimmedText)

        const log = await PdfSummaryLog.create({
            user: userId,
            fileName: file.originalname,
            summary,
        })

        res.status(200).json({ success: true, summary });
    } catch (error) {
        console.error('PDF Summary Error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to summarize PDF' });
    }
})

// GET: Fetch all logs for user
pdfRouter.get('/logs', authUser, async (req, res) => {
    try {
        const logs = await PdfSummaryLog.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json({ success: true, logs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

// DELETE: Remove log
pdfRouter.delete('/logs/:id', authUser, async (req, res) => {
    try {
        await PdfSummaryLog.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default pdfRouter;