'use client'

import {type DetailedHTMLProps, type FormHTMLAttributes, useActionState} from "react";
import {Flex} from "@radix-ui/themes";

import {type User} from "../model/user";
import {FormSelectorField, FormTextField} from "@/share/ui/form";

export type UserFormState = {
    userId?: string;
    fullName?: string[];
    email?: string[];
    role?: string[]
} | null

export type UserFormProps = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'action'> & {
    action: (state: UserFormState) => Promise<UserFormState> | UserFormState;
    user?: User;
}

export function UserForm({user, children, action, ...props}: UserFormProps) {
    const [formResult, act, pending] = useActionState<UserFormState>(action, null);
    return (
        <Flex direction="column" gap="2" asChild>
            <form action={act} {...props}>
                <FormTextField label="Имя пользователя"
                               name="fullName"
                               placeholder="Введите полное имя"
                               type="text"
                               defaultValue={user?.fullName}
                               error={formResult?.fullName?.at(0)}
                               disabled={pending}
                />

                <FormTextField label="Email"
                               name="email"
                               placeholder="Введите email"
                               type="email"
                               defaultValue={user?.email}
                               error={formResult?.email?.at(0)}
                               disabled={pending}
                />

                <FormSelectorField label="Роль"
                                   name="role"
                                   defaultValue={user?.role ?? 'author'}
                                   error={formResult?.role?.at(0)}
                                   disabled={pending}
                                   items={[
                                       {label: 'Администратор', value: 'administrator'},
                                       {label: 'Модератор', value: 'moderator'},
                                       {label: 'Автор', value: 'author'},
                                   ]}/>

                {children}
            </form>
        </Flex>
    )
}