import express from 'express'
import newsScraperAgent from '../../agents/newsScraperAgent.js';
import summarizerAgent from '../../agents/summarizerAgent.js';
import fs from "fs";
import path from "path";
import loggerAgent from '../../agents/loggerAgent.js';
import { authUser } from '../../middlewares/authUser.js';
import NewsAgentLog from '../../models/newsAgentLog.js';

const newsAgentRouter = express.Router()

newsAgentRouter.get('/run-news-workflow', authUser, async (req, res) => {
    try {
        const headlines = await newsScraperAgent()
        const summary = await summarizerAgent(headlines);

        const log = new NewsAgentLog({
            userId: req.user.id,
            headlines,
            summary,
        })
        await log.save();
        res.status(200).json({ success: true, headlines, summary });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

// ✅ Get All Logs for Logged-in User
newsAgentRouter.get('/get-news-logs', authUser, async (req, res) => {
    try {
        const logs = await NewsAgentLog.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.status(200).json({ success: true, logs });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

newsAgentRouter.delete('/delete-log/:id', authUser, async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required to delete" });
        }

        const deletedLog = await NewsAgentLog.findByIdAndDelete(id);
        if (!deletedLog) {
            return res.status(404).json({ success: false, message: "Log not found" });
        }

        res.status(200).json({ success: true, message: "Log deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


export default newsAgentRouter;