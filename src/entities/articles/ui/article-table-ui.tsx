import {ReactNode} from "react";

import {Link, Table} from "@radix-ui/themes";

import {getNation} from "@/entities/nations";

import {type Article} from "../model/article";
import {getArticles} from "../api/repository";

export type ArticlesTableProps = {
    currentPage: number;
    actions?: (article: Article) => ReactNode;
    pageSize?: number;
    query?: string;
}

// TODO: Функции для получения данных хранятся в repository.ts
// TODO: Нации можно получить через Promise.all вызывая нации
// TODO: Если читал про FSD то на кросс импорт модулей забей
async function fetchNationsForArticles(articles: Article[]): Promise<Map<string, string>> {
    const nationIds = [...new Set(articles.map(article => article.nationId))]; // Уникальные nationId
    const nations = await Promise.all(nationIds.map(id => getNation(id)));
    const nationMap = new Map<string, string>();
    nations.forEach(nation => {
        if (nation) nationMap.set(nation.id, nation.name); // Предполагаем, что nation имеет id и name
    });
    return nationMap;
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
                        <Table.Cell>{nationMap.get(article.nationId) || 'Неизвестно'}</Table.Cell>
                        <Table.Cell>{article.author}</Table.Cell>

                        {!!actions && (<Table.Cell>{actions(article)}</Table.Cell>)}
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    )
}