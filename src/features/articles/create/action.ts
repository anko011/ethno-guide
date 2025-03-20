'use server'

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {ArticleFormState, validateArticleForm} from "@/entities/articles";
import {getSearchParams} from "@/share/libs/search";


//DO: Не понял твоей проблемы, но данная функция является единицей работы выполняемой на сервере при сабмите формы,
// т.е. мы хотим тут делегировать кому то валидацию формы и если успешно, то что то сделать
// в данном случае создать статью и обновить данные по пути и произвести редирект
// если ты про формирование ошибки, то вся проблемы в ArticleFormState я юзаю массивы строк, а ты просто строки 
// - есть (использовал массивы строк)
export async function action(_: ArticleFormState, formData?: FormData): Promise<ArticleFormState> {
    const result = validateArticleForm(formData);

    if (!result.success) return result.error.flatten().fieldErrors;
    
    //TODO: у тебя не бются типы - пока не понял
    //await createArticle(result.data);
    const searchParams = await getSearchParams();
    searchParams.delete('modal');
    revalidatePath('/articles');
    redirect(`/articles?${searchParams}`);
}