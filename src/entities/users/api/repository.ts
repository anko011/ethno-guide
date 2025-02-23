'use server'

import {getPaginationData, paginate, PaginationResult} from "@/share/libs/pagination";
import {normalize} from "@/share/libs/search";

import {type User} from "../model/user";
import {users} from "../mock";
import {wait} from "@/share/libs/dev";


function searchByFullName<T extends { fullName: string }>(items: T[], query: string): T[] {
    const normalizedQuery = normalize(query);
    return items.filter(item => normalize(item.fullName).includes(normalizedQuery));
}

export async function getUsers(page: number, pageSize: number, query: string = ""): Promise<User[]> {
    await wait(1000);
    return paginate(searchByFullName(users, query), page, pageSize);
}

export async function getUser(id: string): Promise<User> {
    await wait(1000);
    const user = users.find((user) => user.id === id);
    if (!user) throw new Error(`User: ${id} not found`);
    return user;
}

export async function getAllUsers(): Promise<User[]> {
    await wait(1000);
    return users;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function findUser(email: string, _: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
}

export async function getUsersPaginationInfo(page: number, pageSize: number, query: string = ""): Promise<PaginationResult> {
    await wait(1000);
    return getPaginationData(searchByFullName(users, query), page, pageSize);
}

export async function deleteUser(id: string): Promise<void> {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
}

export async function createUser(user: Omit<User, 'id'>): Promise<void> {
    await wait(1000);
    users.push({...user, id: (Math.max(...users.map(({id}) => id).map(parseInt)) + 1).toString()})
}

export async function editUser(userId?: string, data?: Omit<User, 'id'>): Promise<void> {
    await wait(1000);
    const user = users.find((user) => user.id === userId);
    if (!user) throw new Error(`User ${userId} not found`);

    const index = users.findIndex((user) => user.id === userId);
    users[index] = {...user, id: user.id, ...data};
}
