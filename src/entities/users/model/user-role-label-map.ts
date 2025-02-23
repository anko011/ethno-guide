import {Role} from "./user";

export const roleLabelMap: Record<Role, string> = {
    [Role.ADMIN]: 'Администратор',
    [Role.MODERATOR]: 'Модератор',
    [Role.AUTHOR]: 'Автор',
}
