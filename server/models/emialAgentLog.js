import mongoose from 'mongoose'

const emailAgentSchema  = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipient: { type: String },
    tone: { type: String },
    purpose: { type: String },
    keyPoints: [String],
    generatedEmail:String,  
}, { timestamps: true })

const EmailAgentModel = mongoose.models.EmailAgentModel || mongoose.model('EmailAgentModel', emailAgentSchema )

export default EmailAgentModel;