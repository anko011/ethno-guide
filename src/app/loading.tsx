import {Flex, Spinner} from "@radix-ui/themes";

export default function Loading() {
    return (
        <Flex minWidth="100vw" minHeight="100vh" justify="center" align="center">
            <Spinner size="3"/>
        </Flex>
    )
}
