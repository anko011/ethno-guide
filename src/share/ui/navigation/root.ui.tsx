import {Flex, FlexProps, ScrollArea} from "@radix-ui/themes";

export type RootProps = FlexProps;

export function Root({children, ...props}: RootProps) {
    return (
        <Flex align="start" asChild gap="2" {...props}>
            <ScrollArea type="hover">
                {children}
            </ScrollArea>
        </Flex>
    )
}
