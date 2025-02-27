import {notFound} from "next/navigation";

import {Box, Button, Card, Flex, Heading, ScrollArea, Separator, Text,} from '@radix-ui/themes';
import {ArticleView, getAllArticles, getArticleByNationId} from "@/entities/articles";
import {Link} from "@/share/ui/link";
import {EditArticleButton} from "@/features/articles/edit";

export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map(({id}) => ({id}));
}

export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
    const {id} = await props.params;
    const article = await getArticleByNationId(id);

    if (!article) notFound();

    return (
        <Flex asChild height="100%">
            <Card size="2">
                <Flex align="center" justify="between">
                    <Flex direction="column" gap="2">
                        <Heading size="6">{article.title}</Heading>
                        <Text as="p" size="2" color="gray">Автор: {article.author}</Text>
                    </Flex>

                    <Flex gap="2" justify="between">
                        <Link href="/" asChild>
                            <Button variant="soft" color="gray">
                                Вернуться назад
                            </Button>
                        </Link>
                        <EditArticleButton articleId={article.id}/>
                    </Flex>
                </Flex>

                <Separator size="4" my="4"/>

                <Box maxHeight="80vh" asChild>
                    <ScrollArea>
                        <ArticleView article={article}/>
                    </ScrollArea>
                </Box>
            </Card>
        </Flex>
    );
}