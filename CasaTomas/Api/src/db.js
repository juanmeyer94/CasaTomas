import mongoose from "mongoose"
import dotenv from "dotenv"
import Counter from "./Models/counter.models.js";

dotenv.config();

export const connectDB = async () => {
    const URL = process.env.VITE_MONGO_URI;

    try {
        await mongoose.connect(URL);
        await initializeCounters();
    } catch (error) {
        console.error(error);
    }
};

const initializeCounters = async () => {
    await Counter.findByIdAndUpdate("orderNumber", { sequence_value: 0 }, { upsert: true });
};