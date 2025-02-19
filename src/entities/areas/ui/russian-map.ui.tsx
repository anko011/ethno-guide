import {Tooltip} from "@radix-ui/themes";

import {Link} from "@/share/ui/link";

import {getAllAreas} from "../api/repository";
import styles from './styles.module.css';

export type AdministrationAreaProps = {
    title: string;
    d: string;
    id: string;
}

export function AdministrationArea({title, d, id}: AdministrationAreaProps) {
    return (
        <Tooltip content={title}>
            <Link href={`/areas/${id}/populations`}>
                <path d={d}/>
            </Link>
        </Tooltip>
    )
}

export async function RussianMap() {
    const areas = await getAllAreas();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1224.449"
            height="760.6203"
            className={styles.map}
            fill="var(--iris-12)"
        >
            {areas.map((area) => (
                <AdministrationArea key={area.id}
                                    id={area.id}
                                    title={area.title}
                                    d={area.d}
                />
            ))}
        </svg>
    )
}
