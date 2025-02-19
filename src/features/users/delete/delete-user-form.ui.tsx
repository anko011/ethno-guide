import {User} from "@/entities/users";
import {ReactNode} from "react";
import {action} from "./action";

export type DeleteUserFormProps = {
    user: User;
    children?: ReactNode;
}

export function DeleteUserForm({user, children}: DeleteUserFormProps) {
    const deleteAction = action.bind(null, {id: user.id});
    return (
        <form action={deleteAction}>{children}</form>
    )
}