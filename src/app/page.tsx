import {Suspense} from "react";

import {Box, DataList, Flex, Grid, Heading, Skeleton, Spinner, Text} from "@radix-ui/themes";

import {WelcomeBlock} from "@/features/auth";

import {ArticlesList} from "@/entities/articles";
import {RussianMap} from "@/entities/areas";
import {getAllPopulationsByNation, SearchableNationSelectList} from "@/entities/nations";

import {SearchField} from "@/share/ui/search-field";
import {DotFilledIcon} from "@radix-ui/react-icons";


export default async function HomePage(props: { searchParams: Promise<{ query: string }> }) {
    const searchParams = new URLSearchParams(await props.searchParams);
    const activeNationId = searchParams.get('selectedNationId') ?? '';
    const activeAreas = (await getAllPopulationsByNation(activeNationId)).map(({area}) => area);
    const activeAreaIDs = activeAreas.map(({id}) => id);

    const articlesQuery = searchParams.get('query') ?? '';
    const selectedNationId = searchParams.get('selectedNationId') ?? '';

    return (
        <Grid areas='"hl hc hr" "s s s" "nn map map"'
              rows="auto auto 1fr"
              columns="430px 1fr auto"
              width="100%"
              height="100%"
              p="4"
              gap="2"
        >
            <Flex gridArea="hl" align="center">
                <DataList.Root size="2">
                    <DataList.Item>
                        <DataList.Label>
                            <Flex align="center">
                                <DotFilledIcon/>
                                <Text>Всего статей</Text>
                            </Flex>
                        </DataList.Label>
                        <DataList.Value style={{marginLeft: 'auto'}}>2753</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label>
                            <Flex align="center">
                                <DotFilledIcon/>
                                <Text>Всего национальностей</Text>
                            </Flex>
                        </DataList.Label>
                        <DataList.Value style={{marginLeft: 'auto'}}>100</DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </Flex>

            <Flex gridArea="hc" direction="column" align="center">
                <Heading size="9" color="iris">Ethno Guide</Heading>
                <Text size="5" color="gray">Цифровой архив сохранения народов Российской Федерации</Text>
            </Flex>

            <Flex gridArea="hr" justify="end" align="center">
                <WelcomeBlock gap="2"/>
            </Flex>

            <Box gridArea="s">
                <SearchField.Root action="/articles" placeholder="Поиск статьи...">
                    <SearchField.Content height="75vh" p="2">
                        <Suspense key={articlesQuery} fallback={
                            <Flex justify="center" align="center" minWidth='100%' minHeight="118px"
                                  maxHeight="100%">
                                <Spinner size="3"/>
                            </Flex>
                        }>
                            <ArticlesList currentPage={1} pageSize={10} query={searchParams}/>
                        </Suspense>
                    </SearchField.Content>
                </SearchField.Root>
            </Box>

            <Flex gridArea="nn">
                <SearchableNationSelectList searchParams={searchParams}/>
            </Flex>

            <Flex gridArea="map" align="center" justify="center">
                <Suspense key={selectedNationId} fallback={<Skeleton width="1224px" height="760px"/>}>
                    <RussianMap key={selectedNationId} activeAreaIDs={activeAreaIDs}/>
                </Suspense>
            </Flex>
        </Grid>
    );
}
