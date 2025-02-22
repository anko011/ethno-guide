import {type ReactNode} from "react";

import {type Nation} from "@/entities/nations";
import {action} from "./action";

export type DeleteNationFormProps = {
    nation: Nation;
    children?: ReactNode;
}

export function DeleteNationForm({nation, children}: DeleteNationFormProps) {
    const deleteAction = action.bind(null, {id: nation.id});
    return (
        <form action={deleteAction}>{children}</form>
    )
}