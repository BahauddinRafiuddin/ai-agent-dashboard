import mongoose from "mongoose";

const webSummaryLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // assumes you have a User model
        required: true
    },
    url: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
}, { timestamps: true })

const WebSummary = mongoose.models.WebSummary || mongoose.model('WebSummary', webSummaryLogSchema)
export default WebSummary;