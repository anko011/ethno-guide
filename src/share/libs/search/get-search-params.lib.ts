import {headers} from "next/headers";

export async function getSearchParams() {
    const referer = (await headers()).get('referer') ?? '';
    return new URLSearchParams(referer.split('?').at(-1));
}