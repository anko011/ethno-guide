import Link from "next/link";

import {Button, Callout, Card, Flex, Heading} from "@radix-ui/themes";
import {InfoCircledIcon} from "@radix-ui/react-icons";

import {CreateArticleButton} from "@/features/articles/create";

export default async function NotFoundArticle() {
    return (
        <Card size="3">
            <Flex direction="column" gap="4">
                <Heading size="6">Статья отсутствует</Heading>
                <Callout.Root color="gray" style={{minHeight: '100px', display: 'flex'}}>
                    <Callout.Icon>
                        <InfoCircledIcon/>
                    </Callout.Icon>
                    <Callout.Text size="3">
                        Статья для этого народа ещё не создана. <br/>
                        Вы можете создать новую статью или вернуться на главную страницу.
                    </Callout.Text>
                </Callout.Root>
            </Flex>

            <Flex gap="3" mt="4">
                <Link href="/">
                    <Button variant="soft" color="gray" size="2">
                        Вернуться назад
                    </Button>
                </Link>
                {/* TODO: NATION_ID need to mind*/}
                <CreateArticleButton nationId="1" size="2"/>
            </Flex>
        </Card>
    )
}