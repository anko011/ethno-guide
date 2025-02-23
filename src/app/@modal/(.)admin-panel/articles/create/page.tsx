'use client'
import {CreateArticleDialog} from "@/features/articles/create";
import { useSearchParams } from "next/navigation";

export default function CreateArticle() {
    const searchParams = useSearchParams();
    const nationId = searchParams.get('nationId') || '';
    return (
        <CreateArticleDialog nationId={nationId}/>
    )
}
