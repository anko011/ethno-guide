import {ReactNode} from "react";
import {Table} from "@radix-ui/themes";

import {type Area} from "../model/area";
import {getAreas} from "../api/repository";

export type AreasTableProps = {
    currentPage: number;
    actions?: (area: Area) => ReactNode;
    pageSize?: number;
    query?: string;
}

export async function AreasTable({actions, currentPage, pageSize = 10, query = ''}: AreasTableProps) {
    const users = await getAreas(currentPage, pageSize, query);
    return (
        <Table.Root size="1">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
                    {!!actions && (<Table.ColumnHeaderCell width="72px"/>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {users.map((area) => (
                    <Table.Row key={area.id}>
                        <Table.RowHeaderCell>{area.title}</Table.RowHeaderCell>
                        {!!actions && (<Table.Cell>{actions(area)}</Table.Cell>)}
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    )
}
