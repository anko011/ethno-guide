export type EditorContentItem =
    | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'image'; src: string; alt: string; width?: number; height?: number} //DO: add alt attribute - есть
    | { type: 'link'; text: string; href: string };
