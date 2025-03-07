import { EditorContentItem } from "./editor";

//DO: Типы рендеров относятся к редактору, но не к самой сущности статьи, т.е. ARTICLE_CONTENT_ITEM переименовать и перенести в модуль editor - есть?
//DO: уточни по редактору исключительно нативная верстка? Или можно использовать Radix ui иначе тема по сайту будет не консистентная - к сожалению, нельзя
export function contentItemsToHtml(content?: EditorContentItem[]): string {
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