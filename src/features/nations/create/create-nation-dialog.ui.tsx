import {NationForm} from "@/entities/nations";
import {getAllAreas} from "@/entities/areas";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export async function CreateNationDialog() {
    const areas = await getAllAreas();
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Создание нации</Dialog.Title>
                <NationForm action={action} areas={areas}>
                    <Dialog.Controller/>
                </NationForm>
            </Dialog.Content>
        </Dialog.Root>
    )
}