import {EditUserDialog} from "@/features/users/edit";

export default async function EditUser({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditUserDialog userId={id}/>
}