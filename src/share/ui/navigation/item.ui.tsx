import {Flex, FlexProps} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export type ItemProps = FlexProps & {
    href: string;
    isActive?: boolean;
};

export function Item({children, href, isActive, ...props}: ItemProps) {
    return (
        <Flex align="center" asChild gap="2" p="2" {...props}>
            <Link highContrast href={href} underline="none" weight={isActive ? 'bold' : 'regular'}>
                {children}
            </Link>
        </Flex>
    )
}
