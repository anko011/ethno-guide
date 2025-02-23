import {ArticleForm} from "@/entities/articles";
import {Dialog} from "@/share/ui/dialog";
import {action} from "./action";

export type CreateArticleDialogProps = {
    nationId: string;
}

export function CreateArticleDialog({ nationId }: CreateArticleDialogProps) {
    return (
        <Dialog.Root>
            <Dialog.Content>
                <Dialog.Title>Создание статьи</Dialog.Title>
                <ArticleForm action={action} nationId={nationId}>
                    <Dialog.Controller/>
                </ArticleForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}