import {DeleteAreaAlert} from "@/features/areas/delete";
import {getAllAreas} from "@/entities/areas";

export async function generateStaticParams() {
    const areas = await getAllAreas();
    return areas.map(({id}) => ({id}))
}

export default async function DeleteUsersAlert(props: { params: Promise<{ id: string }> }) {
    const {id} = await props.params;
    return (
        <DeleteAreaAlert areaId={id}/>
    )
}