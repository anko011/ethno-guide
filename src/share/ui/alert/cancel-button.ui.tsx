'use client'

import {type MouseEvent} from 'react';
import {useFormStatus} from "react-dom";
import {useRouter} from "next/navigation";

import {AlertDialog, Button, ButtonProps} from "@radix-ui/themes";

export type CancelButtonProps = ButtonProps;

export function CancelButton({onClick, ...props}: CancelButtonProps) {
    const {pending} = useFormStatus();
    const router = useRouter();

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        onClick?.(e)
        router.back();
    }

    return (
        <AlertDialog.Cancel>
            <Button color="gray"
                    variant="soft"
                    disabled={pending}
                    onClick={handleClick}
                    {...props}
            >
                Отмена
            </Button>
        </AlertDialog.Cancel>
    )
}
