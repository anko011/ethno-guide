import {Flex} from "@radix-ui/themes";

import {UserForm} from "@/entities/users";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export function CreateUserDialog() {
    return (
        <Dialog.Root title="Создание пользователя">
            <UserForm action={action}>
                <Flex gap="3" justify="end" mt="4">
                    <Dialog.CancelButton/>
                    <Dialog.SubmitButton/>
                </Flex>
            </UserForm>
        </Dialog.Root>

    )
}