import {ReactNode, Suspense} from "react";
import {Session} from "next-auth";

import {Box, Flex, Heading, Skeleton, Spinner, Text} from "@radix-ui/themes";

import {auth, LogoutButton} from "@/features/auth";

import {RussianMap} from "@/entities/areas";
import {Role} from "@/entities/users";
import {ArticlesCardList} from "@/entities/anko_articles";

import {Link} from "@/share/ui/link";
import {SearchField} from "@/share/ui/search-field";

export function getWelcomeText(session?: Session | null) {
    if (!session) return (
        <Text size="1">
            <Link weight="medium" href="/registration">Зарегистрируйтесь</Link>
            , что бы стать автором или {' '}
            <Link weight="medium" size="1" href="/login">войдите</Link>
            , что бы написать свою статью!
        </Text>
    )
    const {user} = session;
    const welcomeText = `Добро пожаловать, ${user.fullName}! Перейти в `;

    const content: Record<Role, ReactNode> = {
        [Role.ADMIN]: <Text size="1">
            {welcomeText}
            <Link href="/admin-panel">Админ-панель</Link>
        </Text>,
        [Role.MODERATOR]: <Text size="1">
            {welcomeText}
            <Link href="/">Модераторная</Link>
        </Text>,
        [Role.AUTHOR]: <Text size="1">
            {welcomeText}
            <Link href="/">Личный кабинет</Link>
        </Text>,
    }

    return content[user.role];
}

export default async function Home({searchParams}: { searchParams: Promise<{ query: string }> }) {
    const query = (await searchParams).query;
    const session = await auth();

    return (
        <Flex direction="column" align="start" justify="start" minHeight="100vh" minWidth="100vw" p="6" gap="4">
            <Flex direction="column" gap="4" align="center" minWidth="100%">
                <Flex align="center" justify="between" width="100%">
                    <Heading size="9" style={{position: 'relative', left: "50%", transform: 'translate(-50%)'}}
                             color="iris">Ethno
                        Guide</Heading>
                    <Flex gap="2" align="start">
                        {getWelcomeText(session)}
                        {!!session && (
                            <LogoutButton size="1"/>
                        )}
                    </Flex>
                </Flex>
                <Text size="5" color="gray">Цифровой архив сохранения народов Российской Федерации</Text>
            </Flex>

            <Box width="100%">
                <SearchField.Root placeholder="Поиск статьи...">
                    <SearchField.Content>
                        <Suspense key={`${query}`} fallback={
                            <Flex justify="center" align="center">
                                <Spinner size="3"/>
                            </Flex>
                        }>
                            <ArticlesCardList query={query}/>
                        </Suspense>
                    </SearchField.Content>
                </SearchField.Root>
            </Box>

            <Flex justify="center" minWidth="100%">
                <Suspense fallback={<Skeleton width="1224px" height="760px"/>}>
                    <RussianMap/>
                </Suspense>
            </Flex>
        </Flex>
    );
}
