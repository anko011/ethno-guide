import {Flex, ScrollArea} from "@radix-ui/themes";
import {BookmarkIcon, PersonIcon, TableIcon} from "@radix-ui/react-icons";
import {ReactNode} from "react";
import {Link} from "@/share/ui/link";

type NavigationItemProps = {
    children?: ReactNode;
    href: string;
};

function NavigationItem({children, href}: NavigationItemProps) {
    return (
        <Flex align="center" asChild gap="2" p="2">
            <Link highContrast href={href} underline="none">
                {children}
            </Link>
        </Flex>
    )
}

export function Navigation() {
    return (
        <ScrollArea type="hover">
            <Flex direction="column">
                <NavigationItem href="/admin-panel/users">
                    <PersonIcon/>
                    Пользователи
                </NavigationItem>

                <NavigationItem href="/admin-panel/areas">
                    <TableIcon/>
                    Регионы
                </NavigationItem>

                <NavigationItem href="/admin-panel/nations">
                    <BookmarkIcon/>
                    Народности
                </NavigationItem>
            </Flex>
        </ScrollArea>
    )
}
