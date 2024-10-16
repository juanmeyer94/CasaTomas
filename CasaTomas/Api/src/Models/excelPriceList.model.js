import mongoose from "mongoose";

const excelPriceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    quantity: { type: String }, 
    wholesalePrice: { type: String}
});

const excelPriceList = mongoose.model("excelPriceList", excelPriceSchema);
export default excelPriceList;
