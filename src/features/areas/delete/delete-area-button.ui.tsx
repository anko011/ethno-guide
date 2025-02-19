import {IconButton, Tooltip} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type DeleteAreaButtonProps = {
    areaId: string;
    searchParams: URLSearchParams;
}

export function DeleteAreaButton({areaId, searchParams}: DeleteAreaButtonProps) {
    searchParams.set("modal", "true");

    return (
        <Tooltip content="Удалить регион">
            <Link href={`/admin-panel/areas/${areaId}/delete?${searchParams}`}>
                <IconButton color="red">
                    <TrashIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}