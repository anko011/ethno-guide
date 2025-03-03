import {Suspense} from "react";

import {Button, Flex, Skeleton} from "@radix-ui/themes";

import {ArticlesList, getArticlesPaginationInfo} from "@/entities/articles";

import {SearchField} from "@/share/ui/search-field";
import {Pagination} from "@/share/ui/pagination";
import {Link} from "@/share/ui/link";

const PAGE_SIZE = 7;

export default async function ArticlesPage(props: { searchParams: Promise<{ page?: string; query?: string }> }) {
    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const nationQuery = searchParams.get("nationId") || '';
    const {totalPages, totalItems} = await getArticlesPaginationInfo(currentPageParam, PAGE_SIZE, searchParams);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);

    return (
        <Flex direction="column" gap="2">
            <Flex justify="between" align="center">
                <SearchField.Root style={{width: 230}} placeholder="Введите заголовок статьи..."/>
                <Link href="/" asChild>
                    <Button variant="surface">Назад к карте</Button>
                </Link>
            </Flex>
            <Suspense key={`${totalPages}-${query}-${nationQuery}-${currentPage}-${totalItems}`}
                      fallback={
                          <Skeleton minHeight="556px"/>
                      }
            >
                <ArticlesList currentPage={currentPage} query={searchParams} pageSize={PAGE_SIZE}/>
                <Pagination currentPage={currentPage} totalPages={totalPages}/>
            </Suspense>
        </Flex>
    )
}