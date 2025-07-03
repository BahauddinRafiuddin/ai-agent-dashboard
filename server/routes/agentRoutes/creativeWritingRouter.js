// server/routes/creativeWritingRouter.js
import express from 'express';
import { authUser } from '../../middlewares/authUser.js';
import generateCreativeContent from '../../agents/creativeWritingAgent/generateCreativeContent.js';
import CreativeWritingLog from '../../models/creativeWritingLog.js';


const creativeWritingRouter = express.Router();

// POST endpoint to generate creative content
creativeWritingRouter.post('/generate', authUser, async (req, res) => {
    try {
        const { prompt, type } = req.body; // 'prompt' is the user's text, 'type' is for categorization
        const userId = req.user.id; // From authUser middleware

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Prompt is required for creative content generation." });
        }

        // Validate 'type' if provided, otherwise default will be used by the model
        const validTypes = ['short_story', 'poem', 'outline', 'marketing_copy', 'brainstorm', 'other'];
        const contentType = type && validTypes.includes(type) ? type : 'other';

        // Generate content using the LLM
        const generatedContent = await generateCreativeContent(prompt, contentType);

        // Log the interaction to the database
        const logEntry = await CreativeWritingLog.create({
            userId,
            prompt,
            generatedContent,
            type: contentType,
        });

        res.status(200).json({
            success: true,
            generatedContent,
            logId: logEntry._id, // Optionally return the log ID
            message: "Creative content generated successfully!"
        });

    } catch (error) {
        console.error("❌ Creative Writing Agent Error:", error.message);

        // Differentiate between user input errors and internal/API errors
        if (error.message.includes("Prompt cannot be empty") || 
            error.message.includes("Invalid YouTube URL provided")) { // Just in case, though this agent doesn't use URLs directly
            return res.status(400).json({ success: false, message: error.message });
        }
        if (error.message.includes("GROQ_API_KEY is not set") || 
            error.message.includes("Groq API error") || 
            error.message.includes("LLM returned empty")) {
            return res.status(500).json({ success: false, message: `Content generation failed: ${error.message}` });
        }
        // Generic catch-all for other unexpected errors
        res.status(500).json({ success: false, message: "An unexpected error occurred during creative content generation." });
    }
});

// In server/routes/creativeWritingRouter.js
creativeWritingRouter.get('/getPreviousContent', authUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const creativeWritingLogs = await CreativeWritingLog.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, creativeWritingLogs });
    } catch (error) {
        console.error("❌ Failed to fetch previous creative writing logs:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch previous creative writing logs." });
    }
});

// In server/routes/creativeWritingRouter.js
creativeWritingRouter.delete('/delete-content/:id', authUser, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Ensure user owns the log

        const deletedLog = await CreativeWritingLog.findOneAndDelete({ _id: id, userId });

        if (!deletedLog) {
            return res.status(404).json({ success: false, message: "Log not found or you don't have permission to delete it." });
        }

        res.status(200).json({ success: true, message: "Creative content log deleted successfully!" });
    } catch (error) {
        console.error("❌ Failed to delete creative writing log:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete creative content log." });
    }
});
export default creativeWritingRouter;
