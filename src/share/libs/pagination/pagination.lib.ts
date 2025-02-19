export type PaginationResult = {
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export function getPaginationData<T>(items: T[], page: number = 1, pageSize: number = 10): PaginationResult {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    return {
        pageSize,
        totalPages,
        totalItems,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
    }
}

export function paginate<T>(
    items: T[],
    page: number = 1,
    pageSize: number = 10
): T[] {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex)
}
