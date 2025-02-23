import {ReactNode} from "react";

import {Box, Flex, Grid,} from "@radix-ui/themes";

import {checkAuth} from "@/features/auth";

import {Sidebar} from "./_components/sidebar.ui";
import {Heading} from "./_components/heading.ui";


export default async function DashboardLayout({children}: { children: ReactNode }) {
    await checkAuth();

    return (
        <Grid areas='"n h" "n c"' columns="auto 1fr" gap="4" height="100vh" p="4" rows="32px 1fr" width="100%">
            <Flex align="center" gridArea="h">
                <Heading/>
            </Flex>
            <Box gridArea="n">
                <Sidebar/>
            </Box>
            <Box gridArea="c">
                {children}
            </Box>
        </Grid>
    )
}