import {Pencil1Icon} from "@radix-ui/react-icons";
import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export type EditAreaButtonProps = IconButtonProps & {
    areaId: string;
    searchParams?: URLSearchParams;
}

export function EditAreaButton(
    {
        areaId,
        searchParams = new URLSearchParams(),
        ...props
    }
    : EditAreaButtonProps) {
    searchParams?.set('modal', 'true');
    return (
        <Tooltip content="Редактировать регион">
            <Link href={`/admin-panel/areas/${areaId}/edit?${searchParams}`}>
                <IconButton {...props}>
                    <Pencil1Icon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}