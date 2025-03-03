import {ReactNode} from "react";

import {Box} from "@radix-ui/themes";

import {Sidebar} from "../sidebar.ui";
import {AdminPanelNavigation} from "./admin-panel.ui";

export default function AdminLayout({children}: { children: ReactNode }) {
    return (
        <>
            <Box gridArea="n">
                <Sidebar>
                    <AdminPanelNavigation/>
                </Sidebar>
            </Box>
            <Box gridArea="c">
                {children}
            </Box>
        </>
    )
}