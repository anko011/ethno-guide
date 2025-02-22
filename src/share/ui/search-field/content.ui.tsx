'use client'

import {Box, BoxProps} from "@radix-ui/themes";
import * as React from "react";
import {useSearchFieldContext} from "@/share/ui/search-field/context";

export type ContentProps = BoxProps;

export function Content({children}: ContentProps) {
    const {query, focused} = useSearchFieldContext();
    if (!query || !focused) return null;

    return (
        <Box
            position="absolute"
            top="100%"
            left="0"
            right="0"
            mt="2"
            style={{
                background: 'var(--color-panel)',
                borderRadius: 'var(--radius-3)',
                boxShadow: 'var(--shadow-4)'
            }}
            maxHeight="300px"
            overflow="hidden"
        >
            {children}
        </Box>
    )
}