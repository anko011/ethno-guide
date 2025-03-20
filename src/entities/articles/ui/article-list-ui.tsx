import {ReactNode} from "react";

import {Card, DataList, Flex} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

import {type Article} from "../model/article";
import {findArticles, fetchNationsForArticles} from '../api/repository';

export type ArticleListProps = {
    currentPage: number;
    actions?: (article: Article) => ReactNode;
    pageSize?: number;
    query?: URLSearchParams;
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
                            <DataList.Value>{article.authorId}</DataList.Value>
                        </DataList.Item>

                        <DataList.Item>
                            <DataList.Label>Нация</DataList.Label>
                            <DataList.Value>{article.nationId.map(id => nationMap.get(id) || 'Неизвестно').join(', ') || 'Неизвестно'}</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Card>
            ))}
        </Flex>
    )
}