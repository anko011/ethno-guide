'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {deleteArea} from "@/entities/areas";
import {getSearchParams} from "@/share/libs/search";

export async function action({id}: { id: string }) {
    const searchParams = await getSearchParams()
    searchParams.delete("modal");

    await deleteArea(id)
    revalidatePath("/admin-panel/areas");
    redirect(`/admin-panel/areas?${searchParams}`);
}
