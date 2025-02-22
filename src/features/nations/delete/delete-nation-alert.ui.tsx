import {Flex} from "@radix-ui/themes";
import {Alert} from "@/share/ui/alert";

import {DeleteNationForm} from "./delete-area-form.ui";
import {getNation} from "@/entities/nations/api/repository";

export type DeleteNationAlertProps = {
    nationId: string;
}

export async function DeleteNationAlert({nationId}: DeleteNationAlertProps) {
    const nation = await getNation(nationId);
    return (
        <Alert.Root title="Удалить нацию"
                    description={`Вы действительно хотите удалить нацию "${nation.name}"?`}
        >
            <DeleteNationForm nation={nation}>
                <Flex gap="2" justify="end" mt="4">
                    <Alert.CancelButton/>
                    <Alert.SubmitButton/>
                </Flex>
            </DeleteNationForm>
        </Alert.Root>
    )
}