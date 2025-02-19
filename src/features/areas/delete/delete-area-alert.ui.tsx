import {Flex} from "@radix-ui/themes";

import {getArea} from "@/entities/areas";
import {Alert} from "@/share/ui/alert";

import {DeleteAreaForm} from "./delete-area-form.ui";

export type DeleteAreaAlertProps = {
    areaId: string;
}

export async function DeleteAreaAlert({areaId}: DeleteAreaAlertProps) {
    const area = await getArea(areaId);
    return (
        <Alert.Root title="Удалить регион"
                    description={`Вы действительно хотите удалить регион "${area.title}"?`}
        >
            <DeleteAreaForm area={area}>
                <Flex gap="2" justify="end" mt="4">
                    <Alert.CancelButton/>
                    <Alert.SubmitButton/>
                </Flex>
            </DeleteAreaForm>
        </Alert.Root>
    )
}