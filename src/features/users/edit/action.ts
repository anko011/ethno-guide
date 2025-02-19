'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {editUser, type UserFormState, validateUserForm} from "@/entities/users";
import {getSearchParams} from "@/share/libs/search";

export async function action(id: string, _: UserFormState, formData?: FormData): Promise<UserFormState> {
    const result = validateUserForm(formData);

    if (!result.success) return result.error.flatten().fieldErrors;
    await editUser(id, result.data)
    const searchParams = await getSearchParams();
    searchParams.delete('modal');

    revalidatePath('/admin-panel/users');
    redirect(`/admin-panel/users?${searchParams}`);
}