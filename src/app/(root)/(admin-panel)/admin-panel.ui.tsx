'use client'

import {BookmarkIcon, PersonIcon, TableIcon} from "@radix-ui/react-icons";

import {Navigation} from "@/share/ui/navigation";
import {useParams} from "next/navigation";

const ADMIN_PANEL_NAVIGATION_ITEMS = [
    {slug: 'users', icon: PersonIcon, label: "Пользователи"},
    {slug: 'areas', icon: TableIcon, label: "Регионы"},
    {slug: 'nations', icon: BookmarkIcon, label: "Народности"},
    {slug: 'articles', icon: PersonIcon, label: "Статьи"},
] as const;

export function AdminPanelNavigation() {
    const slug = useParams().catchAll?.at(-1) ?? '';
    return (
        <Navigation.Root>
            {ADMIN_PANEL_NAVIGATION_ITEMS.map((item) => (
                <Navigation.Item
                    key={item.slug}
                    href={`/admin-panel/${item.slug}`}
                    isActive={item.slug === slug}
                >
                    <item.icon/>
                    {item.label}
                </Navigation.Item>
            ))}
        </Navigation.Root>
    )
}
