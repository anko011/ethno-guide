'use client'

import {useActionState} from "react";
import {Box, Button, Flex, Heading, Text} from "@radix-ui/themes";

import {FormTextField} from "@/share/ui/form";
import {Link} from "@/share/ui/link";

import {action, SignInActionResult} from "../model/sign-in-action";


export function SignInForm() {
    const [formResult, dispatch, pending] = useActionState<SignInActionResult>(action, null);
    return (
        <Flex direction="column" asChild gap="5" minWidth="250px">
            <form action={dispatch}>
                <Box>
                    <Heading>Авторизация</Heading>
                    {formResult?.error && <Text size="1" color="crimson">{formResult.error.at(0)}</Text>}
                </Box>
                <Flex direction="column" gap="4">
                    <FormTextField label="Email" name="email" placeholder="Введите email"/>
                    <FormTextField label="Пароль" name="password" type="password" placeholder="Введите пароль"/>
                </Flex>

                <Flex justify="end" gap="2">
                    <Link asChild href="/registration">
                        <Button type="button" variant="outline" loading={pending} disabled={pending}>
                            Создать аккаунт
                        </Button>
                    </Link>
                    <Button type="submit" loading={pending} disabled={pending}>Войти</Button>
                </Flex>
            </form>
        </Flex>
    )

}