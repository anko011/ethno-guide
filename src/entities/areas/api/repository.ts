'use server'

import {getPaginationData, paginate, PaginationResult} from "@/share/libs/pagination";
import {normalize} from "@/share/libs/search";
import {wait} from "@/share/libs/dev";

import {type Area} from "../model/area";
import {administrationAreas} from "../mock";

function searchByTitle<T extends { title: string }>(items: T[], query: string): T[] {
    const normalizedQuery = normalize(query);
    return items.filter(item => normalize(item.title).includes(normalizedQuery));
}

export async function getAllAreas(): Promise<Area[]> {
    await wait(1000);
    return Object.values(administrationAreas);
}

export async function getAreas(page: number, pageSize: number, query: string = ""): Promise<Area[]> {
    await wait(1000);
    return paginate(searchByTitle(Object.values(administrationAreas), query), page, pageSize)
}

export async function getArea(id: string): Promise<Area> {
    await wait(1000);
    const user = Object.values(administrationAreas).find((area) => area.id === id);
    if (!user) throw Error(`Areas: ${id} not found`);
    return user;
}

export async function getAreasPaginationInfo(page: number, pageSize: number, query: string = ""): Promise<PaginationResult> {
    await wait(1000);
    return getPaginationData(searchByTitle(Object.values(administrationAreas), query), page, pageSize);
}

export async function deleteArea(id: string): Promise<void> {
    await wait(1000);
    delete administrationAreas[id as keyof typeof administrationAreas];
}

export async function createArea(area: Omit<Area, 'id'>): Promise<void> {
    await wait(1000);
    const id = Math.random().toString();
    administrationAreas[id as keyof typeof administrationAreas] = {id, ...area};
}

export async function editArea(areaId?: string, data?: Omit<Area, 'id'>): Promise<void> {
    await wait(1000);
    const area = administrationAreas[areaId as keyof typeof administrationAreas];
    if (!area) throw new Error(`Area ${areaId} not found`);
    administrationAreas[areaId as keyof typeof administrationAreas] = {...area, ...data};
}
