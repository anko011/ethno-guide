import {DeleteNationAlert} from "@/features/nations/delete";
import {getAllNations} from "@/entities/nations";

export async function generateStaticParams() {
    const nations = await getAllNations();
    return nations.map(({id}) => ({id}))
}

export default async function DeleteNation(props: { params: Promise<{ id: string }> }) {
    const {id} = await props.params;
    return (
        <DeleteNationAlert nationId={id}/>
    )
}