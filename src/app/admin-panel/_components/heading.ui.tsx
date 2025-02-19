'use client'

import {Heading as RadixHeading} from '@radix-ui/themes'
import {usePathname} from "next/navigation";

const headingRoutes = {
    '/admin-panel/users': "Пользователи"
} as const

export function Heading() {
    const pathname = usePathname() as keyof typeof headingRoutes;
    const matchedRoute = Object.entries(headingRoutes).find(([route]) =>
        pathname.startsWith(route)
    );
    const title = matchedRoute ? matchedRoute[1] : 'Админ-панель';
    return (
        <RadixHeading>{title}</RadixHeading>
    )
}