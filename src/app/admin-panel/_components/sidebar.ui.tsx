import {Button, Card, Flex, Separator} from "@radix-ui/themes";
import {ExitIcon} from "@radix-ui/react-icons";

import {UserDataList} from "@/entities/users";
import {Link} from "@/share/ui/link";

import {Navigation} from "./navigation.ui";

export function Sidebar() {
    return (
        <Card style={{height: '100%'}}>
            <Flex align="center" direction="column" gap="4" py="2" style={{height: '100%'}}>
                <UserDataList/>
                <Separator my="2" size="4"/>
                <Navigation/>

                <Button asChild variant="ghost">
                    <Link color="crimson" href="/logout" underline="none">
                        <ExitIcon/>
                        Выйти
                    </Link>
                </Button>
            </Flex>
        </Card>
    );
}
