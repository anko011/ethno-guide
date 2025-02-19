import {Flex} from "@radix-ui/themes";

import {DeleteUserForm} from "@/features/users/delete";
import {getUser, getUsers} from "@/entities/users";
import {Alert} from "@/share/ui/alert";

export async function generateStaticParams() {
    const users = await getUsers(1, 1000);
    return users.map(({id}) => ({id}))
}

export default async function DeleteUsersAlert(props: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await props.params;
    const user = await getUser(id);

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