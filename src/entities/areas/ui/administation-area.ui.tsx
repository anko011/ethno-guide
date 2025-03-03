import {Link} from "@/share/ui/link";
import {DataList, Flex, HoverCard, Separator, Text} from "@radix-ui/themes";

export type AdministrationAreaProps = {
    title: string;
    d: string;
    id: string;
    active?: boolean;
}

export function AdministrationArea({title, d, id, active = false}: AdministrationAreaProps) {
    const searchParams = new URLSearchParams();
    searchParams.set('modal', 'true');

    const style = active ? {fill: 'var(--iris-a10)'} : {};

    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <Link href={`/areas/${id}?${searchParams}`}>
                    <path d={d} pointerEvents="all" style={style}/>
                </Link>
            </HoverCard.Trigger>
            <HoverCard.Content minWidth="250px">
                <Flex direction="column" gap="2">
                    <Text>{title}</Text>
                    <Separator size="4"/>
                    <DataList.Root size="1">
                        <DataList.Item>
                            <DataList.Label>Количество народов</DataList.Label>
                            <DataList.Value style={{marginLeft: 'auto'}}>100</DataList.Value>
                        </DataList.Item>

                        <DataList.Item>
                            <DataList.Label>Количество статей</DataList.Label>
                            <DataList.Value style={{marginLeft: 'auto'}}>231</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    )
}