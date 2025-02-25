'use server'

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {ArticleFormState, validateArticleForm} from "@/entities/articles";
import {getSearchParams} from "@/share/libs/search";

export async function action(_: ArticleFormState, formData?: FormData): Promise<ArticleFormState> {
    const result = validateArticleForm(formData);

    // if (!result.success) return result.error.flatten().fieldErrors;
    // пока не понял как делать, сделал так, иначе ошибка возникала
    if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        return {
            title: fieldErrors.title?.[0],
            content: fieldErrors.content?.[0],
            author: fieldErrors.author?.[0],
        };
    }
    // await createArticle(result.data);
    const searchParams = await getSearchParams();
    searchParams.delete('modal');
    revalidatePath('/articles');
    redirect(`/articles?${searchParams}`);
}