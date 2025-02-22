import {Suspense} from "react";

import {Flex, Skeleton} from '@radix-ui/themes'

import {CreateAreaButton} from "@/features/areas/create";
import {EditAreaButton} from "@/features/areas/edit";
import {DeleteAreaButton} from "@/features/areas/delete";
import {AreasTable, getAreasPaginationInfo} from "@/entities/areas";
import {Pagination} from "@/share/ui/pagination";
import {SearchField} from "@/share/ui/search-field";

const PAGE_SIZE = 10;

export default async function AreasPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const {totalPages, totalItems} = await getAreasPaginationInfo(currentPageParam, PAGE_SIZE, query);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);

    return (
        <Flex direction="column" gap="4">
            <Flex gap="2">
                <CreateAreaButton searchParams={searchParams}/>
                <SearchField.Root style={{width: 230}} placeholder="Введите название региона..."/>
            </Flex>

            <Suspense key={`${totalPages}-${query}-${currentPage}-${totalItems}`}
                      fallback={<Skeleton minHeight="556px"/>}
            >
                <Flex direction="column" gap="2">
                    <AreasTable currentPage={currentPage}
                                pageSize={PAGE_SIZE}
                                query={query}
                                actions={(area) => (
                                    <Flex gap="2">
                                        <EditAreaButton areaId={area.id} searchParams={searchParams}/>
                                        <DeleteAreaButton areaId={area.id} searchParams={searchParams}/>
                                    </Flex>
                                )}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </Flex>
            </Suspense>
        </Flex>
    )
}
