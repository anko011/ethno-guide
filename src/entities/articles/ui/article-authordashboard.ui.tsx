import { ReactNode } from "react";
import { Table, Text } from "@radix-ui/themes";
import { Link } from "@/share/ui/link";
import { type Article } from "../model/article";
import { findArticles, fetchNationsForArticles } from "../api/repository";

export type ArticleAuthorDashboardProps = {
    currentPage: number;
    actions?: (article: Article) => ReactNode;
    pageSize?: number;
    query?: URLSearchParams;
    userId?: string; // Для фильтрации по автору
};

export async function ArticleAuthorDashboard({ currentPage, pageSize = 10, query = new URLSearchParams(), userId, actions }: ArticleAuthorDashboardProps) {
    // Фильтруем статьи по authorId, если указан
    const filteredQuery = new URLSearchParams(query);
    if (userId) {
        filteredQuery.set("authorId", userId);
    }
    const articles = await findArticles(currentPage, pageSize, filteredQuery); // Используем filteredQuery
    const nationMap = await fetchNationsForArticles(articles);
    return (
        <Table.Root size="1">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Заголовок</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Народность</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Автор</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Статус</Table.ColumnHeaderCell>
                            {!!actions && (<Table.ColumnHeaderCell width="72px"/>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                {articles.map((article) => (
                    <Table.Row key={article.id}>
                        <Table.RowHeaderCell>
                            <Link href={`/articles/${article.id}`}>
                                {article.title}
                            </Link>
                        </Table.RowHeaderCell>
                        <Table.Cell>{article.nationId.map(id => nationMap.get(id) || 'Неизвестно').join(', ') || 'Неизвестно'}</Table.Cell>
                        <Table.Cell>{article.authorId}</Table.Cell>
                        <Table.Cell>{article.status}{article.rejectionReason && <Text color="red"> ({article.rejectionReason})</Text>}</Table.Cell>
                        <Table.Cell>{actions ? actions(article) : null}</Table.Cell>
                        
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    );
}