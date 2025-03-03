'use client'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {use, useTransition} from "react";

import {RadioCards, Text} from "@radix-ui/themes";

import {type Nation} from "../model/nation";

export function NationSelectList({data}: { data: Promise<Nation[]> }) {
    const nations = use(data);

    const searchParams = new URLSearchParams(useSearchParams());
    const pathname = usePathname();
    const {replace} = useRouter();

    const [pending, startTransition] = useTransition();

    const selectedId = searchParams.get("selectedNationId") ?? '';

    const onClick = (id: string) => {
        if (selectedId === id) {
            searchParams.delete('selectedNationId');
        } else {
            searchParams.set('selectedNationId', id);
        }
        startTransition(() => {
            replace(`${pathname}?${searchParams}`);
        })

    }

    return (
        <RadioCards.Root size="1" gap="1">
            {nations.map((nation) => (
                <RadioCards.Item key={nation.id}
                                 value={nation.id}
                                 onClick={() => onClick?.(nation.id)}
                                 checked={selectedId === nation.id}
                                 disabled={pending}
                >
                    <Text>{nation.name}</Text>
                </RadioCards.Item>
            ))}
        </RadioCards.Root>
    )
}
