import {ReactNode} from "react";

import {Grid} from "@radix-ui/themes";

export default async function RootLayout({children}: { children: ReactNode }) {
    return (
        <Grid areas='"n c" "n c"' columns="minmax(250px, max-content) 1fr" gap="4" height="100vh" p="4" rows="32px 1fr"
              width="100%">
            {children}
        </Grid>
    )
}