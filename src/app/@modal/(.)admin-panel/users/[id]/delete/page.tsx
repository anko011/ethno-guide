import {DeleteUserAlert} from "@/features/users/delete";
import {getUsers} from "@/entities/users";

export async function generateStaticParams() {
    const users = await getUsers(1, 1000);
    return users.map(({id}) => ({id}))
}

export default async function DeleteUser(props: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await props.params;

    return (
        <DeleteUserAlert userId={id}/>
    )
}