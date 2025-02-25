'use client'

import {ExitIcon} from "@radix-ui/react-icons";
import {Button, ButtonProps} from "@radix-ui/themes";

import {logoutAction} from "../model/logout-action";

export type LogoutButtonProps = ButtonProps;

export function LogoutButton(props: LogoutButtonProps) {
    return (
        <form action={logoutAction}>
            <Button type="submit" variant="ghost" color="crimson" {...props}>
                <ExitIcon/>
                Выйти
            </Button>
        </form>
    )
}