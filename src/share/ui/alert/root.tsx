import {AlertDialog} from "@radix-ui/themes";
import {ReactNode} from "react";

export type AlertProps = {
    title: string;
    description: string;
    children?: ReactNode;
}

export function Root({description, title, children}: AlertProps) {
    return (
        <AlertDialog.Root defaultOpen>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{title}</AlertDialog.Title>
                <AlertDialog.Description size="2">{description}</AlertDialog.Description>

                {children}
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}