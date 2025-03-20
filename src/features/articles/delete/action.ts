'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {deleteArticle} from "@/entities/articles";
import {getSearchParams} from "@/share/libs/search";

export async function action({id}: { id: string }): Promise<void> {
    //DO: Нужна проверка или на уровне deleteArticle или тут на существование в целом статьи с таким id - есть
    try {
        await deleteArticle(id);
    } catch (error) {
        if (error instanceof Error && error.message.includes('не найдена')) {
            throw new Error(`Не удалось удалить статью: ${error.message}`);
        }
        throw error;
    }
    
    const searchParams = await getSearchParams();
    searchParams.delete('modal');
    revalidatePath('/articles');
    redirect(`/articles?${searchParams}`);
}