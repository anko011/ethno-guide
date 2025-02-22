'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {createNation, type NationFormState} from "@/entities/nations";
import {validateNationForm} from "@/entities/nations/";
import {getSearchParams} from "@/share/libs/search";


export async function action(_: NationFormState, formData?: FormData): Promise<NationFormState> {
    const result = validateNationForm(formData);
    if (!result.isSuccess) return result;

    await createNation(result.name, result.populations);

    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/admin-panel/nations');
    redirect(`/admin-panel/nations?${searchParams}`);
}