import mongoose from "mongoose";

const excelPrice = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    price: { type: String, required: true }
})

const excelPriceList = mongoose.model("excelPriceList", excelPrice);
export default excelPriceList