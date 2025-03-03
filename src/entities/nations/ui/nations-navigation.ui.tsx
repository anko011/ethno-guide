'use client'

import {useSearchParams} from "next/navigation";
import {Box, type BoxProps, Heading} from "@radix-ui/themes";

import {Navigation} from "@/share/ui/navigation";

import {type Nation} from "../model/nation";

export type NationsNavigationListProps = BoxProps & {
    nations: Nation[];
    slug: string;
}

export function NationsNavigationList({nations, slug, ...props}: NationsNavigationListProps) {
    const param = useSearchParams();
    const activeId = param.get('nationId');

    const searchParam = new URLSearchParams();

    const data = nations.map((nation) => {
        searchParam.set('nationId', nation.id);
        return {
            ...nation,
            href: `${slug}?${searchParam.toString()}`,
            isActive: activeId === nation.id,
        }
    })

    searchParam.delete('nationId');

    return (
        <Box {...props}>
            <Navigation.Root>
                {data.map((item) => (
                    <Navigation.Item key={item.id}
                                     href={item.href}
                                     isActive={item.isActive}
                    >
                        {item.name}
                    </Navigation.Item>
                ))}
            </Navigation.Root>
        </Box>
    )
}
