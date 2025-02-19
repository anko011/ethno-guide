import {Pencil1Icon} from "@radix-ui/react-icons";
import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export type EditUserButtonProps = IconButtonProps & {
    userId: string;
    searchParams?: URLSearchParams;
}

export function EditUserButton(
    {
        userId,
        searchParams = new URLSearchParams(),
        ...props
    }
    : EditUserButtonProps) {
    searchParams?.set('modal', 'true');
    return (
        <Tooltip content="Редактировать пользователя">
            <Link href={`/admin-panel/users/${userId}/edit?${searchParams}`}>
                <IconButton {...props}>
                    <Pencil1Icon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}