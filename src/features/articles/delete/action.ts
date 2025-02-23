// src/features/articles/delete/action.ts
'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteArticle } from "@/entities/articles";
import { getSearchParams } from "@/share/libs/search";

export async function action({ id }: { id: string }): Promise<void> {
    await deleteArticle(id);
    const searchParams = await getSearchParams();
    searchParams.delete('modal');
    revalidatePath('/articles');
    redirect(`/articles?${searchParams}`);
}