'use server'

import {getArea} from "@/entities/areas";
import {wait} from "@/share/libs/dev";
import {getPaginationData, paginate, PaginationResult} from "@/share/libs/pagination";
import {normalize} from "@/share/libs/search";

import {Nation} from "../model/nation";
import {type Population} from "../model/population";
import {nations, populations} from "../mock";

function searchByTitle<T extends { name: string }>(items: T[], query: string): T[] {
    const normalizedQuery = normalize(query);
    return items.filter(item => normalize(item.name).includes(normalizedQuery));
}


export async function getAllNations(): Promise<Nation[]> {
    await wait(1000);
    return nations;
}

export async function getNations(page: number, pageSize: number, query: string = ""): Promise<Nation[]> {
    await wait(1000);
    return paginate(searchByTitle(nations, query), page, pageSize)
}

export async function getNation(nationId: string): Promise<Nation> {
    await wait(1000);
    const nation = nations.find(({id}) => nationId === id);
    if (!nation) throw new Error(`Nation with id: ${nationId} not found.`);
    return nation;
}

export async function getAllPopulationsByArea(areaId: string): Promise<Population[]> {
    await wait(1000);
    return populations.filter(({area}) => area.id === areaId);
}

export async function getAllPopulationsByNation(nationId: string): Promise<Population[]> {
    await wait(1000);
    return populations.filter(({nation}) => nation.id === nationId);
}

export async function getNationsPaginationInfo(page: number, pageSize: number, query: string = ""): Promise<PaginationResult> {
    await wait(1000);
    return getPaginationData(searchByTitle(Object.values(nations), query), page, pageSize);
}

export async function createNation(name: string, dataPopulations: { areaId: string, count: number }[]): Promise<void> {
    await wait(1000);
    const nation = {id: Date.now().toString(), name};
    nations.push(nation);

    for (const {areaId, count} of dataPopulations) {
        const area = await getArea(areaId);
        populations.push({nation, area, count})
    }
}


export async function editNation(nationId: string, data: {
    name: string,
    populations: { areaId: string, count: number }[]
}): Promise<void> {
    await wait(1000);
    await deleteNation(nationId);
    await createNation(data.name, data.populations);
}


export async function deleteNation(id: string): Promise<void> {
    await wait(1000);
    const nationIndex = nations.findIndex((nation) => nation.id === id);
    nations.splice(nationIndex, 1);

    let populationIndex = -1;
    do {
        populationIndex = populations.findIndex((population) => population.nation.id === id);
        populations.splice(populationIndex, 1);

    } while (populationIndex !== -1);
}