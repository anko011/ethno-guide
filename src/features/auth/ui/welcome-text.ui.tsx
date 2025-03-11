import type {ReactNode} from "react";
import type {Session} from "next-auth";

import {Text} from "@radix-ui/themes";

import {Role} from "@/entities/users";
import {Link} from "@/share/ui/link";

export async function WelcomeText({session}: { session?: Session | null }) {

    if (!session) return (
        <Text size="1">
            <Link weight="medium" href="/registration">Зарегистрируйтесь</Link>
            , что бы стать автором или {' '}
            <Link weight="medium" size="1" href="/login">войдите</Link>
            , что бы написать свою статью!
        </Text>
    )
    const {user} = session;
    const welcomeText = `Добро пожаловать, ${user.fullName}! Перейти в `;

    const content: Record<Role, ReactNode> = {
        [Role.ADMIN]: <Text size="1">
            {welcomeText}
            <Link href="/admin-panel">Админ-панель</Link>
        </Text>,
        [Role.MODERATOR]: <Text size="1">
            {welcomeText}
            <Link href="/moderator">Модераторная</Link>
        </Text>,
        [Role.AUTHOR]: <Text size="1">
            {welcomeText}
            <Link href="/author">Личный кабинет</Link>
        </Text>,
    }

    return content[user.role];
}
