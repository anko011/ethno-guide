import { Table, Flex, Button} from "@radix-ui/themes";
import {ArticleStatus, fetchNationsForArticles, findArticles} from "@/entities/articles";
// import { Editor } from "@/share/ui/editor";

export type ArticleModerationProps = {
    currentPage: number;
    pageSize?: number;
    query?: URLSearchParams;
};

export async function ArticleModeration({ currentPage, pageSize = 10, query = new URLSearchParams() }: ArticleModerationProps) {
    // Фильтруем статьи по статусу Pending
    const filteredQuery = new URLSearchParams(query);
    filteredQuery.set("status", ArticleStatus.PENDING);

    const articles = await findArticles(currentPage, pageSize, filteredQuery); // Используем filteredQuery
    const nationMap = await fetchNationsForArticles(articles);
    
    // // Получаем ID выбранной статьи из параметров URL (например, ?articleId=1)
    // const selectedArticleId = query.get("articleId");
    // const selectedArticle = selectedArticleId ? articles.find(article => article.id === selectedArticleId) : null;

    return (
        <Flex direction="column" gap="3">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Заголовок</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Народность</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Автор</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Статус</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Действия</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {articles.map((article) => (
                        <Table.Row key={article.id}>
                            <Table.Cell>{article.title}</Table.Cell>
                            <Table.Cell>{article.nationId.map(id => nationMap.get(id) || 'Неизвестно').join(', ') || 'Неизвестно'}</Table.Cell>
                            <Table.Cell>{article.authorId}</Table.Cell>
                            <Table.Cell>{article.status}</Table.Cell>
                            <Table.Cell>
                                <Flex gap="3">
                                    <Button>Принять</Button>
                                    <Button>Отклонить</Button>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
}