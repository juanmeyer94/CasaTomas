import { z } from "zod";

const orderItemSchema = z.object({
  type: z.string(),
  items: z.array(
    z.object({
      marca: z.string().optional(),
      name: z.string().optional(),
      photo: z.array(z.string()).optional(),
      price: z.string().optional(),
      summary: z.string().optional(),
      description: z.string().optional(),
      specsTecs: z.string().optional(),
      _id: z.string(),
    })
  ),
  _id: z.string(),
  quantity: z.number(),
  colour: z.string().optional(),
});

const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  userId: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  userLastName: z.string(),
  totalAmount: z.number(),
});
