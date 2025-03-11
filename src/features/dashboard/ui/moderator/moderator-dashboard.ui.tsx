import { Flex, Skeleton, Text } from "@radix-ui/themes";
import { ArticleModeration, getArticlesPaginationInfo } from "@/entities/articles";
import { auth } from "@/features/auth/model/auth";
import { Role } from "@/entities/users";
import { Suspense } from "react";
import { Pagination } from "@/share/ui/pagination";
import { SearchField } from "@/share/ui/search-field";

const PAGE_SIZE = 10;

export async function ModeratorDashboard(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const session = await auth();
    if (!session?.user?.role || session.user.role !== Role.MODERATOR) return <Text>Доступ запрещён</Text>;
    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const {totalPages, totalItems} = await getArticlesPaginationInfo(currentPageParam, PAGE_SIZE, searchParams);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);

    return (
        <Flex direction="column" gap="4" p="4">
            <Text size="5" weight="bold">Панель модератора</Text>
            <Flex gap="2">
                <SearchField.Root style={{width: 230}} placeholder="Введите заголовок статьи..."/>
            </Flex>

            <Suspense key={`${totalPages}-${query}-${currentPage}-${totalItems}`}
                        fallback={<Skeleton minHeight="556px"/>}
            >
                <Flex direction="column" gap="2">
                    {/* <ArticleAuthorDashboard currentPage={currentPage}
                                            pageSize={PAGE_SIZE}
                                            userId={userId}
                                            actions={actions} 
                    /> */}
                    <ArticleModeration currentPage={1}
                                        pageSize={10}
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </Flex>
            </Suspense>
            
        </Flex>
    );
}