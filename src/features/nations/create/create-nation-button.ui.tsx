import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";
import {PlusIcon} from "@radix-ui/react-icons";

export type CreateNationButtonProps = IconButtonProps & {
    searchParams?: URLSearchParams;
}

export function CreateNationButton(
    {
        searchParams = new URLSearchParams(),
        ...props
    }
    : CreateNationButtonProps) {
    searchParams?.set('modal', 'true');
    return (
        <Tooltip content="Создать нацию">
            <Link href={`/admin-panel/nations/create?${searchParams}`}>
                <IconButton {...props}>
                    <PlusIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}