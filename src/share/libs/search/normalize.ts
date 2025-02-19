export function normalize(str: string) {
    return str.toLowerCase()
        .replace(/[^a-zа-яё0-9]/gi, "")
        .split(" ")
        .sort()
        .join(" ");
}
