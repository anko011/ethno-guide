import {CreateArticleDialog} from "@/features/articles/create";

export default async function CreateArticle({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <CreateArticleDialog nationId={id}/>
}