'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getSearchParams} from "@/share/libs/search";
import {AreaFormState, editArea, validateAreaForm} from "@/entities/areas";

export async function action(id: string, _: AreaFormState, formData?: FormData): Promise<AreaFormState> {
    const result = validateAreaForm(formData);

    if (!result.success) return result.error.flatten().fieldErrors;
    await editArea(id, result.data)
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/admin-panel/areas');
    redirect(`/admin-panel/areas?${searchParams}`);
}