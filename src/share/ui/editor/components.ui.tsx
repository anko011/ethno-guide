import {ReactNode} from "react";
import Image, {ImageProps} from "next/image";

import {Link, LinkProps} from "@/share/ui/link";

import {Box, Heading, HeadingProps, Text, TextProps} from "@radix-ui/themes";

//DO: Это надо перенести в модуль editor - есть
//DO: обрати внимание на картинки, используется Image из nextjs, он проводит оптимизацию картинок,
// но для этого еще надо знать размеры картинок, подумай, о том как их получать и хранить,
// в целом планируй на то, что будем использовать не ссылки на картинки, а сами заружать их на свой сервер
// есть, можно сказать пока только подумал

export function TextContent({children, ...props}: TextProps) {
    return <Text as="p" size="3" {...props}>{children}</Text>;
}

export function HeadingContent({children, level, ...props}: HeadingProps & { level: number }) {
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

export const ListContent = {
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

export function ImageContent({alt, src, width, height, ...props}: ImageProps & { src: string; alt: string; width?: number; height?: number }) {
    // Лаврентьев. Размер по умолчанию 500
    const imageWidth = width || 500;
    const imageHeight = height || 350;
    
    return (
        <Box position="relative" width={`${imageWidth}px`} height={`${imageHeight}px`}>
            <Image src={src} width={imageWidth} height={imageHeight} alt={alt} objectFit="cover" objectPosition="center" {...props}/>
        </Box>
    )
}

export function LinkContent({children, ...props}: LinkProps) {
    return (
        <Link  {...props}>
            <Text size="3" mt="2" style={{color: '#007bff', textDecoration: 'underline'}}>
                {children}
            </Text>
        </Link>
    )
}