import mongoose from "mongoose";

const excelPrice = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    price: { type: Number, required: true }
})

const excelPriceList = mongoose.model("excelPriceList", excelPrice);
export default excelPriceList