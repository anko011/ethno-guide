import {Suspense} from "react";

import {Flex, Skeleton} from '@radix-ui/themes'

import {DeleteUserButton} from "@/features/users/delete";
import {CreateUserButton} from "@/features/users/create";
import {getUsersPaginationInfo, UsersTable} from "@/entities/users";
import {Pagination} from "@/share/ui/pagination";
import {SearchField} from "@/share/ui/search-field";
import {EditUserButton} from "@/features/users/edit";

const PAGE_SIZE = 10;


export default async function UsersPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const {totalPages, totalItems} = await getUsersPaginationInfo(currentPageParam, PAGE_SIZE, query);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);

    return (
        <Flex direction="column" gap="4">
            <Flex gap="2">
                <CreateUserButton searchParams={searchParams}/>
                <SearchField style={{width: 230}} placeholder="Введите имя пользователя..."/>
            </Flex>

            <Suspense key={`${totalPages}-${query}-${currentPage}-${totalItems}`}
                      fallback={<Skeleton minHeight="556px"/>}
            >
                <Flex direction="column" gap="2">
                    <UsersTable currentPage={currentPage}
                                pageSize={PAGE_SIZE}
                                query={query}
                                actions={(user) => (
                                    <Flex gap="2">
                                        <EditUserButton userId={user.id} searchParams={searchParams}/>
                                        <DeleteUserButton user={user} searchParams={searchParams}/>
                                    </Flex>
                                )}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </Flex>
            </Suspense>
        </Flex>
    )
}
