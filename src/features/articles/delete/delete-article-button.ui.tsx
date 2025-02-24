import {IconButton, Tooltip} from "@radix-ui/themes";
import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "@/share/ui/link";

export type DeleteArticleButtonProps = {
    articleId: string;
    searchParams: URLSearchParams;
}

export function DeleteArticleButton({articleId, searchParams}: DeleteArticleButtonProps) {
    searchParams.set("modal", "true");

    return (
        <Tooltip content="Удалить статью">
            <Link href={`/admin-panel/articles/${articleId}/delete?${searchParams}`}>
                <IconButton color="red">
                    <TrashIcon/>
                </IconButton>
            </Link>
        </Tooltip>
    )
}