import {ArticleForm} from "@/entities/articles";
import {Dialog} from "@/share/ui/dialog";

import {action} from "./action";

export function CreateArticleDialog() {
    return (
        <Dialog.Root>
            <Dialog.Content minWidth="80vw">
                <Dialog.Title>Создание статьи</Dialog.Title>
                <ArticleForm action={action}>
                    <Dialog.Controller/>
                </ArticleForm>
            </Dialog.Content>
        </Dialog.Root>

    )
}