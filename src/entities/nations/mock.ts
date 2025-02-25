import {administrationAreas} from "@/entities/areas/mock";

import {type Nation} from "./model/nation";
import {type Population} from "./model/population";

export const nations: Nation[] = [
    {id: '1', name: 'Русские'},
    {id: '2', name: 'Буряты'},
    {id: '3', name: 'Якуты'},
    {id: '4', name: 'Юкагиры'},
    {id: '5', name: 'Алтайцы'},
    {id: '6', name: 'Башкиры'},
    {id: '7', name: 'Хакасы'},
    {id: '8', name: 'Долганы'},
    {id: '9', name: 'Эвенки'},
    {id: '10', name: 'Узбеки'},
    {id: '11', name: 'Башкиры'},
    {id: '12', name: 'Таджики'},
    {id: '13', name: 'Чуваши'},
    {id: '14', name: 'Немцы'},
] satisfies Nation[]

export const populations: Population[] = [
    {
        nation: nations[0],
        area: administrationAreas['RU-ZAB'],
        count: 977_400,
    },
    {
        nation: nations[1],
        area: administrationAreas['RU-ZAB'],
        count: 73_941,
    },
    {
        nation: nations[2],
        area: administrationAreas['RU-ZAB'],
        count: 6743,
    },
    {
        nation: nations[3],
        area: administrationAreas['RU-ZAB'],
        count: 5857,
    },
    {
        nation: nations[4],
        area: administrationAreas['RU-ZAB'],
        count: 3943,
    },
    {
        nation: nations[5],
        area: administrationAreas['RU-ZAB'],
        count: 2045,
    },
    {
        nation: nations[6],
        area: administrationAreas['RU-ZAB'],
        count: 1634,
    },
    {
        nation: nations[7],
        area: administrationAreas['RU-ZAB'],
        count: 1544,
    },
    {
        nation: nations[8],
        area: administrationAreas['RU-ZAB'],
        count: 1515,
    },
    {
        nation: nations[9],
        area: administrationAreas['RU-ZAB'],
        count: 968,
    },
    {
        nation: nations[10],
        area: administrationAreas['RU-ZAB'],
        count: 964,
    },
    {
        nation: nations[11],
        area: administrationAreas['RU-ZAB'],
        count: 792,
    },
    {
        nation: nations[12],
        area: administrationAreas['RU-ZAB'],
        count: 750,
    },
    {
        nation: nations[13],
        area: administrationAreas['RU-ZAB'],
        count: 724,
    },
] satisfies Population[]