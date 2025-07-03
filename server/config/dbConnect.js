import mongoose from "mongoose";

const connectDb=async (params) => {
    try {
        mongoose.connection.on("connected",()=>console.log("Database Is Connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}/aiAgentDashboard`)
    } catch (error) {
        
    }
}

export default connectDb;