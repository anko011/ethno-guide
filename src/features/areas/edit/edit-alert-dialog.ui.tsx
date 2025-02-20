import {AreaForm, getArea} from "@/entities/areas";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export type EditAreaDialogProps = {
    areaId: string;
}

export async function EditAreaDialog({areaId}: EditAreaDialogProps) {
    const area = await getArea(areaId);
    const editAction = action.bind(null, areaId);
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Редактирование пользователя</Dialog.Title>
                <AreaForm area={area} action={editAction}>
                    <Dialog.Controller/>
                </AreaForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}