'use server'
import {redirect} from "next/navigation";

import {NotFoundUserError} from "../model/user-not-fount-error";

import {signInSchema} from "./sign-in-schema";
import {signIn} from "./auth";

export type SignInActionResult = {
    error?: string[]
} | null

export async function action(_: SignInActionResult, formData?: FormData): Promise<SignInActionResult> {
    const validate = signInSchema.safeParse({
        email: formData?.get('email'),
        password: formData?.get('password'),
    })

    if (!validate.success) return {error: ['Неверный логин или пароль']}
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof NotFoundUserError)
            return {error: ['Неверный логин или пароль']}
    }

    redirect('/')
}
