import {Flex} from "@radix-ui/themes";

import type {Article} from "../model/article";
import type {EditorContentItem} from "@/share/ui/editor"

import {TextContent, HeadingContent, ListContent, ImageContent, LinkContent} from '@/share/ui/editor'

export function ArticleContent({content}: { content?: EditorContentItem[] | string }) {
    if (typeof content === 'string') {
        return <TextContent>{content}</TextContent>;
    }

    if (!Array.isArray(content) || content.length === 0) {
        return <TextContent color="gray">Содержимое отсутствует</TextContent>
    }

    return content.map((item, index) => {
        switch (item.type) {
            case 'heading':
                return <HeadingContent level={item.level}>{item.text}</HeadingContent>
            case 'paragraph':
                return <TextContent>{item.text}</TextContent>;
            case 'list':
                return (
                    <ListContent.Root>
                        {item.items.map((listItem, i) => (
                            <ListContent.Item key={i}>{listItem}</ListContent.Item>
                        ))}
                    </ListContent.Root>
                )
                    ;
            case 'image':
                return <ImageContent key={index} src={item.src} alt={item.src || 'Изображение статьи'} width={item.width} height={item.height}/>
            case 'link':
                return <LinkContent href={item.href}/>;
            default:
                return null;
        }
    });
}

export function ArticleView({article}: { article: Article }) {
    return (
        <Flex direction="column" gap="2">
            <ArticleContent content={article.content}/>
        </Flex>
    )

}