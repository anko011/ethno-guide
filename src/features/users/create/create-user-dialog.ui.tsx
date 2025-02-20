import {UserForm} from "@/entities/users";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export function CreateUserDialog() {
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Создание пользователя</Dialog.Title>
                <UserForm action={action}>
                    <Dialog.Controller/>
                </UserForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}