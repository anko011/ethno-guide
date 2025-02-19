import {z} from "zod";

export const areaFormSchema = z.object({
    title: z.string({required_error: "Поле обязательное"})
        .min(2, "Название региона должно содержать не менее 2 символов")
        .max(100, "Название региона должно содержать не более 100 символов"),
    d: z.string({required_error: "Поле обязательное"})
});
