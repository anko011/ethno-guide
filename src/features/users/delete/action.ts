'use server'

import {deleteUser} from "@/entities/users";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {getSearchParams} from "@/share/libs/search";

export async function action({id}: { id: string }) {
    const searchParams = await getSearchParams()
    searchParams.delete("modal");

    await deleteUser(id)
    revalidatePath("/admin-panel/users");
    redirect(`/admin-panel/users?${searchParams}`);
}
