import {z} from "zod"

const itemSchema = z.object({
    marca: z.string().optional(),
    name: z.string().optional(),
    photo: z.array(z.string()).optional(),
    price: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    specsTecs: z.string().optional(),
    colours: z.array(z.string()).optional(),
    models: z.array(z.string()).optional(),
   
  });
  

  const dataSchema = z.object({
    type: z.string(),
    items: z.array(itemSchema),
  });
  

  export const itemDataSchema = z.object({
    offer: z.boolean(),
    section: z.string(),
    subsection: z.string(),
    filter: z.boolean(),
    data: dataSchema,
  });
