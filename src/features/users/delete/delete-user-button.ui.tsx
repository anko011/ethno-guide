import {IconButton, Tooltip} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type DeleteUserButtonProps = {
    userId: string;
    searchParams: URLSearchParams;
}

export function DeleteUserButton({userId, searchParams}: DeleteUserButtonProps) {
    searchParams.set("modal", "true");

    return (
        <Tooltip content="Удалить пользователя">
            <Link href={`/admin-panel/users/${userId}/delete?${searchParams}`}>
                <IconButton color="red">
                    <TrashIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}