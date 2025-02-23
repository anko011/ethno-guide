import {DeleteArticleAlert} from "@/features/articles/delete";
import {getAllArticles} from "@/entities/articles";

export async function generateStaticParams() {
    const users = await getAllArticles();
    return users.map(({id}) => ({id}))
}

export default async function DeleteArticle(props: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await props.params;

    return (
        <DeleteArticleAlert articleId={id}/>
    )
}