import {FC, ReactNode} from "react";
import {Box, Button, Card, DataList, Flex, Grid, Heading, ScrollArea, Separator, Text} from "@radix-ui/themes";
import {BookmarkIcon, ExitIcon, PersonIcon, TableIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

//TODO: перенести в entities users

const UserDataList = () => (
    <DataList.Root>
        <DataList.Item>
            <DataList.Label minWidth="88px">ФИО</DataList.Label>
            <DataList.Value>Морозов Владислав Андреевич</DataList.Value>
        </DataList.Item>

        <DataList.Item align="center">
            <DataList.Label minWidth="88px">Роль</DataList.Label>
            <DataList.Value>
                <Text color="jade">Администратор</Text>
            </DataList.Value>
        </DataList.Item>

        <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>
                <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
            </DataList.Value>
        </DataList.Item>

    </DataList.Root>
);

type NavigationItemProps = {
    children?: ReactNode;
    href: string;
};
const NavigationItem: FC<NavigationItemProps> = ({children, href}) => (
    <Flex align="center" asChild gap="2" p="2">
        <Link highContrast href={href} underline="none">
            {children}
        </Link>
    </Flex>
);

const Navigation = () => (
    <ScrollArea type="hover">
        <Flex direction="column">
            <NavigationItem href="/">
                <PersonIcon/>
                Пользователи
            </NavigationItem>

            <NavigationItem href="/">
                <TableIcon/>
                Регионы
            </NavigationItem>

            <NavigationItem href="/">
                <BookmarkIcon/>
                Народности
            </NavigationItem>
        </Flex>
    </ScrollArea>
);

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

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <Grid areas='"n h" "n c"' columns="250px 1fr" gap="4" height="100vh" p="4" rows="32px 1fr" width="100%">
            <Flex align="center" gridArea="h">
                <Heading>Главная</Heading>
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