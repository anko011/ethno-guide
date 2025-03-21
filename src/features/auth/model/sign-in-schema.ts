import {z} from "zod";

export const signInSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty()
})
