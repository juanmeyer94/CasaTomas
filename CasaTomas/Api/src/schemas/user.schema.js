import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username es obligatorio"
    }),
    email: z.string({
        required_error:"Email es obligatorio"
    }).email({
        message:"Email inválido "
    }),
    password: z.string({
        required_error: "Password es obligatoria"
    }).min(8, {
        message: "La contraseña debe tener un mínimo de 8 caracteres"
    })
})


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es obligatorio"
    }).email({
        message: "Email inválido "
    }),
    password: z.string({
        required_error: "Password es obligatoria"
    }).min(8, {
        message: "Password o email incorrectos"
    })
});


