import mongoose from "mongoose";

const newsAgentLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you’ll create a User model
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  headlines: {
    type: [String],
    required: true
  },
  summary: {
    type: String,
    required: true
  }
});

const NewsAgentLog = mongoose.models.NewsAgentLog||mongoose.model("NewsAgentLog", newsAgentLogSchema);

export default NewsAgentLog;
