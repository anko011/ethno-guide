import {Alert} from "@/share/ui/alert";
import {DeleteUserForm} from "@/features/users/delete/delete-user-form.ui";
import {Flex} from "@radix-ui/themes";
import {getUser} from "@/entities/users";

export type DeleteUserAlertProps = {
    userId: string;
}

export async function DeleteUserAlert({userId}: DeleteUserAlertProps) {
    const user = await getUser(userId);
    return (
        <Alert.Root title="Удалить пользователя"
                    description={`Вы действительно хотите удалить пользователя "${user.fullName}"?`}
        >
            <DeleteUserForm user={user}>
                <Flex gap="2" justify="end" mt="4">
                    <Alert.CancelButton/>
                    <Alert.SubmitButton/>
                </Flex>
            </DeleteUserForm>
        </Alert.Root>
    )
}