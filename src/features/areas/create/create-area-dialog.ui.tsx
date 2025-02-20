import {AreaForm} from "@/entities/areas/";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export function CreateAreaDialog() {
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Создание региона</Dialog.Title>
                <AreaForm action={action}>
                    <Dialog.Controller/>
                </AreaForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}