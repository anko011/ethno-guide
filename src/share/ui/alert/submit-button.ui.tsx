'use client'
import {Button, ButtonProps} from "@radix-ui/themes";
import {useFormStatus} from "react-dom";

export type SubmitButtonProps = ButtonProps;

export function SubmitButton(props: SubmitButtonProps) {
    const {pending} = useFormStatus();
    return (
        <Button type="submit"
                color="red"
                variant="solid"
                disabled={pending}
                loading={pending}
                {...props}
        >
            Удалить
        </Button>
    )
}
