import {Suspense} from "react";
import {Flex, Heading, Skeleton, Text, TextField} from "@radix-ui/themes";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";

import {RussianMap} from "@/entities/areas";


export default function Home() {
    return (
        <Flex direction="column" align="start" justify="start" minHeight="100vh" minWidth="100vw" p="6" gap="4">
            <Flex direction="column" gap="4" align="center" minWidth="100%">
                <Heading size="9">Ethno Guide</Heading>
                <Text size="5">Цифровой архив сохранения народов Российской Федерации</Text>
            </Flex>

            <TextField.Root placeholder="Введите название народности..." size="3" style={{width: '100%'}}
                            variant="soft">
                <TextField.Slot side="left">
                    <MagnifyingGlassIcon/>
                </TextField.Slot>
            </TextField.Root>

            <Flex justify="center" minWidth="100%">
                <Suspense fallback={<Skeleton width="1224px" height="760px"/>}>
                    <RussianMap/>
                </Suspense>
            </Flex>
        </Flex>
    );
}
