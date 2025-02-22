'use client'
import {Button, ButtonProps} from "@radix-ui/themes";
import {useFormStatus} from "react-dom";

export type SubmitButtonProps = ButtonProps;

export function SubmitButton(props: SubmitButtonProps) {
    const {pending} = useFormStatus();

    return (
        <Button disabled={pending}
                loading={pending}
                type="submit"
                {...props}
        >
            Сохранить
        </Button>
    )
}
