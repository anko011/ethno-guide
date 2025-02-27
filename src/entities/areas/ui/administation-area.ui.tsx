import {Tooltip} from "@radix-ui/themes";
import {Link} from "@/share/ui/link";

export type AdministrationAreaProps = {
    title: string;
    d: string;
    id: string;
}

export function AdministrationArea({title, d, id}: AdministrationAreaProps) {
    const searchParams = new URLSearchParams();
    searchParams.set('modal', 'true');

    return (
        <Tooltip content={title}>
            <Link href={`/areas/${id}?${searchParams}`}>
                <path d={d} pointerEvents="all"/>
            </Link>
        </Tooltip>
    )
}