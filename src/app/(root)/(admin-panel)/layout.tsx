import {ReactNode} from "react";
import {redirect} from "next/navigation";

import {Box} from "@radix-ui/themes";

import {auth} from "@/features/auth";
import {Role} from "@/entities/users";

import {Sidebar} from "../sidebar.ui";
import {AdminPanelNavigation} from "./admin-panel.ui";

export default async function AdminPanelLayout({children}: { children: ReactNode }) {
    const session = await auth();
    if (!session || session.user.role !== Role.ADMIN) redirect('/')
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