import {z} from "zod";

export const articleFormSchema = z.object({
    title: z.string({
        required_error: "Поле обязательное",
    })
        .min(2, "Заголовок должен содержать не менее 2 символов")
        .max(100, "Заголовок должен содержать не более 100 символов"),
    content: z.string({
        required_error: "Содержимое обязательно",
    }),
    nationId: z.string({
        required_error: "Электронная почта обязательна",
    }),
    author: z.string({
        required_error: "Поле обязательное",
    }),
});
