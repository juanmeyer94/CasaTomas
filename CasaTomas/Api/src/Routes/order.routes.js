import express from "express";
import { authRequired } from "../middleware/validateToken.js";
import { getOrder, deleteOrder, updateOrderStatus, getOrders, createOrder } from "../Controllers/order.controller.js";

import { validateSchema } from "../middleware/validateSchema.js";
import { orderSchema } from "../schemas/order.schema.js";

const orderRouter = express.Router();

orderRouter.get("/orders", authRequired, getOrders);

orderRouter.post("/orders", validateSchema(orderSchema), createOrder)

orderRouter.get("/orders/:id", getOrder);

orderRouter.put("/orders/:id", authRequired ,updateOrderStatus);

orderRouter.delete("/orders/:id", authRequired , deleteOrder)


export default orderRouter;