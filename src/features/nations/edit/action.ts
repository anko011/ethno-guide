'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {editNation, type NationFormState, validateNationForm} from "@/entities/nations";
import {getSearchParams} from "@/share/libs/search";

export async function action(id: string, _: NationFormState, formData?: FormData): Promise<NationFormState> {
    const result = validateNationForm(formData);

    if (!result.isSuccess) return result;
    await editNation(id, result)
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/admin-panel/areas');
    redirect(`/admin-panel/areas?${searchParams}`);
}