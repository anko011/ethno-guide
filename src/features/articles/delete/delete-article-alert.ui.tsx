import {Alert} from "@/share/ui/alert";
import {DeleteArticleForm} from "@/features/articles/delete/delete-article-form.ui";
import {Flex} from "@radix-ui/themes";
import {getArticle} from "@/entities/articles";

export type DeleteArticleAlertProps = {
    articleId: string;
}

export async function DeleteArticleAlert({articleId}: DeleteArticleAlertProps) {
    const article = await getArticle(articleId);
    return (
        <Alert.Root title="Удалить статью"
                    description={`Вы действительно хотите удалить статью "${article.title}"?`}
        >
            <DeleteArticleForm article={article}>
                <Flex gap="2" justify="end" mt="4">
                    <Alert.CancelButton/>
                    <Alert.SubmitButton/>
                </Flex>
            </DeleteArticleForm>
        </Alert.Root>
    )
}