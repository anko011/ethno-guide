import {ReactNode} from "react";

import {Link, Table} from "@radix-ui/themes";

import {type Article} from "../model/article";
import {getArticles, fetchNationsForArticles} from "../api/repository";

export type ArticlesTableProps = {
    currentPage: number;
    actions?: (article: Article) => ReactNode;
    pageSize?: number;
    query?: string;
}

export async function ArticlesTable({actions, currentPage, pageSize = 10, query = ''}: ArticlesTableProps) {
    const articles = await getArticles(currentPage, pageSize, query);
    const nationMap = await fetchNationsForArticles(articles);
    return (
        <Table.Root size="1">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Заголовок</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Народность</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Автор</Table.ColumnHeaderCell>
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

                        {!!actions && (<Table.Cell>{actions(article)}</Table.Cell>)}
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    )
}