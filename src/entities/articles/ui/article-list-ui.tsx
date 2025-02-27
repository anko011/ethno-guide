import {ReactNode} from "react";

import {Card, DataList, Flex} from "@radix-ui/themes";

import {getNation} from "@/entities/nations";
import {Link} from "@/share/ui/link";

import {type Article} from "../model/article";
import {findArticles} from '../api/repository';

export type ArticleListProps = {
    currentPage: number;
    actions?: (article: Article) => ReactNode;
    pageSize?: number;
    query?: URLSearchParams;
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

export async function ArticlesList({currentPage, pageSize = 10, query = new URLSearchParams()}: ArticleListProps) {
    const articles = await findArticles(currentPage, pageSize, query);
    const nationMap = await fetchNationsForArticles(articles);
    return (
        <Flex direction="column" gap="1">
            {articles.map((article) => (
                <Card key={article.id}>
                    <DataList.Root>
                        <DataList.Item>
                            <DataList.Label>Название</DataList.Label>
                            <DataList.Value>
                                <Link href={`/articles/${article.id}`}>
                                    {article.title}
                                </Link>
                            </DataList.Value>
                        </DataList.Item>

                        <DataList.Item>
                            <DataList.Label>Автор</DataList.Label>
                            <DataList.Value>{article.author}</DataList.Value>
                        </DataList.Item>

                        <DataList.Item>
                            <DataList.Label>Нация</DataList.Label>
                            <DataList.Value>{nationMap.get(article.id) ?? 'Неизвестно'}</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Card>
            ))}
        </Flex>
    )
}