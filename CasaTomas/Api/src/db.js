import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async () => {

    const URL = process.env.VITE_MONGO_URI

    try{
    await mongoose.connect(URL)
    console.log("DB is connected")
}catch(error) {
    console.log(error)
}
};