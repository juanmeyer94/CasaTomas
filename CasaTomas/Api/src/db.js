import mongoose from "mongoose"

export const connectDB = async () => {

    const URL = `mongodb://127.0.0.1:27017/CasaTomas`

    try{
    await mongoose.connect(URL)
    console.log("DB is connected")
}catch(error) {
    console.log(error)
}
};