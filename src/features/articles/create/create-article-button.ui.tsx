import {IconButton, IconButtonProps, Tooltip} from "@radix-ui/themes";
import {PlusIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type CreateArticleButtonProps = IconButtonProps & {
    nationId: string;
    searchParams?: URLSearchParams;
}

export function CreateArticleButton(
    {   
        nationId,
        searchParams = new URLSearchParams(),
        ...props
    }
    : CreateArticleButtonProps) {
    searchParams?.set('modal', 'true');
    searchParams?.set('nationId', nationId);
    return (
        <Tooltip content="Создать статью">
            <Link href={`/admin-panel/articles/create?${searchParams}`}>
                <IconButton {...props}>
                    <PlusIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}