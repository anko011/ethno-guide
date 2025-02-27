import {ReactNode} from "react";

import {Box} from "@radix-ui/themes";

import {getAllNations, NationsNavigationList} from "@/entities/nations";
import {Sidebar} from "../sidebar.ui";

export default async function ArticlesLayout({children}: { children: ReactNode }) {
    const nations = await getAllNations();

    return (
        <>
            <Box gridArea="n">
                <Sidebar>
                    <NationsNavigationList slug="/articles" nations={nations}/>
                </Sidebar>
            </Box>
            <Box gridArea="c">
                {children}
            </Box>
        </>
    )
}