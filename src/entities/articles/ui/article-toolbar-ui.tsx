'use client';

import { Flex } from '@radix-ui/themes';
import { useEditor } from '@tiptap/react';
import {
    RiBold,
    RiItalic,
    RiStrikethrough,
    RiUnderline,
    RiH1,
    RiH2,
    RiH3,
    RiH4,
    RiH5,
    RiH6,
    RiListOrdered,
    RiListUnordered,
    RiImageLine,
    RiDoubleQuotesL,
    RiAlignLeft,
    RiAlignCenter,
    RiAlignRight,
    RiFormatClear,
} from 'react-icons/ri';
import styles from './article-toolbar.module.css'

export const Toolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('Введите URL изображения');
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    return (
        <Flex gap="3" p="2" style={{justifyContent: 'center', borderBottom: '1px solid #e1e1e1', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            {/* Группа 1: Форматирование текста */}
            <Flex gap="2" align="center" style={{ padding: '2px', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
                <div className={styles.icon}
                    title='Жирный'
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    // disabled={!editor.can().chain().focus().toggleBold().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiBold style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Курсив'
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    // disabled={!editor.can().chain().focus().toggleItalic().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiItalic style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Подчеркнутый'
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    // disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiUnderline style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Зачеркнутый'
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    // disabled={!editor.can().chain().focus().toggleStrike().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiStrikethrough style={{ fontSize: '20px' }} />
                </div>
            </Flex>

            <span style={{ color: '#e1e1e1', fontSize: '20px', margin: '0 3px' }}>|</span> {/* Разделитель с большим отступом */}

            {/* Группа 2: Заголовки */}
            <Flex gap="2" align="center" style={{ padding: '2px', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
                <div className={styles.icon}
                    title='Заголовок H1'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    // disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiH1 style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Заголовок H1'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    // disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiH2 style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Заголовок H2'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    // disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiH3 style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Заголовок H3'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    // disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiH4 style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Заголовок H4'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    // disabled={!editor.can().chain().focus().toggleHeading({ level: 5 }).run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiH5 style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Заголовок H5'
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    // disabled={!editor.can().chain().focus().toggleHeading({ level: 6 }).run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiH6 style={{ fontSize: '20px' }} />
                </div>
            </Flex>

            <span style={{ color: '#e1e1e1', fontSize: '20px', margin: '0 3px' }}>|</span> {/* Разделитель с большим отступом */}

            {/* Группа 3: Списки */}
            <Flex gap="2" align="center" style={{ padding: '2px', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
                <div className={styles.icon}
                    title='Маркированный список'
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    // disabled={!editor.can().chain().focus().toggleBulletList().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiListUnordered style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Нумерованный список'
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    // disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiListOrdered style={{ fontSize: '20px' }} />
                </div>
            </Flex>

            <span style={{ color: '#e1e1e1', fontSize: '20px', margin: '0 3px' }}>|</span> {/* Разделитель с большим отступом */}

            {/* Группа 4: Вставка */}
            <Flex gap="2" align="center" style={{ padding: '2px', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
                <div className={styles.icon}
                    title = 'Вставить изображение'
                    onClick={addImage}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiImageLine style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='Вставить цитату'
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    // disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiDoubleQuotesL style={{ fontSize: '20px' }} />
                </div>
            </Flex>

            <span style={{ color: '#e1e1e1', fontSize: '20px', margin: '0 3px' }}>|</span> {/* Разделитель с большим отступом */}

            {/* Группа 5: Выравнивание */}
            <Flex gap="2" align="center" style={{ padding: '2px', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
                <div className={styles.icon}
                    title='По левому краю'
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    // disabled={!editor.can().chain().focus().setTextAlign('left').run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiAlignLeft style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='По центру'
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    // disabled={!editor.can().chain().focus().setTextAlign('center').run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiAlignCenter style={{ fontSize: '20px' }} />
                </div>
                <div className={styles.icon}
                    title='По правому краю'
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    // disabled={!editor.can().chain().focus().setTextAlign('right').run()}
                    // style={{ color: '#333', padding: '6px' }}
                >
                    <RiAlignRight style={{ fontSize: '20px' }} />
                </div>
            </Flex>
        </Flex>
    );
};