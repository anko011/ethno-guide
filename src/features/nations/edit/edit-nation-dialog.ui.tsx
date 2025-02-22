import {Dialog} from "@/share/ui/dialog";

import {getAllPopulationsByNation, getNation, NationForm} from "@/entities/nations";
import {action} from "./action";
import {getAllAreas} from "@/entities/areas";

export type EditNationDialogProps = {
    nationId: string;
}

export async function EditNationDialog({nationId}: EditNationDialogProps) {
    const [nation, areas, populations] = await Promise.all([getNation(nationId), getAllAreas(), getAllPopulationsByNation(nationId)])
    const editAction = action.bind(null, nationId);
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Редактирование нации</Dialog.Title>
                <NationForm nation={nation} action={editAction} areas={areas} populations={populations}>
                    <Dialog.Controller/>
                </NationForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}