//TODO: Типы рендеров относятся к редактору, но не к самой сущности статьи, т.е. ArticleContentItem переименовать и перенести в модуль editor

export type ArticleContentItem =
    | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'image'; src: string } //TODO: add alt attribute
    | { type: 'link'; text: string; href: string };

export type Article = {
    id: string;
    nationId: string; //TODO: Для одной нации может быть несколько статей, как и одна статья может относиться к нескольким нациями
    title: string;
    content: ArticleContentItem[];
    author: string;
};