import {ReactNode} from "react";
import {Box, Card, Flex, Separator} from "@radix-ui/themes";

import {auth, LogoutButton} from "@/features/auth";
import {UserDataList} from "@/entities/users";

export async function Sidebar({children}: { children?: ReactNode }) {
    const session = await auth();
    return (
        <Card style={{height: '100%'}}>
            <Flex direction="column" height="100%">
                {session &&
                    <>
                        <UserDataList/>
                        <Separator my="2" size="4"/>
                    </>
                }

                <Box flexGrow="1" height="100%">
                    {children}
                </Box>

                {session && (
                    <Flex align="center" justify="center">
                        <LogoutButton/>
                    </Flex>
                )}

            </Flex>
        </Card>
    );
}
