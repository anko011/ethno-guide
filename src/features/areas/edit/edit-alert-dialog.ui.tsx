import {Flex} from "@radix-ui/themes";

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
        <Dialog.Root title="Редактирование пользователя">
            <AreaForm area={area} action={editAction}>
                <Flex gap="3" justify="end" mt="4">
                    <Dialog.CancelButton/>
                    <Dialog.SubmitButton/>
                </Flex>
            </AreaForm>
        </Dialog.Root>

    )
}