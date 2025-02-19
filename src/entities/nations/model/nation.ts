import {Area} from "@/entities/areas";

export type Nation = {
    id: string;
    name: string;
}

export type NationPopulation = {
    nation: Nation;
    area: Area;
    count: number;
}