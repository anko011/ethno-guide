//DO: Типы рендеров относятся к редактору, но не к самой сущности статьи, т.е. ArticleContentItem переименовать и перенести в модуль editor - есть
import {type EditorContentItem} from "@/share/ui/editor"

export type Article = {
    id: string;
    nationId: string[]; //DO: Для одной нации может быть несколько статей, как и одна статья может относиться к нескольким нациями - есть
    title: string;
    content: EditorContentItem[];
    authorId: string;
};