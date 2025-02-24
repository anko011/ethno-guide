// src/app/articles/[id]/page.tsx
import { getArticle, getArticleByNationId} from "@/entities/articles/api/repository";
import { Article, ContentItem } from "@/entities/articles/model/article";
import { CreateArticleButton } from "@/features/articles/create";
import { DeleteArticleButton } from "@/features/articles/delete";
import { EditArticleButton } from "@/features/articles/edit";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Heading, Flex, Text, Box, Card, Callout, Button, } from '@radix-ui/themes';
import Link from 'next/link';

function renderContent(content: ContentItem[] | string | undefined) {
    if (typeof content === 'string') {
        return <Text as="p" size="3" mt="2">{content}</Text>;
    }
    if (!Array.isArray(content)) {
        return <Text as="p" size="3" color="gray">Содержимое отсутствует</Text>;
    }

    return content.map((item, index) => {
        switch (item.type) {
            case 'heading':
                return (
                    <Heading
                        key={index}
                        size={String(item.level) as "1" | "2" | "3" | "4" | "5" | "6"}
                        mt="2"
                    >
                        {item.text}
                    </Heading>
                );
            case 'paragraph':
                return <Text key={index} as="p" size="3" mt="2">{item.text}</Text>;
            case 'list':
                return (
                    <ul key={index} style={{ marginTop: '8px', paddingLeft: '16px', listStyleType: 'disc' }}>
                        {item.items.map((listItem, i) => (
                            <li key={i} style={{ fontSize: '16px', lineHeight: '1.5' }}>{listItem}</li>
                        ))}
                    </ul>
                );
            case 'image':
                return <img key={index} src={item.src} alt={item.src} style={{ maxWidth: '100%', marginTop: '8px' }} />;
            case 'link':
                return (
                    <Link key={index} href={item.href} passHref>
                        <Text size="3" mt="2" style={{ color: '#007bff', textDecoration: 'underline' }}>
                            {item.text}
                        </Text>
                    </Link>
                );
            default:
                return null;
        }
    });
}

export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const article = await getArticleByNationId(id);


    if (!article) {
        return (
            <Box p="5" style={{ display: 'flex', justifyContent: 'center', minWidth: '80%' }}>
                <Card size="3" mt="5" style={{ width: '100%', maxWidth: '1000px', minHeight: '500px' }}>
                    <Flex direction="column" gap="4" p="6" justify="between" style={{ minHeight: '100%' }}>
                        <Flex direction="column" gap="4">
                            <Heading size="6">Статья отсутствует</Heading>
                            <Callout.Root color="gray" style={{ minHeight: '100px', display: 'flex' }}>
                                <Callout.Icon>
                                    <InfoCircledIcon />
                                </Callout.Icon>
                                <Callout.Text size="3">
                                    Статья для этого народа ещё не создана. <br />
                                    Вы можете создать новую статью или вернуться на главную страницу.
                                </Callout.Text>
                            </Callout.Root>
                        </Flex>
                        <Flex gap="3" mt="4">
                            <Link href="/">
                                <Button variant="soft" color="gray" size="2">
                                    Вернуться назад
                                </Button>
                            </Link>
                            <CreateArticleButton nationId={id} size="2" />
                        </Flex>
                    </Flex>
                </Card>
            </Box>
        );
    }

    return (
        <Box p="5" style={{ display: 'flex', justifyContent: 'center', minWidth: '80%' }}>
            <Card size="3" mt="5" style={{ width: '100%', maxWidth: '1000px', minHeight: '500px' }}>
                <Flex direction="column" gap="4" p="6" justify="between" style={{ minHeight: '100%' }}>
                    <Flex direction="column" gap="4">
                        <Heading size="6">{article.title}</Heading>
                        <Text as="p" size="2" color="gray">Автор: {article.author}</Text>
                        {renderContent(article.content)}
                    </Flex>
                    <Flex gap="2" mt="4">
                        <Link href="/">
                            <Button variant="soft" color="gray">
                                Вернуться назад
                            </Button>
                        </Link>
                        <EditArticleButton articleId={article.id} />
                    </Flex>
                </Flex>
            </Card>
        </Box>
    );
}