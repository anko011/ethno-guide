import {ReactNode} from "react";
import Image, {ImageProps} from "next/image";

import {Box, Flex, Heading, HeadingProps, Text, TextProps} from "@radix-ui/themes";

import {Link, LinkProps} from "@/share/ui/link";

import type {Article, ArticleContentItem} from "../model/article";

//TODO: Это надо перенести в модуль editor
//TODO: обрати внимание на картинки, используется Image из nextjs, он проводит оптимизацию картинок,
// но для этого еще надо знать размеры картинок, подумай, о том как их получать и хранить,
// в целом планируй на то, что будем использовать не ссылки на картинки, а сами заружать их на свой сервер

function TextContent({children, ...props}: TextProps) {
    return <Text as="p" size="3" {...props}>{children}</Text>;
}

function HeadingContent({children, level, ...props}: HeadingProps & { level: number }) {
    return (
        <Heading
            size={level.toString() as HeadingProps['size']}
            mt="2"
            {...props}
        >
            {children}
        </Heading>
    )
}

const ListContent = {
    Root: function ({children}: { children?: ReactNode }) {
        return (
            <ul style={{marginTop: '8px', paddingLeft: '16px', listStyleType: 'disc'}}>
                {children}
            </ul>
        )
    },
    Item: function ({children}: { children?: ReactNode }) {
        return <li style={{fontSize: '16px', lineHeight: '1.5'}}>{children}</li>
    }
}

function ImageContent({alt, ...props}: ImageProps) {
    return (
        <Box position="relative" width="500px" height="500px">
            <Image alt={alt} objectFit="cover" objectPosition="center" fill {...props}/>
        </Box>
    )
}

function LinkContent({children, ...props}: LinkProps) {
    return (
        <Link  {...props}>
            <Text size="3" mt="2" style={{color: '#007bff', textDecoration: 'underline'}}>
                {children}
            </Text>
        </Link>
    )
}


export function ArticleContent({content}: { content?: ArticleContentItem[] | string }) {
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
                return <ImageContent key={index} src={item.src} alt={item.src}/>
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