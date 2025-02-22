import {FormTextField} from "@/share/ui/form";
import {Box, Button, Flex, Heading, Text} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export default function LoginPage() {
    return (
        <Flex direction="column" asChild gap="5" minWidth="250px">
            <form>
                <Box>
                    <Heading>Авторизация</Heading>
                    <Text size="1" color="crimson">Неверный пароль или email</Text>
                </Box>
                <Flex direction="column" gap="4">
                    <FormTextField label="Email"/>
                    <FormTextField label="Пароль"/>
                </Flex>

                <Flex justify="end" gap="2">
                    <Link asChild href="/registration">
                        <Button type="button" variant="outline">Создать аккаунт</Button>
                    </Link>
                    <Button type="submit">Войти</Button>
                </Flex>
            </form>
        </Flex>
    )
}