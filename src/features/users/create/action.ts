'use server'

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

import {createUser, UserFormState, validateUserForm} from "@/entities/users";
import {getSearchParams} from "@/share/libs/search";

export async function action(_: UserFormState, formData?: FormData): Promise<UserFormState> {
    const result = validateUserForm(formData);

    if (!result.success) return result.error.flatten().fieldErrors;
    await createUser(result.data)
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/admin-panel/users');
    redirect(`/admin-panel/users?${searchParams}`);
}