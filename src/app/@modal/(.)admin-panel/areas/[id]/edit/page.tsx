import {EditAreaDialog} from "@/features/areas/edit";

export default async function EditArea({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditAreaDialog areaId={id}/>
}