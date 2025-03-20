'use client';

import { useState } from "react";
import { Button, Dialog, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import {
    RiAlignCenter,
    RiAlignLeft,
    RiAlignRight,
    RiBold,
    RiDoubleQuotesL,
    RiH1,
    RiH2,
    RiH3,
    RiH4,
    RiH5,
    RiH6,
    RiImageLine,
    RiItalic,
    RiListOrdered,
    RiListUnordered,
    RiStrikethrough,
    RiUnderline,
} from 'react-icons/ri';
import {useCurrentEditor} from "@tiptap/react";
import {Editor} from "@tiptap/core";

import styles from './article-toolbar.module.css'

export type ToolbarProps = {
    editor?: Editor | null;
}
//DO: ДОНЯ РАЗБЕРИ ЭТО, КОШМАР, УЖАС, ГЛААААЗА МОИ ГЛААААЗАААА - есть
//DO: стили в классы, замени window.prompt на нормальную модалку стильную - есть
//DO: используй radix-theme для стилизации и общих компонетов div -> Box, Flex, Container, Section и подобные - есть
//DO: onClick не кидаются на div, используй интернактивные элементы типа <Button /> <IconButton /> - есть
// и т.д. иначе навигация по клаве перестает работать и нарушаешь спецификацию html
//DO: Пиши код так, что бы по коду было понятно, что делаешь, комменты только мешают, правильно декомпозируй, именуй - есть
//DO: Если используешь для компонентов анонимные функции то прописывай displayName поле компонента, или просто юзай function - есть


function TextFormattingSection({editor}: ToolbarProps) {
    if (!editor) return null;
    return (
        <Flex gap="2" align="center" className={styles.buttonGroup}>
            <IconButton
                variant="ghost"
                title="Жирный"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().toggleBold()}
                className={styles.icon}
            >
                <RiBold size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="Курсив"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().toggleItalic()}
                className={styles.icon}
            >
                <RiItalic size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="Подчеркнутый"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().toggleUnderline()}
                className={styles.icon}
            >
                <RiUnderline size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="Зачеркнутый"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().toggleStrike()}
                className={styles.icon}
            >
                <RiStrikethrough size={20} />
            </IconButton>
        </Flex>
    );
}

function HeadingSection({editor}: ToolbarProps) {
    if (!editor) return null;
    type Level = 1 | 2 | 3 | 4 | 5 | 6;
    return (
        <Flex gap="2" align="center" className={styles.buttonGroup}>
            {[1, 2, 3, 4, 5, 6].map(level => (
                <IconButton
                    key={level}
                    variant="ghost"
                    title={`Заголовок H${level}`}
                    onClick={() => editor.chain().focus().toggleHeading({ level: level as Level }).run()}
                    disabled={!editor.can().toggleHeading({ level: level as Level })}
                    className={styles.icon}
                >
                    {level === 1 ? <RiH1 size={20} /> : level === 2 ? <RiH2 size={20} /> :
                        level === 3 ? <RiH3 size={20} /> : level === 4 ? <RiH4 size={20} /> :
                            level === 5 ? <RiH5 size={20} /> : <RiH6 size={20} />}
                </IconButton>
            ))}
        </Flex>
    );
}

function ListSection({editor}: ToolbarProps) {
    if (!editor) return null; 
    return (
        <Flex gap="2" align="center" className={styles.buttonGroup}>
            <IconButton
                variant="ghost"
                title="Маркированный список"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().toggleBulletList()}
                className={styles.icon}
            >
                <RiListUnordered size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="Нумерованный список"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().toggleOrderedList()}
                className={styles.icon}
            >
                <RiListOrdered size={20} />
            </IconButton>
        </Flex>
    );
}

function InsertSection({editor}: ToolbarProps) {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    
    if (!editor) return null;
    
    const handleAddImage = () => {
        if (imageUrl && editor) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl("");
            setIsDialogOpen(false);
        }
    };

    return (
        <Flex gap="2" align="center" className={styles.buttonGroup}>
            <IconButton
                variant="ghost"
                title="Вставить изображение"
                onClick={() => setIsDialogOpen(true)}
                className={styles.icon}
            >
                <RiImageLine size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="Вставить цитату"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.can().toggleBlockquote()}
                className={styles.icon}
            >
                <RiDoubleQuotesL size={20} />
            </IconButton>

            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Добавить изображение</Dialog.Title>
                    <Dialog.Description>
                        Введите URL изображения, которое хотите добавить.
                    </Dialog.Description>
                    <Flex direction="column" gap="3" mt="4">
                            <TextField.Root
                                placeholder="Введите URL изображения"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                autoFocus
                            />
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Отмена
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button onClick={handleAddImage}>
                                Добавить
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );
}

function AlignmentSection({editor}: ToolbarProps) {
    if (!editor) return null;
    return (
        <Flex gap="2" align="center" className={styles.buttonGroup}>
            <IconButton
                variant="ghost"
                title="По левому краю"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={styles.icon}
            >
                <RiAlignLeft size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="По центру"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={styles.icon}
            >
                <RiAlignCenter size={20} />
            </IconButton>
            <IconButton
                variant="ghost"
                title="По правому краю"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={styles.icon}
            >
                <RiAlignRight size={20} />
            </IconButton>
        </Flex>
    );
}

export const Toolbar = () => {
    const {editor} = useCurrentEditor();
    if (!editor) return null;

    return (
        <Flex gap="3" p="2" justify="center" className={styles.toolbar}>
            <TextFormattingSection editor={editor} />
            <Text className={styles.divider}>|</Text>
            <HeadingSection editor={editor} />
            <Text className={styles.divider}>|</Text>
            <ListSection editor={editor} />
            <Text className={styles.divider}>|</Text>
            <InsertSection editor={editor} />
            <Text className={styles.divider}>|</Text>
            <AlignmentSection editor={editor} />
        </Flex>
    );
}