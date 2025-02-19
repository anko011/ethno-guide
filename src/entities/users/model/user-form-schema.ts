import {z} from "zod";

export const userFormSchema = z.object({
    fullName: z.string({
        required_error: "Поле обязательное",
        invalid_type_error: "Имя и фамилия должны быть строкой",
    })
        .min(2, "Имя и фамилия должны содержать не менее 2 символов")
        .max(100, "Имя и фамилия должны содержать не более 100 символов")
        .regex(/^[А-Яа-яA-Za-z]+\s[А-Яа-яA-Za-z]+$/, "Введите имя и фамилию через пробел"),
    email: z.string({
        required_error: "Электронная почта обязательна",
        invalid_type_error: "Электронная почта должна быть строкой",
    })
        .email("Электронная почта имеет неверный формат"),
    role: z.union([
        z.literal("administrator"),
        z.literal("moderator"),
        z.literal("author"),
    ], {
        required_error: "Поле обязательное",
        invalid_type_error: "Роль должна быть одной из: administrator, moderator, author",
    }).refine((value) => ["administrator", "moderator", "author"].includes(value), {
        message: "Роль должна быть одной из: administrator, moderator, author",
    }),
});
