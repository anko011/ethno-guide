'use client'

import {TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export type SearchFieldProps = TextField.RootProps

export function SearchField({placeholder, ...props}: SearchFieldProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <TextField.Root placeholder={placeholder}
                        defaultValue={searchParams.get("query")?.toString()}
                        onChange={(e) => handleSearch(e.target.value)}
                        {...props}
        >
            <TextField.Slot side="left">
                <MagnifyingGlassIcon/>
            </TextField.Slot>
        </TextField.Root>
    )
}