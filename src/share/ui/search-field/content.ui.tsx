'use client'

import * as React from "react";
import {Box, BoxProps, ScrollArea} from "@radix-ui/themes";

import {useSearchFieldContext} from "@/share/ui/search-field/context";

export type ContentProps = BoxProps;

export function Content({children}: ContentProps) {
    const {query, focused} = useSearchFieldContext();
    if (!query || !focused) return null;

    return (
        <Box top="100%"
             left="0"
             right="0"
             mt="1"
             style={{position: 'absolute'}}
        >
            <ScrollArea
                style={{height: '75vh'}}
            >
                <Box style={{background: 'var(--gray-a3)'}}>
                    {children}
                </Box>
            </ScrollArea>
        </Box>
    )
}