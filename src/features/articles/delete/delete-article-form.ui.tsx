import {Article} from "@/entities/articles";
import {ReactNode} from "react";
import {action} from "./action";

export type DeleteArticleFormProps = {
    article: Article;
    children?: ReactNode;
}

export function DeleteArticleForm({article, children}: DeleteArticleFormProps) {
    const deleteAction = action.bind(null, {id: article.id});
    return (
        <form action={deleteAction}>{children}</form>
    )
}