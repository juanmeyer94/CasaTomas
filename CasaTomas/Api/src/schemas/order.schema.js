import { z } from "zod";

const orderItemSchema = z.object({
  type: z.string(),
  items: z.array(
    z.object({
      marca: z.string().optional(),
      name: z.string().optional(),
      photo: z.array(z.string()).optional(),
      price: z.string(),
      summary: z.string().optional(),
      description: z.string().optional(),
      specsTecs: z.string().optional(),
      _id: z.string(),
      colours: z.array(z.string()).optional(),
      models: z.array(z.string()).optional(),
      code: z.string().optional(),
      section: z.string().optional(),
      subsection: z.string().optional(),
      offer: z.boolean().optional(),
      quantity: z.string().optional(),
      wholesalePrice: z.string().optional(),
    })
  ),
  _id: z.string(),
  quantity: z.record(z.string(), z.number()), 
  quantities: z.record(
    z.string(),
    z.record(z.string(), z.number())
  ).optional(),
  commentary: z.string().optional(),
});

export const orderSchema = z.object({
  orderItems: z.array(orderItemSchema),
  userEmail: z.string(),
  userName: z.string(),
  userLastName: z.string(),
  cellphone: z.string(),
  totalAmount: z.number().nullable(), 
  status: z.string().optional(),
  deleted: z.boolean().optional(),
  orderNumber: z.number().optional() 
});
