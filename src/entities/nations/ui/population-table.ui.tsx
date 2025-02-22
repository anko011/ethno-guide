import {ReactNode} from "react";
import {Table, Text} from "@radix-ui/themes";

import {Population} from "../model/population";

export type PopulationsTableProps = Table.RootProps & {
    populations: Omit<Population, 'nation'>[]
    actions?: (population: Omit<Population, 'nation'>) => ReactNode;
}

export function PopulationsTable({populations, actions, ...props}: PopulationsTableProps) {
    const hasData = populations.length !== 0;
    return (
        <Table.Root size="1" {...props}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Название региона</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Количество человек</Table.ColumnHeaderCell>
                    {!!actions && hasData && (<Table.ColumnHeaderCell width="72px"/>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {populations.map((population, index) => (
                    <Table.Row key={`${population.area.id}${population.count}${index}`}>
                        <Table.RowHeaderCell>{population.area.title}</Table.RowHeaderCell>
                        <Table.Cell>{population.count}</Table.Cell>
                        {!!actions && hasData && <Table.Cell>{actions(population)}</Table.Cell>}
                    </Table.Row>
                ))}
                {!hasData && (
                    <Table.Row>
                        <Table.RowHeaderCell>
                            {!populations.length && <Text>Отсутствуют данные...</Text>}
                        </Table.RowHeaderCell>
                        <Table.Cell/>
                    </Table.Row>
                )}

            </Table.Body>
        </Table.Root>
    )
}
