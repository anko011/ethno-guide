import {Article} from "@/entities/articles";
import {ReactNode} from "react";
import {action} from "./action";
import Form from "next/form";

export type DeleteArticleFormProps = {
    article: Article;
    children?: ReactNode;
}

export function DeleteArticleForm({article, children}: DeleteArticleFormProps) {
    const deleteAction = action.bind(null, {id: article.id});
    return (
        <Form action={deleteAction}>{children}</Form>
    )
}