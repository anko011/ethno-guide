import {z} from "zod";

export const articleFormSchema = z.object({
    title: z.string({
        required_error: "Поле обязательное",
    })
        .min(2, "Заголовок должен содержать не менее 2 символов")
        .max(100, "Заголовок должен содержать не более 100 символов"),
    content: z.string({
        required_error: "Содержимое обязательно",
    }), //TODO: min или nonempty
    nationId: z.string({
        required_error: "Электронная почта обязательна",
    }), //TODO: Тут проверка массива
    author: z.string({
        required_error: "Поле обязательное",
    }), //TODO: nonempty  или min + переделать на authorId
});
