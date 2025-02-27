'use client';

import {type DetailedHTMLProps, type FormHTMLAttributes, useActionState} from "react";
import Form from "next/form";

import {Box, Flex, Text} from '@radix-ui/themes';

import {FormTextField} from "@/share/ui/form";
import {Editor} from "@/share/ui/editor";

import {type Article, type ArticleContentItem} from "../model/article";

//TODO: Типы рендеров относятся к редактору, но не к самой сущности статьи, т.е. ARTICLE_CONTENT_ITEM переименовать и перенести в модуль editor
//TODO: уточни по редактору исключительно нативная верстка? Или можно использовать Radix ui иначе тема по сайту будет не консистентная
function contentItemsToHtml(content?: ArticleContentItem[]): string {
    if (!Array.isArray(content) || content.length === 0) {
        return '';
    }
    return content.map(item => {
        if (item.type === 'heading') return `<h${item.level}>${item.text}</h${item.level}>`;
        if (item.type === 'paragraph') return `<p>${item.text}</p>`;
        if (item.type === 'list') return `<ul>${item.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
        if (item.type === 'image') return `<img src="${item.src}" alt="ТУТ НАДО ОПИСАНИЕ" />`;
        return '';
    }).join('');
}

export type ArticleFormState = {
    title?: string; //TODO: Тут я обычно юзаю массивы, а уже на самой форме решаю отображать все или только одну
    content?: string;
    author?: string; //TODO: authorId наверное все таки
} | null;

export type ArticleFormProps =
    Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'>
    & {
    action: (state: ArticleFormState) => Promise<ArticleFormState> | ArticleFormState;
    article?: Article;
};

//TODO: Я удалил nationId, мне кажется что нации будет проставлять модератор, вдруг надо будет создать новые нации для статьи и автор явно не должен таким заниматься
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