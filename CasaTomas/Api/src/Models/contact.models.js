import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPhone: String,
    userMessage: String,
    userLocation: String
})


export default mongoose.model("contactSchema", contactSchema);