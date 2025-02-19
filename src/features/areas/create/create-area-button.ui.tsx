import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {PlusIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type CreateAreaButtonProps = IconButtonProps & {
    searchParams?: URLSearchParams;
}

export function CreateAreaButton(
    {
        searchParams = new URLSearchParams(),
        ...props
    }
    : CreateAreaButtonProps) {
    searchParams?.set('modal', 'true');
    return (
        <Tooltip content="Создать регион">
            <Link href={`/admin-panel/areas/create?${searchParams}`}>
                <IconButton {...props}>
                    <PlusIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}