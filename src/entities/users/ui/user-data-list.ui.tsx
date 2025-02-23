import {DataList, Text} from "@radix-ui/themes";

import {auth} from "@/features/auth";
import {UserRoleBadge} from "@/entities/users";
import {Link} from "@/share/ui/link";

export async function UserDataList() {
    const session = await auth();
    if (!session || !session.user) return null;

    const {user} = session;

    return (
        <DataList.Root>
            <DataList.Item>
                <DataList.Label minWidth="88px">Полное имя</DataList.Label>
                <DataList.Value>{user.fullName}</DataList.Value>
            </DataList.Item>

            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Роль</DataList.Label>
                <DataList.Value>
                    <Text color="jade">
                        <UserRoleBadge userRole={user.role}/>
                    </Text>
                </DataList.Value>
            </DataList.Item>

            <DataList.Item>
                <DataList.Label minWidth="88px">Email</DataList.Label>
                <DataList.Value>
                    <Link href="mailto:vlad@workos.com" wrap="nowrap">{user.email}</Link>
                </DataList.Value>
            </DataList.Item>

        </DataList.Root>
    )
}
