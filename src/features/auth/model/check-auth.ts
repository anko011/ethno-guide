'use server'

import {redirect} from "next/navigation";

import {Role} from "@/entities/users";

import {auth} from "./auth";

export async function checkAuth() {
    const session = await auth()
    if (!session || session?.user.role !== Role.ADMIN) redirect('/');

    return session;
}