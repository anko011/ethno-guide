import {ReactNode} from "react";
import {Area} from "@/entities/areas";

import {action} from "./action";

export type DeleteAreaFormProps = {
    area: Area;
    children?: ReactNode;
}

export function DeleteAreaForm({area, children}: DeleteAreaFormProps) {
    const deleteAction = action.bind(null, {id: area.id});
    return (
        <form action={deleteAction}>{children}</form>
    )
}