import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";
import {PlusIcon} from "@radix-ui/react-icons";

export type CreateUserButtonProps = IconButtonProps & {
    searchParams?: URLSearchParams;
}

export function CreateUserButton(
    {
        searchParams = new URLSearchParams(),
        ...props
    }
    : CreateUserButtonProps) {
    searchParams?.set('modal', 'true');
    return (
        <Tooltip content="Создать пользователя">
            <Link href={`/admin-panel/users/create?${searchParams}`}>
                <IconButton {...props}>
                    <PlusIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}