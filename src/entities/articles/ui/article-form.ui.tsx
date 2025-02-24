'use client';

import { type DetailedHTMLProps, type FormHTMLAttributes, useActionState, useState } from "react";
import { Button, Flex, Text } from '@radix-ui/themes';
import { type Article, type ContentItem } from "../model/article";
import { FormTextField } from "@/share/ui/form";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'; // Добавляем импорт StarterKit
import Image from '@tiptap/extension-image'; // Убедимся, что все расширения импортированы
import TextAlign from '@tiptap/extension-text-align';
import Blockquote from '@tiptap/extension-blockquote';
import Underline from '@tiptap/extension-underline';
import { Toolbar } from './article-toolbar-ui'; // Импортируем Toolbar из нового файла


// Преобразование HTML из TipTap в ContentItem[]
function parseHtmlToItems(html: string): ContentItem[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const items: ContentItem[] = [];

    const processNode = (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.tagName.match(/^H[1-6]$/)) {
                const level = parseInt(element.tagName[1]) as 1 | 2 | 3 | 4 | 5 | 6;
                items.push({ type: 'heading', level, text: element.textContent || '' });
            } else if (element.tagName === 'P') {
                items.push({ type: 'paragraph', text: element.textContent || '' });
            } else if (element.tagName === 'UL') {
                const listItems = Array.from(element.getElementsByTagName('li')).map(li => li.textContent || '');
                items.push({ type: 'list', items: listItems });
            } else if (element.tagName === 'IMG') {
                items.push({ type: 'image', src: element.getAttribute('src') || '' });
            }
            element.childNodes.forEach(processNode);
        }
    };

    doc.body.childNodes.forEach(processNode);
    return items;
}

// Преобразование ContentItem[] в HTML для TipTap
function contentItemsToHtml(content: ContentItem[] | undefined): string {
    if (!Array.isArray(content) || content.length === 0) {
        return ''; // Возвращаем пустую строку, если content отсутствует или не массив
    }
    return content.map(item => {
        if (item.type === 'heading') return `<h${item.level}>${item.text}</h${item.level}>`;
        if (item.type === 'paragraph') return `<p>${item.text}</p>`;
        if (item.type === 'list') return `<ul>${item.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
        if (item.type === 'image') return `<img src="${item.src}" />`;
        return '';
    }).join('');
}

export type ArticleFormState = {
    title?: string;
    content?: string;
    author?: string;
    nationId?: string;
} | null;

export type ArticleFormProps = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'> & {
    action: (state: ArticleFormState) => Promise<ArticleFormState> | ArticleFormState;
    article?: Article;
    nationId?: string;
};

export function ArticleForm({article, nationId, children, action, ...props}: ArticleFormProps) {
    const [formResult, act, pending] = useActionState<ArticleFormState>(action, null);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({ inline: false, allowBase64: true }),
            // Link.configure({ openOnClick: false }), // Убедились, что Link настроен
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Blockquote,
            Underline,
        ],
        content: article ? contentItemsToHtml(article.content) : '',
        editable: !pending,
    });

    return (
        <Flex direction="column" gap="2" asChild style={{ width: '100%', maxWidth: '1200px' }}>
            <form action={act} {...props}>
                <FormTextField
                    label="Заголовок"
                    name="title"
                    placeholder="Введите заголовок"
                    type="text"
                    defaultValue={article?.title}
                    error={formResult?.title?.at(0)}
                    disabled={pending}
                />
                <div>
                    <Text as="label" size="2" weight="bold">Содержимое</Text>
                    <div style={{ border: '1px solid #ccc' }}>
                        <Toolbar editor={editor} />
                        <EditorContent editor={editor} style={{ minHeight: '200px', padding: '8px' }} />
                    </div>
                    <input type="hidden" name="content" value={editor?.getHTML() || ''} />
                    {formResult?.content && <Text color="red" size="2">{formResult.content}</Text>}
                </div>
                {/* ОНТОН СЮДА ПЕРЕДАВАТЬ ПОХОДУ ПОЛЬЗОВАТЕЛЯ, НО ЭТО ПОТОМ УЖЕ КОГДА БД БУДЕТ НАВЕРНА */}
                <FormTextField
                    label="Автор"
                    name="author"
                    placeholder="Введите автора"
                    type="text"
                    defaultValue={article?.author}
                    error={formResult?.author?.at(0)}
                    disabled={pending}
                />
                <FormTextField
                    label="Народ"
                    name="nationId"
                    defaultValue={nationId ?? article?.nationId}
                    type="text"
                    disabled={pending}
                    error={formResult?.nationId?.at(0)}
                />
                {children}
            </form>
        </Flex>
    )
}