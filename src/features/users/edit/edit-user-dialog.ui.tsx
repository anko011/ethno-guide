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
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Редактирование пользователя</Dialog.Title>
                <UserForm user={user} action={editAction}>
                    <Dialog.Controller/>
                </UserForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}