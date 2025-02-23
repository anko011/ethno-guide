import {Card, Flex, Separator} from "@radix-ui/themes";

import {LogoutButton} from "@/features/auth";
import {UserDataList} from "@/entities/users";

import {Navigation} from "./navigation.ui";

export function Sidebar() {
    return (
        <Card style={{height: '100%'}}>
            <Flex align="center" direction="column" gap="4" p="2" style={{height: '100%'}}>
                <UserDataList/>
                <Separator my="2" size="4"/>
                <Navigation/>

                <LogoutButton/>
            </Flex>
        </Card>
    );
}
