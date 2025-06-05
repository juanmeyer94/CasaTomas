import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  items: [
    {
      marca: String,
      name: String,
      photo: [String],
      price: String,
      summary: String,
      description: String,
      specsTecs: String,
      _id: { type: String, required: true },
      colours: [String],
      models: [String],
      code: String,
      section: String,
      subsection: String,
      offer: Boolean,
      quantity: String,
    wholesalePrice: String,
    },
  ],
  _id: { type: String, required: true },
  quantity: { type: Map, of: Number },
  quantities: {
    type: Map,
    of: new mongoose.Schema({
      type: Map,
      of: Number,
    }),
  },
  commentary: String,
});

const orderSchema = new mongoose.Schema(
  {
    orderItems: [orderItemSchema],
    userEmail: { type: String, required: false },
    userName: { type: String, required: true },
    userLastName: { type: String, required: true },
    cellphone: { type: String, required: true },
    totalAmount: { type: Number, default: 0 },
    status: { type: String, default: "pendiente" },
    deleted: { type: Boolean, default: false },
    orderNumber: { type: Number, unique: true },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
