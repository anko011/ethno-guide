'use client'

import {useRouter} from "next/navigation";
import {Tooltip} from "@radix-ui/themes";

export type AdministrationAreaProps = {
    title: string;
    d: string;
    id: string;
}

export function AdministrationArea({title, d, id}: AdministrationAreaProps) {
    const {push} = useRouter();

    const searchParams = new URLSearchParams();
    searchParams.set('modal', 'true');

    const onClick = () => {
        push(`/areas/${id}?${searchParams}`);
    }

    return (
        <Tooltip content={title}>
            <path d={d} onClick={onClick} style={{pointerEvents: 'all'}}/>
        </Tooltip>
    )
}