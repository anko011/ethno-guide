'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getSearchParams} from "@/share/libs/search";
import {ArticleFormState, validateArticleForm} from "@/entities/articles";

export async function action(id: string, _: ArticleFormState, formData?: FormData): Promise<ArticleFormState> {
    const result = validateArticleForm(formData);

    if (!result.success) return result.error.flatten().fieldErrors;
   
    //TODO: не бьются типы - пока не понял
    //await editArticle(id, result.data);
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/articles');
    redirect(`/articles?${searchParams}`);
}