'use client'

import * as React from "react";
import {Box, BoxProps, ScrollArea} from "@radix-ui/themes";

import {useSearchFieldContext} from "@/share/ui/search-field/context";

export type ContentProps = BoxProps & {
    alwaysOpen?: boolean;
    height?: string;
    zIndex?: number;
};

export function Content({children, height = 'auto', zIndex = 1, alwaysOpen = false, ...props}: ContentProps) {
    const {query, focused} = useSearchFieldContext();
    if (!alwaysOpen && (!query || !focused)) return null;

    return (
        <Box top="100%"
             left="0"
             right="0"
             style={{position: 'absolute', zIndex, backgroundColor: 'var(--gray-a3)'}}
             {...props}
        >
            <ScrollArea
                style={{height}}
            >
                <Box>
                    {children}
                </Box>
            </ScrollArea>
        </Box>
    )
}