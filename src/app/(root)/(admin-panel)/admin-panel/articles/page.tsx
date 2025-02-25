import {Suspense} from "react";

import {Flex, Skeleton} from '@radix-ui/themes'

import {DeleteArticleButton} from "@/features/articles/delete";
import {CreateArticleButton} from "@/features/articles/create";
import {EditArticleButton} from "@/features/articles/edit";

import {ArticlesTable, getArticlesPaginationInfo} from "@/entities/articles";

import {Pagination} from "@/share/ui/pagination";
import {SearchField} from "@/share/ui/search-field";

const PAGE_SIZE = 10;

export default async function ArticlesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const {totalPages, totalItems} = await getArticlesPaginationInfo(currentPageParam, PAGE_SIZE, searchParams);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);

    return (
        <Flex direction="column" gap="4">

            <Flex gap="2">
                <CreateArticleButton nationId="" searchParams={searchParams}/>
                <SearchField.Root style={{width: 230}} placeholder="Введите заголовок статьи..."/>
            </Flex>

            <Suspense key={`${totalPages}-${query}-${currentPage}-${totalItems}`}
                      fallback={<Skeleton minHeight="556px"/>}
            >
                <Flex direction="column" gap="2">
                    <ArticlesTable currentPage={currentPage}
                                   pageSize={PAGE_SIZE}
                                   query={query}
                                   actions={(article) => (
                                       <Flex gap="2">
                                           <EditArticleButton articleId={article.id} searchParams={searchParams}/>
                                           <DeleteArticleButton articleId={article.id} searchParams={searchParams}/>
                                       </Flex>
                                   )}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </Flex>
            </Suspense>
        </Flex>
    )
}
