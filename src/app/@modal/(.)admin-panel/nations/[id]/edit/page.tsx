import {EditNationDialog} from "@/features/nations/edit";
import {getAllNations} from "@/entities/nations";

export async function generateStaticParams() {
    const nations = await getAllNations();
    return nations.map(({id}) => ({id}))
}

export default async function EditArea({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditNationDialog nationId={id}/>
}