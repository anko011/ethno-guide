import {ReactNode} from "react";
import {Box, Flex, Grid,} from "@radix-ui/themes";

import {Sidebar} from "./_components/sidebar.ui";
import {Heading} from "./_components/heading.ui";


export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <Grid areas='"n h" "n c"' columns="250px 1fr" gap="4" height="100vh" p="4" rows="32px 1fr" width="100%">
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