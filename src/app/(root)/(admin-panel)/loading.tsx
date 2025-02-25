import {Flex, Spinner} from "@radix-ui/themes";

export default function Loading() {
    return (
        <Flex minWidth="100%" minHeight="100%" justify="center" align="center">
            <Spinner size="3"/>
        </Flex>
    )
}
