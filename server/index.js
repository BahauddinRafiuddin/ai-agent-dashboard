import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import newsAgentRouter from './routes/agentRoutes/newsAgentRoutes.js';
import connectDb from './config/dbConnect.js';
import userRouter from './routes/userRouter.js';
import webPageRouter from './routes/agentRoutes/webPageRoutes.js';
import pdfRouter from './routes/agentRoutes/pdfAgentRoutes.js';
import emailAgentRouter from './routes/agentRoutes/emailAgentRoutes.js';
import creativeWritingRouter from './routes/agentRoutes/creativeWritingRouter.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Database Connection
await connectDb()

// News Agent Routes
app.use('/api/news-agent',newsAgentRouter)
// User Routes
app.use('/api/user',userRouter)
// WebPage Agent Routes
app.use('/api/webPage-agent',webPageRouter)
// PDFAgent Routers
app.use('/api/pdf-agent',pdfRouter)
// Email Agent Routes
app.use('/api/email-agent',emailAgentRouter)
// Creative Text Routes
app.use('/api/creative-writing',creativeWritingRouter)


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});