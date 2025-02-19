import {Flex} from "@radix-ui/themes";

import {getUser, UserForm} from "@/entities/users";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export type EditUserDialogProps = {
    userId: string;
}

export async function EditUserDialog({userId}: EditUserDialogProps) {
    const user = await getUser(userId);
    const editAction = action.bind(null, userId);
    return (
        <Dialog.Root title="Редактирование пользователя">
            <UserForm user={user} action={editAction}>
                <Flex gap="3" justify="end" mt="4">
                    <Dialog.CancelButton/>
                    <Dialog.SubmitButton/>
                </Flex>
            </UserForm>
        </Dialog.Root>

    )
}