import {DataList, ScrollArea, Text, Tooltip} from "@radix-ui/themes";

import {Link} from "@/share/ui/link";

import {getAllAreas, getArea} from "../api/repository";
import styles from './russian-map.module.css';
import {getAllPopulationsByArea} from "@/entities/nations";
import {Dialog} from "@/share/ui/dialog";

export type AdministrationAreaProps = {
    title: string;
    d: string;
    id: string;
}

async function AdministrationArea({title, d, id}: AdministrationAreaProps) {
    const [area, populations] = await Promise.all([getArea(id), getAllPopulationsByArea(id)])
    return (
        <Dialog.Root defaultOpen={false} backWhenClose={false}>
            <Tooltip content={title}>
                <Dialog.Trigger>
                    <path d={d}/>
                </Dialog.Trigger>
            </Tooltip>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title>{area.title}</Dialog.Title>

                <ScrollArea style={{height: '32vh'}}>
                    <DataList.Root>
                        {populations.length === 0 && (
                            <Text>Данные о народности пока в секрете, но мы уже разгадываем этот ребус. Скоро все станет
                                ясно!</Text>
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

export async function RussianMap() {
    const areas = await getAllAreas();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1224.449 760.6203"
            className={styles.map}
            fill="var(--iris-12)"
        >
            {areas.map((area) => (
                <AdministrationArea key={area.id}
                                    id={area.id}
                                    title={area.title}
                                    d={area.d}
                />
            ))}
        </svg>
    )
}
