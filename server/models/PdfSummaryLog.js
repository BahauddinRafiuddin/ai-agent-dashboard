// models/PdfSummaryLog.js
import mongoose from "mongoose";

const pdfSummarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
},{timestamps:true});
const PdfSummaryLog = mongoose.models.PdfSummaryLog || mongoose.model('PdfSummaryLog', pdfSummarySchema)

export default PdfSummaryLog;
