import mongoose from 'mongoose';

const creativeWritingLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true,
    },
    prompt: {
        type: String,
        required: true,
        trim: true, // Remove whitespace from both ends of a string
    },
    generatedContent: {
        type: String,
        required: true,
        trim: true,
    },
    
    type: {
        type: String,
        enum: ['short_story', 'poem', 'outline', 'marketing_copy', 'brainstorm', 'other'],
        default: 'other',
    },
}, { timestamps: true }); 


const CreativeWritingLog = mongoose.models.CreativeWritingLog ||
    mongoose.model('CreativeWritingLog', creativeWritingLogSchema);

export default CreativeWritingLog;
