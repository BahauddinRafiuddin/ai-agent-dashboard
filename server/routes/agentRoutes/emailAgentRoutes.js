import express from 'express'
import { authUser } from '../../middlewares/authUser.js';
import emailGenerater from '../../agents/emailAgent/emailGenerater.js';
import EmailAgentModel from '../../models/emialAgentLog.js';

const emailAgentRouter = express.Router()

emailAgentRouter.post('/generate-email', authUser, async (req, res) => {
    try {
        const userId = req.user.id
        const { recipient, tone, purpose, keyPoints } = req.body

        if (!tone || !purpose) {
            return res.status(400).json({ success: false, message: "Missing tone or purpose" })
        }

        const emailText = await emailGenerater(recipient, tone, purpose, keyPoints)

        const emailData = await EmailAgentModel.create({
            userId,
            recipient,
            tone,
            purpose,
            keyPoints,
            generatedEmail: emailText
        })
        res.status(200).json({ success: true, email: emailText });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

emailAgentRouter.get('/getPreviousEmails', authUser, async (req, res) => {
    try {
        const emailLogs = await EmailAgentModel.find({ userId: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json({ success: true, emailLogs });
    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
})

emailAgentRouter.delete('/delete-email/:id', authUser, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required to delete" });
        }
        const deletedEmail = await EmailAgentModel.findByIdAndDelete(id)
        if (!deletedEmail) {
            return res.status(404).json({ success: false, message: "Email not found" });
        }
        res.status(200).json({ success: true, message: "Email deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: err.message });
    }
})

export default emailAgentRouter;