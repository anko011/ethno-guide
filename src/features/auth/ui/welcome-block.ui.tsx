import {Flex, type FlexProps} from "@radix-ui/themes";

import {WelcomeText} from "./welcome-text.ui";
import {LogoutButton} from "./logout-button.ui";
import {auth} from "../model/auth";

export type WelcomeBlockProps = FlexProps;

export async function WelcomeBlock({...props}: WelcomeBlockProps) {
    const session = await auth();
    return (
        <Flex gap="2" align="center" {...props}>
            <WelcomeText session={session}/>
            {!!session && (
                <LogoutButton size="1"/>
            )}
        </Flex>
    )
}
