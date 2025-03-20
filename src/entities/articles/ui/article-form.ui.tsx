'use client';

import {type DetailedHTMLProps, type FormHTMLAttributes, useActionState} from "react";
import Form from "next/form";

import {Box, Flex, Text} from '@radix-ui/themes';

import {FormTextField} from "@/share/ui/form";
import {Editor} from "@/share/ui/editor";

import {type Article} from "../model/article";
import {contentItemsToHtml} from "@/share/ui/editor"

export type ArticleFormState = {
    title?: string[]; //DO: Тут я обычно юзаю массивы, а уже на самой форме решаю отображать все или только одну - есть
    content?: string[];
    authorId?: string[]; //DO: authorId наверное все таки - есть
} | null;

export type ArticleFormProps =
    Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'>
    & {
    action: (state: ArticleFormState) => Promise<ArticleFormState> | ArticleFormState;
    article?: Article;
};

//DO: Я удалил nationId, мне кажется что нации будет проставлять модератор, вдруг надо будет создать новые нации для статьи и автор явно не должен таким заниматься - есть
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