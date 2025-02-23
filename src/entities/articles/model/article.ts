export type ContentItem =
    | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'image'; src: string }
    | { type: 'link'; text: string; href: string };

export type Article = {
    id: string;
    nationId: string;
    title: string;
    content: ContentItem[];
    author: string;
};