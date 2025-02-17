import {Link as RadixLink, LinkProps as RadixLinkProps} from "@radix-ui/themes";
import NextLink from "next/link";

export type LinkProps = RadixLinkProps & {
    href: string;
};

export function Link({href, children, ...props}: LinkProps) {
    return (
        <RadixLink asChild {...props}>
            <NextLink href={href}>{children}</NextLink>
        </RadixLink>
    )
}