import {z} from "zod";
import {Role} from "@/entities/users/model/user";

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
        z.literal(Role.ADMIN),
        z.literal(Role.MODERATOR),
        z.literal(Role.AUTHOR),
    ], {
        required_error: "Поле обязательное",
        invalid_type_error: "Установлена некорректная роль",
    }).refine((value) => [Role.ADMIN, Role.MODERATOR, Role.AUTHOR].includes(value), {
        message: "Роль должна быть одной из: administrator, moderator, author",
    }),
});
