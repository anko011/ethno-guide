import {EditArticleDialog} from "@/features/articles/edit";

export default async function EditArticle({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <EditArticleDialog articleId={id}/>
}