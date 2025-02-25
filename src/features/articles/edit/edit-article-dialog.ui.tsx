import {ArticleForm, getArticle} from "@/entities/articles";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export type EditArticleDialogProps = {
    articleId: string;
}

export async function EditArticleDialog({articleId}: EditArticleDialogProps) {
    const article = await getArticle(articleId);
    const editArticle = action.bind(null, articleId);
    return (
        <Dialog.Root>
            <Dialog.Content minWidth="80vw">
                <Dialog.Title>Редактирование статьи</Dialog.Title>
                <ArticleForm article={article} action={editArticle}>
                    <Dialog.Controller/>
                </ArticleForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}