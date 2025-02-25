import {Button, Flex, Heading, Text} from "@radix-ui/themes";

import {FormTextField} from "@/share/ui/form";
import {Link} from "@/share/ui/link";

export default function RegistrationPage() {
    return (
        <Flex direction="column" asChild gap="5" minWidth="250px">
            <form>
                <Flex direction="column" gap="2">
                    <Heading>Регистрация</Heading>
                    <Link size="1" asChild href="/login">
                        Уже есть аккаунт? Авторизуйтесь!
                    </Link>
                    <Text size="1" color="crimson">Неверный пароль или email</Text>
                </Flex>


                <Flex direction="column" gap="4">
                    <FormTextField label="Имя"/>
                    <FormTextField label="Фамилия"/>
                    <FormTextField label="Email"/>
                    <FormTextField label="Пароль" type="password"/>
                </Flex>

                <Flex justify="end" gap="2">
                    <Button type="submit">Зарегистрироваться</Button>
                </Flex>
            </form>
        </Flex>
    )
}