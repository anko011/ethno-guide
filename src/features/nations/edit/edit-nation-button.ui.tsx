import {Pencil1Icon} from "@radix-ui/react-icons";
import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export type EditNationButtonProps = IconButtonProps & {
    nationId: string;
    searchParams?: URLSearchParams;
}

export function EditNationButton(
    {
        nationId,
        searchParams = new URLSearchParams(),
        ...props
    }
    : EditNationButtonProps) {
    searchParams?.set('modal', 'true');
    return (
        <Tooltip content="Редактировать нацию">
            <Link href={`/admin-panel/nations/${nationId}/edit?${searchParams}`}>
                <IconButton {...props}>
                    <Pencil1Icon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}