import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  type: String,
  items: [
    {
      marca: String,
      name: String,
      photo: [String],
      price: String,
      summary: String,
      description: String,
      specsTecs: String,
      _id: String,
    },
  ],
  _id: String,
  quantity: Number,
  quantities: { type: Map, of: Number, default: {} },
  commentary: String,
});

const orderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  userEmail: String,
  userName: String,
  userLastName: String,
  cellphone: String,
  totalAmount: Number,
  status: {
    type: String,
    optional: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
