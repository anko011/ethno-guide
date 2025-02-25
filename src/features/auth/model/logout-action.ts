'use server'

import {signOut} from "@/features/auth/model/auth";

export async function logoutAction() {
    await signOut({redirectTo: '/'})
}