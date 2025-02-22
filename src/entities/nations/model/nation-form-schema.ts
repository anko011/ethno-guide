import {z} from "zod";

export const itemSchema = z.object({
    areaId: z.string({required_error: 'Поле обязательное'}).nonempty('Поле не должно быть пустым'),
    count: z.number({coerce: true, required_error: 'Поле обязательное', invalid_type_error: 'Не уникальные данные'})
});

export const formSchema = z.object({
    name: z.string({required_error: 'Поле обязательное'}).nonempty('Поле не должно быть пустым')
});