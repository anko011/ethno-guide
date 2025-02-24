'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getSearchParams} from "@/share/libs/search";
import {ArticleFormState, editArticle, validateArticleForm} from "@/entities/articles";

export async function action(id: string, _: ArticleFormState, formData?: FormData): Promise<ArticleFormState> {
    const result = validateArticleForm(formData);

    // if (!result.success) return result.error.flatten().fieldErrors;
    // пока не понял как делать, сделал так, иначе ошибка возникала
    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
            title: fieldErrors.title?.[0],
            content: fieldErrors.content?.[0],
            nationId: fieldErrors.nationId?.[0],
            author: fieldErrors.author?.[0],
        };
    }
    await editArticle(id, result.data);
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/articles');
    redirect(`/articles?${searchParams}`);
}