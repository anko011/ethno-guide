import {getAllAreas} from "../api/repository";
import {AdministrationArea} from "./administation-area.ui";
import styles from './russian-map.module.css';


export async function RussianMap() {
    const areas = await getAllAreas();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1224.449 760.6203"
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
