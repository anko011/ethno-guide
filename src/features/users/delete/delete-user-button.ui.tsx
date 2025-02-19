import {type User} from "@/entities/users";
import {IconButton, Tooltip} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type DeleteUserButtonProps = {
    user: User;
    searchParams: URLSearchParams;
}

export function DeleteUserButton({user, searchParams}: DeleteUserButtonProps) {
    searchParams.set("modal", "true");

    return (
        <Tooltip content="Удалить пользователя">
            <Link href={`/admin-panel/users/${user.id}/delete?${searchParams}`}>
                <IconButton color="red">
                    <TrashIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}