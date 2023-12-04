import mongoose from "mongoose";

  
const itemSchema = new mongoose.Schema({
    marca: String,
    name: String,
    photo: [String],
    price: String,
    summary: String,
    description: String,
    specsTecs: String,
});

const dataSchema = new mongoose.Schema({
    type: String,
    items: [itemSchema],
});

const ItemDataSchema = new mongoose.Schema({
    offer: Boolean,
    section: String,
    subsection: String,
    filter: Boolean,
    data: dataSchema,
}, {
    timestamps: true,
});

export default mongoose.model("ItemData", ItemDataSchema);
