import { Pencil1Icon } from "@radix-ui/react-icons";
import { IconButton, IconButtonProps, Tooltip } from "@radix-ui/themes";
import { Link } from "@/share/ui/link";

export type EditArticleButtonProps = IconButtonProps & {
    articleId: string;
    searchParams?: URLSearchParams;
}

export function EditArticleButton(
    {
        articleId,
        searchParams = new URLSearchParams(),
        ...props
    }
    : EditArticleButtonProps) {
    searchParams.set('modal', 'true');
    return (
        <Tooltip content="Редактировать статью">
            <Link href={`/admin-panel/articles/${articleId}/edit?${searchParams}`}>
                <IconButton {...props}>
                    <Pencil1Icon />
                </IconButton>
            </Link>
        </Tooltip>
    )
}