import {ReactNode} from "react";
import {Table} from "@radix-ui/themes";

import {Nation} from "@/entities/nations";

import {getNations} from "../api/repository";

export type NationsTableProps = {
    currentPage: number;
    actions?: (nation: Nation) => ReactNode;
    pageSize?: number;
    query?: string;
}

export async function NationsTable({actions, currentPage, pageSize = 10, query = ''}: NationsTableProps) {
    const nations = await getNations(currentPage, pageSize, query);
    return (
        <Table.Root size="1">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
                    {!!actions && (<Table.ColumnHeaderCell width="72px"/>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {nations.map((nation) => (
                    <Table.Row key={nation.id}>
                        <Table.RowHeaderCell>{nation.name}</Table.RowHeaderCell>
                        {!!actions && (<Table.Cell>{actions(nation)}</Table.Cell>)}
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    )
}
