import * as React from "react";
import Image from "next/image";


import {Box, Flex, ScrollArea, Text} from "@radix-ui/themes";

import {getArticles} from "../api/repository";
import {Link} from "@/share/ui/link";

export async function ArticlesCardList({query}: { query: string }) {
    const data = await getArticles(query);
    return (
        <ScrollArea>
            {data.length > 0 ? (
                data.map((article) => (

                    <Box key={article.id}
                         p="3"
                         style={{
                             display: 'block',
                             textDecoration: 'none',
                             color: 'inherit',
                             borderBottom: '1px solid var(--gray-5)',
                             cursor: 'pointer',
                         }}
                    >
                        <Flex gap="3" align="center">
                            <Image
                                src={article.image === '' ? '/article_placeholder.webp' : article.image}
                                alt={article.title}
                                width={50}
                                height={50}
                                style={{borderRadius: 'var(--radius-2)'}}
                            />
                            <Box>
                                <Link href={`/articles/${article.id}`} asChild>
                                    <Text as="div" weight="bold">
                                        {article.title}
                                    </Text>
                                </Link>
                                <Text as="div" color="gray" size="2">
                                    {article.description.slice(0, 50)}...
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                ))
            ) : (
                <Flex align="center" justify="center" p="4">
                    <Text>Ничего не найдено</Text>
                </Flex>
            )}
        </ScrollArea>
    )
}