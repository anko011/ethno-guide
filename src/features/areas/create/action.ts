'use server'

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {AreaFormState, createArea, validateAreaForm} from "@/entities/areas";
import {getSearchParams} from "@/share/libs/search";

export async function action(_: AreaFormState, formData?: FormData): Promise<AreaFormState> {
    const result = validateAreaForm(formData);

    if (!result.success) return result.error.flatten().fieldErrors;
    await createArea(result.data)
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/admin-panel/areas');
    redirect(`/admin-panel/areas?${searchParams}`);
}