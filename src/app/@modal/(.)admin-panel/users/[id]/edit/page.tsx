import {EditUserDialog} from "@/features/users/edit";
import {getAllUsers} from "@/entities/users";

export async function generateStaticParams() {
    const users = await getAllUsers();
    return users.map(({id}) => ({id}))
}

export default async function EditUser({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditUserDialog userId={id}/>
}