import {DeleteUserAlert} from "@/features/users/delete";
import {getAllUsers} from "@/entities/users";

export async function generateStaticParams() {
    const users = await getAllUsers();
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