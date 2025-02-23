import {Table} from "@radix-ui/themes";

import {getUsers, type User} from "@/entities/users";
import {ReactNode} from "react";
import {UserRoleBadge} from "@/entities/users/ui/user-role-badge.ui";

export type UsersTableProps = {
    currentPage: number;
    actions?: (user: User) => ReactNode;
    pageSize?: number;
    query?: string;
}

export async function UsersTable({actions, currentPage, pageSize = 10, query = ''}: UsersTableProps) {
    const users = await getUsers(currentPage, pageSize, query);
    return (
        <Table.Root size="1">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Полное имя</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Роль</Table.ColumnHeaderCell>
                    {!!actions && (<Table.ColumnHeaderCell width="72px"/>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {users.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.RowHeaderCell>{user.fullName}</Table.RowHeaderCell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>
                            <UserRoleBadge userRole={user.role}/>
                        </Table.Cell>

                        {!!actions && (<Table.Cell>{actions(user)}</Table.Cell>)}
                    </Table.Row>
                ))}

            </Table.Body>
        </Table.Root>
    )
}
