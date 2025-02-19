import {Flex} from "@radix-ui/themes";

import {AreaForm} from "@/entities/areas/";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export function CreateAreaDialog() {
    return (
        <Dialog.Root title="Создание региона">
            <AreaForm action={action}>
                <Flex gap="3" justify="end" mt="4">
                    <Dialog.CancelButton/>
                    <Dialog.SubmitButton/>
                </Flex>
            </AreaForm>
        </Dialog.Root>

    )
}