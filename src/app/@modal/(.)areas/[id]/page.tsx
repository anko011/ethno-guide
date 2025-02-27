import {DataList, ScrollArea, Text} from "@radix-ui/themes";

import {getAllAreas, getArea} from "@/entities/areas";
import {getAllPopulationsByArea} from "@/entities/nations";

import {Dialog} from "@/share/ui/dialog";
import {Link} from "@/share/ui/link";

export async function generateStaticParams() {
    const areas = await getAllAreas();
    return areas.map(({id}) => ({id}));
}

export default async function AreaPopulationDialog({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const [area, populations] = await Promise.all([getArea(id), getAllPopulationsByArea(id)])
    return (
        <Dialog.Root>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>{area.title}</Dialog.Title>

                <ScrollArea style={{height: '32vh'}}>
                    <DataList.Root>
                        {populations.length === 0 && (
                            <Text>
                                Данные о народности пока в секрете, но мы уже разгадываем этот ребус. Скоро все станет
                                ясно!
                            </Text>
                        )}
                        {populations.map((population) => (
                            <DataList.Item key={population.nation.id} align="stretch">
                                <DataList.Label minWidth="88px">
                                    <Link href={`/articles?nationId=${population.nation.id}`}>
                                        {population.nation.name}
                                    </Link>
                                </DataList.Label>

                                <DataList.Value style={{marginLeft: 'auto'}}>{population.count} чел.</DataList.Value>
                            </DataList.Item>
                        ))}
                    </DataList.Root>
                </ScrollArea>

                <Dialog.CancelButton/>
            </Dialog.Content>
        </Dialog.Root>
    )
}