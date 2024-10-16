import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    const URL = process.env.VITE_MONGO_URI;

    try {
        await mongoose.connect("mongodb+srv://casatomasrafaela:aRtBjsd2SjEsRr4e@casatomascloud.wj9qczy.mongodb.net");
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};
