import {Suspense} from "react";

import { Flex, Skeleton, Text } from "@radix-ui/themes";
import { ArticleAuthorDashboard, ArticleStatus, getArticlesPaginationInfo, type Article} from "@/entities/articles";
import { auth } from "@/features/auth/model/auth";
import { Role } from "@/entities/users";
import { EditArticleButton } from "@/features/articles/edit";

import {Pagination} from "@/share/ui/pagination";
import {SearchField} from "@/share/ui/search-field";
import { CreateArticleButton } from "@/features/articles/create";

const PAGE_SIZE = 10;

export async function AuthorDashboard(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const session = await auth();
    if (!session?.user?.role || session.user.role !== Role.AUTHOR) return <Text>Доступ запрещён</Text>;

    const searchParams = new URLSearchParams(await props.searchParams);
    const currentPageParam = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || '';
    const {totalPages, totalItems} = await getArticlesPaginationInfo(currentPageParam, PAGE_SIZE, searchParams);
    const currentPage = Math.max(Math.min(currentPageParam, totalPages), 1);
    const userId = session.user.id; // Предполагаем, что session.user.id доступен

    const actions = (article: Article) => (
        <Flex gap="2">
            {article.status !== ArticleStatus.APPROVED && ( // Редактирование недоступно для опубликованных статей
                <EditArticleButton articleId={article.id} searchParams={searchParams}/>
            )}
        </Flex>
    );

    return (
        <Flex direction="column" gap="4" p="4">
            <Text size="5" weight="bold">Личный кабинет автора</Text>
            <Flex gap="2">
                <CreateArticleButton nationId="" searchParams={searchParams}/>
                <SearchField.Root style={{width: 230}} placeholder="Введите заголовок статьи..."/>
            </Flex>

            <Suspense key={`${totalPages}-${query}-${currentPage}-${totalItems}`}
                      fallback={<Skeleton minHeight="556px"/>}
            >
                <Flex direction="column" gap="2">
                    <ArticleAuthorDashboard currentPage={currentPage}
                                            pageSize={PAGE_SIZE}
                                            userId={userId}
                                            actions={actions} 
                    />
                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </Flex>
            </Suspense>
            
        </Flex>
    );
}