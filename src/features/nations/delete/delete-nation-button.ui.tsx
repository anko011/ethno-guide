import {IconButton, Tooltip} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type DeleteNationButtonProps = {
    nationId: string;
    searchParams: URLSearchParams;
}

export function DeleteNationButton({nationId, searchParams}: DeleteNationButtonProps) {
    searchParams.set("modal", "true");

    return (
        <Tooltip content="Удалить регион">
            <Link href={`/admin-panel/nations/${nationId}/delete?${searchParams}`}>
                <IconButton color="red">
                    <TrashIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}