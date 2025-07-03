import express from 'express'
import webPageAgent from '../../agents/webPageAgent/webPageAgent.js';
import { authUser } from '../../middlewares/authUser.js';
import WebSummary from '../../models/WebSummaryLog.js';
const webPageRouter = express.Router()

webPageRouter.post('/summary', authUser, async (req, res) => {
    const { url } = req.body;
    const userId = req.user.id;
    if (!url) return res.status(400).json({ success: false, message: "URL is required" });
    try {
        const summary = await webPageAgent(url);
        const dbSummary = await WebSummary.create({ user: userId, url, summary })
        if (dbSummary) {
            res.status(200).json({ success: true, message: "WebPage Summary Added Successfully", summary });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err.message)
    }
})
webPageRouter.get('/get-webLog', authUser, async (req, res) => {
    try {
        // console.log(req.user.id)
        const webLogs = await WebSummary.find({ user: req.user?.id }).sort({ timestamp: -1 })
        res.status(200).json({ success: true, webLogs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})
webPageRouter.delete('/delete-webLog/:id', authUser, async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required to delete" });
        }
        const deletedLog = await WebSummary.findByIdAndDelete(id);
        if (!deletedLog) {
            return res.status(404).json({ success: false, message: "WebLog not found" });
        }
        res.status(200).json({ success: true, message: "WebLog deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

export default webPageRouter;