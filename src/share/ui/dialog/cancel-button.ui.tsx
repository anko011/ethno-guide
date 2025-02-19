'use client'

import {Button, Dialog} from "@radix-ui/themes";
import {useFormStatus} from "react-dom";

export function CancelButton() {
    const {pending} = useFormStatus();

    return (
        <Dialog.Close>
            <Button type="button"
                    color="gray"
                    variant="soft"
                    disabled={pending}
            >
                Отменить
            </Button>
        </Dialog.Close>
    )
}