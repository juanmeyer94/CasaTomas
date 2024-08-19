import {z} from "zod"

export const contactSchema = z.object({
    userName: z.string(),
    userEmail: z.string(),
    userMessage: z.string(),
    userPhone: z.string(),
    userLocation: z.string(),
})