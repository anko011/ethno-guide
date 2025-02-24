import {EditArticleDialog} from "@/features/articles/edit";
import {getAllArticles} from "@/entities/articles";

export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map(({id}) => ({id}))
}

export default async function EditUser({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditArticleDialog articleId={id}/>
}