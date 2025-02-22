import {EditAreaDialog} from "@/features/areas/edit";
import {getAllAreas} from "@/entities/areas";

export async function generateStaticParams() {
    const areas = await getAllAreas();
    return areas.map(({id}) => ({id}))
}

export default async function EditArea({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditAreaDialog areaId={id}/>
}