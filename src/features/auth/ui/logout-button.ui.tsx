import {ExitIcon} from "@radix-ui/react-icons";
import {Button, ButtonProps} from "@radix-ui/themes";
import {signOut} from "@/features/auth";

export type LogoutButtonProps = ButtonProps;

export function LogoutButton(props: LogoutButtonProps) {
    return (
        <form action={async function () {
            'use server'
            await signOut({redirectTo: '/'})
        }}>
            <Button type="submit" variant="ghost" color="crimson" {...props}>
                <ExitIcon/>
                Выйти
            </Button>
        </form>
    )
}