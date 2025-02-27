import {Flex, Spinner} from "@radix-ui/themes";

export default function Loading() {
    return (
        <Flex minWidth="100%" minHeight="100%" justify="center" align="center"
              style={{position: 'absolute', top: 0, left: 0, right: 0, background: 'var(--gray-a7)'}}>
            <Spinner size="3"/>
        </Flex>
    )
}
