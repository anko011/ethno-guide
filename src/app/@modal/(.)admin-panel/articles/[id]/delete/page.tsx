import {DeleteArticleAlert} from "@/features/articles/delete";
import {getAllArticles} from "@/entities/articles";

export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map(({id}) => ({id}))
}

export default async function DeleteArticle(props: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await props.params;

    return (
        <DeleteArticleAlert articleId={id}/>
    )
}