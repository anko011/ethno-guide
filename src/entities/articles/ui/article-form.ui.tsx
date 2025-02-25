'use client';

import {type DetailedHTMLProps, type FormHTMLAttributes, useActionState} from "react";
import Form from "next/form";

import {Box, Flex, Text} from '@radix-ui/themes';

import {FormTextField} from "@/share/ui/form";
import {Editor} from "@/share/ui/editor";

import {type Article, type ArticleContentItem} from "../model/article";

function contentItemsToHtml(content?: ArticleContentItem[]): string {
    if (!Array.isArray(content) || content.length === 0) {
        return '';
    }
    return content.map(item => {
        if (item.type === 'heading') return `<h${item.level}>${item.text}</h${item.level}>`;
        if (item.type === 'paragraph') return `<p>${item.text}</p>`;
        if (item.type === 'list') return `<ul>${item.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
        if (item.type === 'image') return `<img src="${item.src}" alt="${item.src}" />`;
        return '';
    }).join('');
}

export type ArticleFormState = {
    title?: string;
    content?: string;
    author?: string;
} | null;

export type ArticleFormProps =
    Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'>
    & {
    action: (state: ArticleFormState) => Promise<ArticleFormState> | ArticleFormState;
    article?: Article;
};


export function ArticleForm({article, children, action, ...props}: ArticleFormProps) {
    const [formResult, dispatch, pending] = useActionState<ArticleFormState>(action, null);
    const articleContent = contentItemsToHtml(article?.content);

    return (
        <Flex direction="column" gap="2" asChild>
            <Form action={dispatch} {...props}>
                <FormTextField
                    label="Заголовок"
                    name="title"
                    placeholder="Введите заголовок"
                    type="text"
                    defaultValue={article?.title}
                    error={formResult?.title?.at(0)}
                    disabled={pending}
                />
                <Box>
                    <Text weight="medium" size="2">Содержимое</Text>

                    <Editor.Root content={articleContent} editable={!pending}>
                        <Editor.Toolbar/>
                        <Editor.Content/>
                    </Editor.Root>

                    {formResult?.content && <Text color="red" size="2">{formResult.content?.at(0)}</Text>}
                </Box>
                {children}
            </Form>
        </Flex>
    )
}