import {z} from "zod";

export const articleFormSchema = z.object({
    title: z.string({
        required_error: "Поле обязательное",
    })
        .min(2, "Заголовок должен содержать не менее 2 символов")
        .max(100, "Заголовок должен содержать не более 100 символов"),
    content: z.string({
        required_error: "Содержимое обязательно",
    })
        .min(1, "Содержимое статьи не должно быть пустым"), 
        //DO: min или nonempty - есть
    nationId: z.array(z.string()
        .min(1, "Хотя бы одна нация обязательна")), //DO: Тут проверка массива - есть
    authorId: z.string({
        required_error: "Поле обязательное",
    })
        .min(1, "Автор не может быть пустым"), //DO: nonempty  или min + переделать на authorId - есть
});
