import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPhone: String,
    userMessage: String,
    userLocation: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model("contactSchema", contactSchema);