//Лаврентьев - сделал здесь use client, т.к. не запускалось приложение после изменения редактора
'use client'

import {Box, BoxProps} from "@radix-ui/themes";
import {EditorContext, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";

export type RootProps = BoxProps & {
    content?: string;
    editable?: boolean
};

const EDITOR_EXTENSIONS = [
    StarterKit.configure({blockquote: false}),
    Image.configure({inline: false, allowBase64: true}),
    TextAlign.configure({types: ['heading', 'paragraph']}),
    Blockquote,
    Underline,
];

export function Root({children, content, editable, ...props}: RootProps) {
    const editor = useEditor({
        extensions: EDITOR_EXTENSIONS,
        content,
        editable,
        immediatelyRender: false,
    });

    return (
        <Box {...props}>
            <EditorContext.Provider value={{editor}}>
                {children}
            </EditorContext.Provider>
        </Box>
    )
}