import {type Area} from "@/entities/areas";
import {type Nation} from "./nation";

export type Population = {
    nation: Nation;
    area: Area;
    count: number;
}