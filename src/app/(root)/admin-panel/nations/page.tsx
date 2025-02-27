import {Suspense} from "react";

import {Flex, Skeleton} from '@radix-ui/themes'

import {CreateNationButton} from "@/features/nations/create";
import {EditNationButton} from "@/features/nations/edit";
import {DeleteNationButton} from "@/features/nations/delete";
import {getNationsPaginationInfo, NationsTable} from "@/entities/nations";
import {Pagination} from "@/share/ui/pagination";
import {SearchField} from "@/share/ui/search-field";

const PAGE_SIZE = 10;

export default async function NationsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const {totalPages, totalItems} = await getNationsPaginationInfo(currentPageParam, PAGE_SIZE, query);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);

    return (
        <Flex direction="column" gap="4">
            <Flex gap="2">
                <CreateNationButton searchParams={searchParams}/>
                <SearchField.Root style={{width: 230}} placeholder="Введите название нации..."/>
            </Flex>

            <Suspense key={`${totalPages}-${query}-${currentPage}-${totalItems}`}
                      fallback={<Skeleton minHeight="556px"/>}
            >
                <Flex direction="column" gap="2">
                    <NationsTable currentPage={currentPage}
                                  pageSize={PAGE_SIZE}
                                  query={query}
                                  actions={(nation) => (
                                      <Flex gap="2">
                                          <EditNationButton nationId={nation.id} searchParams={searchParams}/>
                                          <DeleteNationButton nationId={nation.id} searchParams={searchParams}/>
                                      </Flex>
                                  )}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </Flex>
            </Suspense>
        </Flex>
    )
}
