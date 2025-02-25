'use client'

import {Box, type BoxProps} from "@radix-ui/themes";
import {EditorContent, useCurrentEditor} from "@tiptap/react";


export type ContentProps = BoxProps & {
    name?: string;
}

export function Content({name, ...props}: ContentProps) {
    const {editor} = useCurrentEditor();

    return (
        <Box {...props}>
            <EditorContent editor={editor} style={{minHeight: '200px', padding: '8px'}}/>
            <input type="hidden" name={name} value={editor?.getHTML() || ''}/>
        </Box>
    )

}