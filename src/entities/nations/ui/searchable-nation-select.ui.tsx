import {Suspense} from "react";
import {Flex, Spinner} from "@radix-ui/themes";

import {SearchField} from "@/share/ui/search-field";

import {findNations} from "../api/repository";
import {NationSelectList} from "./nation-select-list.ui";

export async function SearchableNationSelectList({searchParams}: { searchParams?: URLSearchParams }) {
    const nationQuery = searchParams?.get('nationQuery') ?? '';
    const nations = findNations(nationQuery);

    return (
        <SearchField.Root queryKey="nationQuery" placeholder="Поиск нации...">
            <SearchField.Content alwaysOpen zIndex={0} height="70vh" p="1" style={{background: 'transparent'}}>
                <Suspense key={nationQuery}
                          fallback={
                              <Flex width="100%" height="100%" align="center" justify="center">
                                  <Spinner size="3"/>
                              </Flex>
                          }>
                    <NationSelectList data={nations}/>
                </Suspense>
            </SearchField.Content>
        </SearchField.Root>
    )
}
