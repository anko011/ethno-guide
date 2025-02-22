'use server'

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {deleteNation} from "@/entities/nations";
import {getSearchParams} from "@/share/libs/search";

export async function action({id}: { id: string }) {
    const searchParams = await getSearchParams();
    searchParams.delete("modal");

    await deleteNation(id);
    revalidatePath("/admin-panel/areas");
    redirect(`/admin-panel/areas?${searchParams}`);
}
