import {z} from "zod";

export const formSchema = z.object({
    areaId: z.coerce.string({required_error: 'Поле обязательное'}).min(1),
    count: z.coerce.number().min(1)
})
