import {Button, DataList, Dialog, ScrollArea, Text} from "@radix-ui/themes";

import {getAllPopulationsByArea} from "@/entities/nations";
import {getAllAreas, getArea} from "@/entities/areas";
import {Link} from "@/share/ui/link";

export async function generateStaticParams() {
    const areas = await getAllAreas();
    return areas.map(({id}) => ({id}));
}

export default async function AreaPopulationModal(props: { params: Promise<{ id: string }> }) {
    const {id} = await props.params;
    const [area, populations] = await Promise.all([getArea(id), getAllPopulationsByArea(id)])
    return (
        <Dialog.Root defaultOpen>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>{area.title}</Dialog.Title>

                <Dialog.Description size="2" mb="4">
                    Население района / края на 2010 г.
                </Dialog.Description>

                <ScrollArea style={{height: '32vh'}}>
                    <DataList.Root>
                        {populations.length === 0 && (
                            <Text>Данные о народности пока в секрете, но мы уже разгадываем этот ребус. Скоро все станет
                                ясно!</Text>
                        )}
                        {populations.map((population) => (
                            <DataList.Item key={population.nation.id} align="stretch">
                                <DataList.Label minWidth="88px">
                                    <Link href="/">
                                        {population.nation.name}
                                    </Link>
                                </DataList.Label>

                                <DataList.Value style={{marginLeft: 'auto'}}>{population.count} чел.</DataList.Value>
                            </DataList.Item>
                        ))}
                    </DataList.Root>
                </ScrollArea>

                <Dialog.Close>
                    <Link href="/" asChild>
                        <Button variant="soft" color="gray" mt="2">
                            Закрыть
                        </Button>
                    </Link>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    )
}