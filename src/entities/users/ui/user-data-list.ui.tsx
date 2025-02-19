import {DataList, Text} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export function UserDataList() {
    return (
        <DataList.Root>
            <DataList.Item>
                <DataList.Label minWidth="88px">ФИО</DataList.Label>
                <DataList.Value>Морозов Владислав Андреевич</DataList.Value>
            </DataList.Item>

            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Роль</DataList.Label>
                <DataList.Value>
                    <Text color="jade">Администратор</Text>
                </DataList.Value>
            </DataList.Item>

            <DataList.Item>
                <DataList.Label minWidth="88px">Email</DataList.Label>
                <DataList.Value>
                    <Link href="mailto:vlad@workos.com">vlad@workos.com</Link>
                </DataList.Value>
            </DataList.Item>

        </DataList.Root>
    )
}
