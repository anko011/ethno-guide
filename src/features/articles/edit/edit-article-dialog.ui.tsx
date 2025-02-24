import { Dialog } from "@/share/ui/dialog";
import { ArticleForm } from "@/entities/articles/ui/article-form.ui";
import { action } from "./action";
import { getArticle} from "@/entities/articles";

export type EditArticleDialogProps = {
    articleId: string;
}

export async function EditArticleDialog({articleId}: EditArticleDialogProps) {
    const article = await getArticle(articleId);
    const editArticle = action.bind(null, articleId);
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Редактирование статьи</Dialog.Title>
                <ArticleForm article={article} action={editArticle}>
                    <Dialog.Controller/>
                </ArticleForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}