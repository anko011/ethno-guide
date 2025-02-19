'use server'

import {wait} from "@/share/libs/dev";

import {NationPopulation} from "../model/nation";
import {populations} from "../mock";

// function searchByTitle<T extends { title: string }>(items: T[], query: string): T[] {
//     const normalizedQuery = normalize(query);
//     return items.filter(item => normalize(item.title).includes(normalizedQuery));
// }

export async function getAllPopulationByArea(areaId: string): Promise<NationPopulation[]> {
    await wait(1000);
    return populations.filter(({area}) => area.id === areaId);
}

